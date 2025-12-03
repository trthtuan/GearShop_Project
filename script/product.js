// script/product.js

// --- 1. KHAI BÁO BIẾN ---
let currentProduct = null;

function formatMoney(amount) {
    if (!amount) return "Liên hệ";
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}

// --- 2. LẤY SẢN PHẨM TỪ URL ---
function getProductFromUrl() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const productId = urlParams.get('id');
    if (typeof dbProducts === 'undefined') return null;
    return dbProducts.find(p => p.id == productId);
}

// --- 3. HIỂN THỊ CHI TIẾT (ĐÃ THÊM 2 NÚT) ---
function renderProductDetail() {
    currentProduct = getProductFromUrl();
    const container = document.getElementById('product-detail-container');

    if (!currentProduct) {
        if(container) container.innerHTML = '<h3 class="text-center">Không tìm thấy sản phẩm</h3>';
        return;
    }

    // Cập nhật Breadcrumb
    const breadcrumbName = document.getElementById('breadcrumb-name');
    if (breadcrumbName) breadcrumbName.textContent = currentProduct.name;
    document.title = `${currentProduct.name} - ONEGEAR`;

    // Xử lý ảnh: Ưu tiên ảnh đơn lẻ, nếu lỗi dùng ảnh mặc định
    const mainImgSrc = currentProduct.image || './img/keyboard/keyboard1.jpg';

    const html = `
        <div class="image-gallery">
            <div class="main-image-box">
                <img id="mainImage" src="${mainImgSrc}" alt="${currentProduct.name}" 
                     onerror="this.src='./img/keyboard/keyboard1.jpg'">
            </div>
        </div>
        <div class="product-details">
            <h1>${currentProduct.name}</h1>
            <div class="price-tag" style="color: #db4444; font-size: 2.4rem; font-weight: bold; margin: 1rem 0;">
                ${formatMoney(currentProduct.price)}
            </div>
            <div class="product-meta">
                <p><strong>Thương hiệu:</strong> ${currentProduct.brand || 'N/A'}</p>
                <p><strong>Loại:</strong> ${currentProduct.type || 'N/A'}</p>
                <p><strong>Tình trạng:</strong> Còn hàng</p>
            </div>
            <hr>
            
            <div class="purchase-actions" style="display: flex; flex-direction: column; gap: 15px; margin-top: 2rem;">
                
                <div class="qty-control" style="display: flex; align-items: center; gap: 10px;">
                    <span style="font-weight: 500;">Số lượng:</span>
                    <div style="display: flex; border: 1px solid #ddd; border-radius: 4px;">
                        <button class="qty-btn" onclick="updateQty(-1)" style="border:none; background: #fff; padding: 5px 15px; cursor: pointer;">-</button>
                        <input type="text" id="productQty" value="1" readonly style="width: 40px; text-align: center; border:none; outline:none; font-weight: bold;">
                        <button class="qty-btn" onclick="updateQty(1)" style="border:none; background: #fff; padding: 5px 15px; cursor: pointer;">+</button>
                    </div>
                </div>

                <div class="action-buttons" style="display: flex; gap: 15px;">
                    <button onclick="addToCart(false)" class="btn-add-cart" 
                        style="background: #fff; color: #db4444; border: 1px solid #db4444; padding: 12px 25px; border-radius: 4px; font-weight: bold; cursor: pointer; flex: 1; transition: 0.3s;">
                        <i class="fas fa-cart-plus"></i> THÊM VÀO GIỎ
                    </button>

                    <button onclick="addToCart(true)" class="btn-buy-now" 
                        style="background: #db4444; color: #fff; border: 1px solid #db4444; padding: 12px 25px; border-radius: 4px; font-weight: bold; cursor: pointer; flex: 1; transition: 0.3s;">
                        MUA NGAY
                    </button>
                </div>

            </div>
            
            <div class="service-info mt-4" style="border-top: 1px solid #eee; padding-top: 15px;">
                 <p><i class="fas fa-truck text-muted me-2"></i> Giao hàng miễn phí cho đơn trên 1 triệu</p>
                 <p><i class="fas fa-sync-alt text-muted me-2"></i> Đổi trả trong 30 ngày</p>
            </div>
        </div>
    `;
    if(container) container.innerHTML = html;
}

function updateQty(change) {
    const input = document.getElementById('productQty');
    let val = parseInt(input.value) + change;
    if (val < 1) val = 1;
    input.value = val;
}

// --- 4. HÀM XỬ LÝ GIỎ HÀNG (QUAN TRỌNG) ---
// Tham số isBuyNow: true (Mua ngay - chuyển trang), false (Thêm vào giỏ - ở lại)
function addToCart(isBuyNow) {
    // 1. Xác định key localStorage
    const currentUser = JSON.parse(localStorage.getItem('ONEGEAR_CURRENT_USER'));
    let cartKey = 'ONEGEAR_CART_GUEST';
    if (currentUser && currentUser.email) {
        cartKey = `ONEGEAR_CART_${currentUser.email}`;
    }

    let cart = JSON.parse(localStorage.getItem(cartKey)) || [];
    const qty = parseInt(document.getElementById('productQty').value);

    // 2. Kiểm tra sản phẩm đã có chưa
    const existing = cart.find(i => i.id === currentProduct.id);
    
    if (existing) {
        existing.quantity += qty;
    } else {
        // Lưu sản phẩm mới
        cart.push({
            id: currentProduct.id,
            name: currentProduct.name,
            price: currentProduct.price,
            image: currentProduct.image || './img/keyboard/keyboard1.jpg', 
            quantity: qty
        });
    }

    // 3. Lưu lại vào bộ nhớ
    localStorage.setItem(cartKey, JSON.stringify(cart));
    
    // 4. ĐIỀU HƯỚNG DỰA TRÊN NÚT BẤM
    if (isBuyNow) {
        // Nếu ấn "MUA NGAY" -> Chuyển sang giỏ hàng luôn
        window.location.href = "./cart.html";
    } else {
        // Nếu ấn "THÊM VÀO GIỎ" -> Thông báo nhẹ và ở lại trang
        alert("✅ Đã thêm sản phẩm vào giỏ hàng thành công!");
    }
}

document.addEventListener('DOMContentLoaded', renderProductDetail);