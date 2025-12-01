// ==================== 1. XÁC ĐỊNH GIỎ HÀNG CỦA AI ====================

// Biến toàn cục lưu % giảm giá (0 = không giảm, 0.5 = giảm 50%)
let currentDiscountRate = 0; 

function getCartKey() {
    const currentUser = JSON.parse(localStorage.getItem('ONEGEAR_CURRENT_USER'));
    if (currentUser) {
        return `ONEGEAR_CART_${currentUser.email}`;
    }
    return 'ONEGEAR_CART_GUEST';
}

let cartKey = getCartKey();
let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

function saveCart() {
    localStorage.setItem(cartKey, JSON.stringify(cart));
}

// ==================== 2. HÀM FORMAT TIỀN TỆ ====================
function formatMoney(amount) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}

// ==================== 3. HÀM XỬ LÝ MÃ GIẢM GIÁ (LOGIC MỚI) ====================
function applyCoupon() {
    const couponInput = document.getElementById('coupon-input');
    const code = couponInput.value.trim().toLowerCase(); // Chuyển về chữ thường để check

    // Regex: Bắt đầu bằng số (mssv), theo sau là @st.huce.edu.vn
    // ^[0-9]+ : Bắt buộc bắt đầu bằng 1 hoặc nhiều số
    // @st\.huce\.edu\.vn$ : Bắt buộc kết thúc bằng đuôi email này
    const huceRegex = /^[0-9]+@st\.huce\.edu\.vn$/;

    if (huceRegex.test(code)) {
        currentDiscountRate = 0.5; // Giảm 50%
        alert(`Chấp nhận mã sinh viên HUCE: ${code}\nBạn được giảm 50% tổng đơn hàng!`);
        
        // Render lại giỏ hàng để cập nhật giá
        renderCart(); 
    } else {
        currentDiscountRate = 0; // Reset về 0
        alert("Mã giảm giá không hợp lệ!\nVui lòng nhập đúng định dạng email SV HUCE (vd: 123456@st.huce.edu.vn)");
        renderCart();
    }
}

// ==================== 4. RENDER GIỎ HÀNG & TÍNH TOÁN ====================
function renderCart() {
    cartKey = getCartKey(); 
    cart = JSON.parse(localStorage.getItem(cartKey)) || [];

    const cartContainer = document.getElementById('cart-items-wrapper');
    
    // Các phần tử hiển thị tiền (đã thêm ID ở bước 1)
    const subTotalEl = document.querySelector('.cart-total-row span:last-child'); // Fallback nếu chưa sửa ID
    const discountRow = document.getElementById('discount-row');
    const discountAmountEl = document.getElementById('discount-amount');
    const finalTotalEl = document.querySelector('.total-final span:last-child'); // Fallback

    if (!cartContainer) return;

    cartContainer.innerHTML = '';
    let subTotalAmount = 0;

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p class="text-center p-5">Giỏ hàng của bạn đang trống!</p>';
    } else {
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            subTotalAmount += itemTotal; // Cộng dồn tạm tính
    
            const html = `
                <div class="cart-item" id="item-${item.id}">
                    <div class="col-product">
                        <img src="${item.image}" alt="${item.name}" onerror="this.onerror=null;this.src='https://via.placeholder.com/80'">
                        <span class="product-name">${item.name}</span>
                    </div>
                    <div class="col-price">${formatMoney(item.price)}</div>
                    <div class="col-quantity">
                        <input type="number" class="qty-input" value="${item.quantity}" min="1" onchange="updateQuantity(${item.id}, this.value)">
                    </div>
                    <div class="col-subtotal">${formatMoney(itemTotal)}</div>
                    <div class="col-remove">
                        <i class="fas fa-times-circle remove-btn" onclick="removeItem(${item.id})"></i>
                    </div>
                </div>
            `;
            cartContainer.insertAdjacentHTML('beforeend', html);
        });
    }

    // --- TÍNH TOÁN GIẢM GIÁ ---
    let discountAmount = subTotalAmount * currentDiscountRate;
    let finalTotal = subTotalAmount - discountAmount;

    // --- CẬP NHẬT GIAO DIỆN ---
    
    // 1. Cập nhật Tạm tính
    if (subTotalEl) subTotalEl.innerText = formatMoney(subTotalAmount);

    // 2. Cập nhật dòng Giảm giá
    if (discountRow && discountAmountEl) {
        if (currentDiscountRate > 0) {
            discountRow.style.display = 'flex'; // Hiện dòng giảm giá
            discountAmountEl.innerText = `-${formatMoney(discountAmount)}`;
        } else {
            discountRow.style.display = 'none'; // Ẩn dòng giảm giá
        }
    }

    // 3. Cập nhật Tổng thanh toán
    if (finalTotalEl) finalTotalEl.innerText = formatMoney(finalTotal);
    
    // Lưu tổng tiền cuối cùng vào localStorage để trang Checkout dùng (nếu cần)
    localStorage.setItem('ONEGEAR_FINAL_TOTAL', finalTotal);
}

// ==================== 5. CÁC HÀM XỬ LÝ KHÁC ====================
function updateQuantity(id, newQuantity) {
    const item = cart.find(p => p.id === id);
    if (item) {
        let qty = parseInt(newQuantity);
        if (qty < 1) qty = 1;
        item.quantity = qty;
        saveCart(); 
        renderCart(); 
    }
}

function removeItem(id) {
    if (confirm("Bạn có chắc muốn xóa sản phẩm này không?")) {
        cart = cart.filter(item => item.id !== id);
        saveCart(); 
        renderCart(); 
        
        // Nếu xóa hết thì reset mã giảm giá luôn cho hợp lý
        if (cart.length === 0) {
            currentDiscountRate = 0;
            renderCart();
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderCart();
});