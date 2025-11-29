// ==================== 1. XÁC ĐỊNH GIỎ HÀNG CỦA AI ====================

// Hàm lấy tên key giỏ hàng hiện tại
function getCartKey() {
    const currentUser = JSON.parse(localStorage.getItem('ONEGEAR_CURRENT_USER'));
    if (currentUser) {
        return `ONEGEAR_CART_${currentUser.email}`;
    }
    return 'ONEGEAR_CART_GUEST';
}

// Lấy dữ liệu từ đúng key đó
let cartKey = getCartKey();
let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

// Hàm lưu giỏ hàng
function saveCart() {
    localStorage.setItem(cartKey, JSON.stringify(cart));
}

// ==================== 2. CÁC HÀM XỬ LÝ (GIỮ NGUYÊN LOGIC CŨ) ====================

function formatMoney(amount) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}

function renderCart() {
    // Cập nhật lại key phòng trường hợp vừa đăng nhập/đăng xuất xong reload trang
    cartKey = getCartKey(); 
    cart = JSON.parse(localStorage.getItem(cartKey)) || [];

    const cartContainer = document.getElementById('cart-items-wrapper');
    const subTotalEl = document.querySelector('.cart-total-row span:last-child');
    const finalTotalEl = document.querySelector('.total-final span:last-child');
    
    if (!cartContainer) return;

    cartContainer.innerHTML = '';
    let totalAmount = 0;

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p class="text-center p-5">Giỏ hàng của bạn đang trống!</p>';
    } else {
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            totalAmount += itemTotal;
    
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

    if (subTotalEl) subTotalEl.innerText = formatMoney(totalAmount);
    if (finalTotalEl) finalTotalEl.innerText = formatMoney(totalAmount);
}

function updateQuantity(id, newQuantity) {
    const item = cart.find(p => p.id === id);
    if (item) {
        let qty = parseInt(newQuantity);
        if (qty < 1) qty = 1;
        item.quantity = qty;
        saveCart(); // Lưu
        renderCart(); // Vẽ lại
    }
}

function removeItem(id) {
    if (confirm("Bạn có chắc muốn xóa sản phẩm này không?")) {
        cart = cart.filter(item => item.id !== id);
        saveCart(); // Lưu
        renderCart(); // Vẽ lại
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderCart();
});