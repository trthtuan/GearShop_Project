// script/checkout.js

// 1. Xác định giỏ hàng
const currentUser = JSON.parse(localStorage.getItem('ONEGEAR_CURRENT_USER'));
let cartKey = 'ONEGEAR_CART_GUEST';
if (currentUser && currentUser.email) {
    cartKey = `ONEGEAR_CART_${currentUser.email}`;
}
const cartData = JSON.parse(localStorage.getItem(cartKey)) || [];

function formatMoney(amount) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}

// 2. Hiển thị đơn hàng & Tính toán
function renderOrderSummary() {
    const listContainer = document.getElementById('checkout-items-list');
    const subtotalEl = document.getElementById('subtotal-price');
    const totalEl = document.getElementById('total-price');
    
    // Lấy 2 thẻ HTML mới thêm ở Bước 1
    const discountRow = document.getElementById('checkout-discount-row');
    const discountAmountEl = document.getElementById('checkout-discount-amount');

    if (!listContainer) return;
    listContainer.innerHTML = '';
    
    let subTotalAmount = 0; // Tổng tiền hàng (Giá gốc)

    if (cartData.length === 0) {
        listContainer.innerHTML = '<p class="text-center">Giỏ hàng trống!</p>';
        return;
    }

    // Vẽ danh sách sản phẩm
    cartData.forEach(item => {
        subTotalAmount += (item.price * item.quantity);
        
        const html = `
            <div class="checkout-item-row" style="display: flex; align-items: center; margin-bottom: 15px;">
                <img src="${item.image}" 
                     alt="${item.name}" 
                     style="width: 50px; height: 50px; object-fit: contain; margin-right: 15px; border: 1px solid #eee;"
                     onerror="this.src='./img/keyboard/keyboard1.jpg'"> 
                <div style="flex: 1;">
                    <div style="font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 200px;">
                        ${item.name}
                    </div>
                    <small class="text-muted">x${item.quantity}</small>
                </div>
                <div style="font-weight: bold;">${formatMoney(item.price * item.quantity)}</div>
            </div>
        `;
        listContainer.insertAdjacentHTML('beforeend', html);
    });

    // --- TÍNH TOÁN TIỀN ---
    
    // Lấy giá chốt hạ (đã giảm) từ localStorage
    const storedFinalTotal = localStorage.getItem('ONEGEAR_FINAL_TOTAL');
    let finalPayAmount = subTotalAmount; // Mặc định trả đủ

    // Nếu có giá giảm thì dùng
    if (storedFinalTotal !== null && storedFinalTotal !== "") {
        finalPayAmount = parseFloat(storedFinalTotal);
    }

    // Tính số tiền chênh lệch (Tiền được giảm)
    const discountValue = subTotalAmount - finalPayAmount;

    // --- CẬP NHẬT GIAO DIỆN ---
    
    // 1. Cập nhật Tạm tính
    if(subtotalEl) subtotalEl.innerText = formatMoney(subTotalAmount);

    // 2. Cập nhật Dòng giảm giá (MỚI)
    if (discountRow && discountAmountEl) {
        if (discountValue > 0) {
            // Nếu có giảm giá -> Hiện dòng này lên
            discountRow.style.display = 'flex'; 
            discountAmountEl.innerText = `-${formatMoney(discountValue)}`;
        } else {
            // Nếu không giảm -> Ẩn đi
            discountRow.style.display = 'none'; 
        }
    }

    // 3. Cập nhật Tổng thanh toán
    if(totalEl) {
        totalEl.innerText = formatMoney(finalPayAmount);
        
        // Thêm chú thích nhỏ
        if (discountValue > 0) {
            totalEl.style.color = 'green';
            totalEl.innerHTML += ` <br><span style="font-size: 0.6em; color: #db4444;">(Đã áp dụng mã giảm giá SV)</span>`;
        }
    }
    
    // Auto điền form
    if(currentUser) {
        const nameInput = document.getElementById('fullname');
        const emailInput = document.getElementById('email');
        if(nameInput) nameInput.value = currentUser.name || '';
        if(emailInput) emailInput.value = currentUser.email || '';
    }
}

// 3. Xử lý đặt hàng
// Thay thế hàm placeOrder cũ trong script/checkout.js

function placeOrder(event) {
    event.preventDefault();
    
    if(cartData.length === 0) {
        alert("Giỏ hàng trống!");
        return;
    }

    // 1. Thu thập thông tin đơn hàng
    const name = document.getElementById('fullname').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const emailInput = document.getElementById('email').value; // Email người nhận nhập trong form
    
    // Xác định email chủ đơn hàng (để sau này lọc lịch sử)
    // Nếu đang đăng nhập thì lấy email login, nếu không thì lấy email trong form
    let ownerEmail = emailInput; 
    if (currentUser && currentUser.email) {
        ownerEmail = currentUser.email;
    }

    // Lấy tổng tiền cuối cùng (đã trừ giảm giá)
    const storedFinalTotal = localStorage.getItem('ONEGEAR_FINAL_TOTAL');
    let finalTotal = 0;
    
    // Tính lại tổng tiền gốc để phòng hờ
    let subTotal = cartData.reduce((acc, item) => acc + item.price * item.quantity, 0);

    if (storedFinalTotal !== null) {
        finalTotal = parseFloat(storedFinalTotal);
    } else {
        finalTotal = subTotal;
    }

    // 2. Tạo đối tượng đơn hàng (Order Object)
    const newOrder = {
        id: 'DH' + Date.now(), // Tạo mã đơn hàng ngẫu nhiên theo thời gian
        date: new Date().toLocaleString(), // Ngày giờ mua
        customer: { name, phone, address, email: emailInput },
        items: cartData, // Danh sách sản phẩm đã mua
        total: finalTotal, // Tổng tiền đã thanh toán
        status: "Đang xử lý" // Trạng thái mặc định
    };

    // 3. Lấy lịch sử cũ từ LocalStorage (nếu có)
    const orderHistory = JSON.parse(localStorage.getItem('ONEGEAR_ORDER_HISTORY')) || [];
    
    // Thêm đơn hàng mới vào đầu danh sách
    orderHistory.unshift(newOrder);

    // Lưu ngược lại vào LocalStorage
    localStorage.setItem('ONEGEAR_ORDER_HISTORY', JSON.stringify(orderHistory));

    // 4. Thông báo và dọn dẹp
    alert(`🎉 ĐẶT HÀNG THÀNH CÔNG!\nMã đơn hàng: ${newOrder.id}\nCảm ơn bạn đã ủng hộ ONEGEAR.`);
    
    localStorage.removeItem(cartKey); // Xóa giỏ hàng
    localStorage.removeItem('ONEGEAR_FINAL_TOTAL'); // Xóa giá tạm
    
    window.location.href = "./index.html";
}

document.addEventListener('DOMContentLoaded', renderOrderSummary);

// Logic QR Code
const radioBank = document.getElementById('paymentBank');
const radioCOD = document.getElementById('paymentCOD');
const bankInfoBox = document.getElementById('bankInfoBox');
if(radioBank && bankInfoBox) {
    radioBank.addEventListener('change', () => { if(radioBank.checked) bankInfoBox.style.display = 'block'; });
}
if(radioCOD && bankInfoBox) {
    radioCOD.addEventListener('change', () => { if(radioCOD.checked) bankInfoBox.style.display = 'none'; });
}