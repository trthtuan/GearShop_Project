// ==================== 1. XÁC ĐỊNH GIỎ HÀNG CẦN THANH TOÁN ====================

// Kiểm tra xem ai đang đăng nhập
const currentUser = JSON.parse(localStorage.getItem('ONEGEAR_CURRENT_USER'));

// Mặc định lấy giỏ của Khách vãng lai
let cartKey = 'ONEGEAR_CART_GUEST';

// Nếu đã đăng nhập, đổi sang lấy giỏ của người đó
if (currentUser && currentUser.email) {
    cartKey = `ONEGEAR_CART_${currentUser.email}`;
}

// Lấy dữ liệu giỏ hàng từ LocalStorage
const cartData = JSON.parse(localStorage.getItem(cartKey)) || [];

// Hàm định dạng tiền tệ
function formatMoney(amount) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}

// ==================== 2. HIỂN THỊ ĐƠN HÀNG ====================
function renderOrderSummary() {
    const listContainer = document.getElementById('checkout-items-list');
    const subtotalEl = document.getElementById('subtotal-price');
    const totalEl = document.getElementById('total-price');
    
    // Nếu không tìm thấy các thẻ HTML thì dừng (tránh lỗi)
    if (!listContainer) return;
    
    listContainer.innerHTML = ''; 
    let totalAmount = 0;

    // --- KIỂM TRA GIỎ HÀNG RỖNG ---
    if (cartData.length === 0) {
        listContainer.innerHTML = `
            <div class="text-center p-3">
                <p class="text-danger">Giỏ hàng đang trống!</p>
                <a href="./index.html" class="btn btn-sm btn-outline-dark">Quay lại mua hàng</a>
            </div>
        `;
        if(subtotalEl) subtotalEl.innerText = formatMoney(0);
        if(totalEl) totalEl.innerText = formatMoney(0);
        
        // Vô hiệu hóa nút đặt hàng nếu giỏ rỗng
        const btnCheckout = document.querySelector('.btn-checkout');
        if(btnCheckout) {
            btnCheckout.disabled = true;
            btnCheckout.style.backgroundColor = '#ccc';
            btnCheckout.innerText = "Giỏ hàng trống";
        }
        return;
    }

    // Render danh sách
    cartData.forEach(item => {
        const itemTotal = item.price * item.quantity;
        totalAmount += itemTotal;

        const html = `
            <div class="checkout-item-row">
                <img src="${item.image}" class="checkout-item-img" alt="${item.name}">
                <div class="checkout-item-info">
                    <span class="checkout-item-name">${item.name}</span>
                    <small class="text-muted">SL: ${item.quantity} x ${formatMoney(item.price)}</small>
                </div>
                <span class="fw-bold">${formatMoney(itemTotal)}</span>
            </div>
        `;
        listContainer.insertAdjacentHTML('beforeend', html);
    });

    // Cập nhật tổng tiền
    if(subtotalEl) subtotalEl.innerText = formatMoney(totalAmount);
    if(totalEl) totalEl.innerText = formatMoney(totalAmount);
    
    // Tự động điền thông tin nếu đã đăng nhập (Optional - Tiện ích thêm)
    if(currentUser) {
        const nameInput = document.getElementById('fullname');
        const emailInput = document.getElementById('email');
        if(nameInput && !nameInput.value) nameInput.value = currentUser.name || '';
        if(emailInput && !emailInput.value) emailInput.value = currentUser.email || '';
    }
}

// ==================== 3. XỬ LÝ SỰ KIỆN ====================
document.addEventListener('DOMContentLoaded', () => {
    renderOrderSummary();

    const radioBank = document.getElementById('paymentBank');
    const radioCOD = document.getElementById('paymentCOD');
    const bankInfoBox = document.getElementById('bankInfoBox');

    // Ẩn/Hiện thông tin chuyển khoản
    if(radioBank && bankInfoBox) {
        radioBank.addEventListener('change', () => {
            if(radioBank.checked) bankInfoBox.style.display = 'block';
        });
    }

    if(radioCOD && bankInfoBox) {
        radioCOD.addEventListener('change', () => {
            if(radioCOD.checked) bankInfoBox.style.display = 'none';
        });
    }
});

// Hàm Xử lý Đặt hàng
function placeOrder(event) {
    event.preventDefault(); 
    
    // Kiểm tra lại lần nữa cho chắc
    if(cartData.length === 0) {
        alert("Giỏ hàng của bạn đang trống! Vui lòng chọn sản phẩm trước.");
        window.location.href = "./index.html";
        return;
    }

    const name = document.getElementById('fullname').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const totalString = document.getElementById('total-price').innerText;
    const paymentMethod = document.getElementById('paymentBank').checked ? "Chuyển khoản" : "Tiền mặt (COD)";

    const message = `
        🎉 ĐẶT HÀNG THÀNH CÔNG!
        -----------------------
        Khách hàng: ${name}
        SĐT: ${phone}
        Địa chỉ: ${address}
        Tổng tiền: ${totalString}
        Thanh toán: ${paymentMethod}
        
        Cảm ơn bạn đã mua hàng tại ONEGEAR!
    `;
    
    alert(message);
    
    // --- QUAN TRỌNG: Xóa đúng cái giỏ vừa thanh toán ---
    localStorage.removeItem(cartKey);
    
    window.location.href = "./index.html";
}