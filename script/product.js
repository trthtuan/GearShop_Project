// --- KHAI BÁO BIẾN TOÀN CỤC ---
let currentProduct = null;

// Hàm định dạng tiền tệ
function formatMoney(amount) {
    if(!amount) return "Liên hệ";
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}

// ==================== 1. HÀM LẤY ID TỪ URL ====================
function getProductFromUrl() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const productId = urlParams.get('id'); 
    
    // Tìm trong dbProducts (biến toàn cục từ data.js)
    // Lưu ý: dbProducts phải được load từ file data.js trước
    if (typeof dbProducts === 'undefined') return null;
    return dbProducts.find(p => p.id == productId);
}

// ==================== 2. HÀM RENDER CHI TIẾT ====================
function renderProductDetail() {
    currentProduct = getProductFromUrl();
    
    const container = document.getElementById('product-detail-container');

    if (!currentProduct) {
        container.innerHTML = `
            <div style="text-align: center; grid-column: 1/-1;">
                <h2>⚠️ Không tìm thấy sản phẩm!</h2>
                <p>Có thể bạn chưa chọn sản phẩm nào từ trang chủ.</p>
                <a href="index.html" class="btn btn-dark mt-3" style="text-decoration: none;">Quay về trang chủ</a>
            </div>
        `;
        return;
    }

    const breadcrumbName = document.getElementById('breadcrumb-name');
    if(breadcrumbName) breadcrumbName.textContent = currentProduct.name;
    document.title = `${currentProduct.name} - ONEGEAR`;

    // --- XỬ LÝ ẢNH THÔNG MINH ---
    // Nếu có mảng images thì dùng, không thì dùng image đơn lẻ
    const imageList = currentProduct.images && currentProduct.images.length > 0 
                      ? currentProduct.images 
                      : [currentProduct.image];

    const imagesHtml = `
        <div class="image-gallery">
            <div class="main-image-box">
                <img id="mainImage" src="${imageList[0]}" alt="${currentProduct.name}" onerror="this.src='https://via.placeholder.com/400'">
            </div>
            <div class="thumbnail-list">
                ${imageList.map((img, index) => `
                    <img src="${img}" class="thumbnail-img ${index === 0 ? 'active' : ''}" 
                    onclick="changeMainImage(this, '${img}')"
                    onerror="this.src='https://via.placeholder.com/80'">
                `).join('')}
            </div>
        </div>
    `;

    const detailsHtml = `
        <div class="product-details">
            <h1>${currentProduct.name}</h1>
            
            <div class="price-tag" style="margin-top: 1rem; color: #db4444; font-size: 2.4rem; font-weight: bold;">
                ${formatMoney(currentProduct.price)}
            </div>
            
            <div class="product-meta mt-3">
                <p><strong>Thương hiệu:</strong> ${currentProduct.brand || 'Đang cập nhật'}</p>
                <p><strong>Kết nối:</strong> ${currentProduct.connection || 'Đang cập nhật'}</p>
                <p><strong>Bảo hành:</strong> 12 Tháng</p>
            </div>
            
            <hr class="mb-4">

            <div class="purchase-actions" style="display: flex; gap: 15px; align-items: center;">
                <div class="qty-control" style="display: flex; border: 1px solid #ddd; border-radius: 5px;">
                    <button class="qty-btn" onclick="updateQty(-1)" style="border:none; background:#fff; padding: 5px 15px; cursor:pointer;">-</button>
                    <input type="text" id="productQty" class="qty-input" value="1" readonly style="width: 40px; text-align: center; border:none; border-left:1px solid #ddd; border-right:1px solid #ddd;">
                    <button class="qty-btn" onclick="updateQty(1)" style="border:none; background:#fff; padding: 5px 15px; cursor:pointer;">+</button>
                </div>
                
                <button class="btn-buy-now" onclick="addToCart()" style="background: #db4444; color: white; border: none; padding: 10px 30px; border-radius: 5px; font-weight: bold; cursor: pointer;">
                    MUA NGAY
                </button>
            </div>
            
             <div class="service-info mt-4" style="border: 1px solid #eee; padding: 15px; border-radius: 5px;">
                <div class="service-item d-flex align-items-center mb-2">
                    <i class="fas fa-truck-fast me-3" style="font-size: 20px;"></i>
                    <div>
                        <h6 class="mb-0">Giao hàng miễn phí</h6>
                        <small class="text-muted">Cho đơn hàng trên 1 triệu</small>
                    </div>
                </div>
                <div class="service-item d-flex align-items-center">
                    <i class="fas fa-rotate me-3" style="font-size: 20px;"></i>
                    <div>
                        <h6 class="mb-0">Đổi trả hoàn tiền</h6>
                        <small class="text-muted">Trong vòng 30 ngày</small>
                    </div>
                </div>
            </div>
        </div>
    `;

    container.innerHTML = imagesHtml + detailsHtml;
}

// --- CÁC HÀM TƯƠNG TÁC ---
function changeMainImage(element, src) {
    document.getElementById('mainImage').src = src;
    document.querySelectorAll('.thumbnail-img').forEach(img => img.classList.remove('active'));
    element.classList.add('active');
}

function updateQty(change) {
    const qtyInput = document.getElementById('productQty');
    let currentQty = parseInt(qtyInput.value);
    currentQty += change;
    if (currentQty < 1) currentQty = 1;
    qtyInput.value = currentQty;
}

// ==================== 3. HÀM THÊM VÀO GIỎ HÀNG (ĐÃ FIX LỖI ẢNH) ====================
function addToCart() {
    // 1. Xác định key giỏ hàng
    const currentUser = JSON.parse(localStorage.getItem('ONEGEAR_CURRENT_USER'));
    let cartKey = 'ONEGEAR_CART_GUEST';
    if (currentUser && currentUser.email) {
        cartKey = `ONEGEAR_CART_${currentUser.email}`;
    }

    const qtyInput = document.getElementById('productQty');
    const quantity = parseInt(qtyInput.value);
    let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

    const existingItem = cart.find(item => item.id === currentProduct.id);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        // --- SỬA LỖI TẠI ĐÂY ---
        // Ưu tiên lấy currentProduct.image (vì trong data.js bạn dùng image)
        let finalImage = currentProduct.image;
        
        // Nếu không có image đơn lẻ thì mới tìm trong mảng images
        if (!finalImage && currentProduct.images && currentProduct.images.length > 0) {
            finalImage = currentProduct.images[0];
        }
        
        // Nếu vẫn không có thì dùng ảnh mặc định
        if (!finalImage) {
            finalImage = './img/banner/keyboard.png';
        }

        cart.push({
            id: currentProduct.id,
            name: currentProduct.name,
            price: currentProduct.price,
            image: finalImage, // Lưu đường dẫn ảnh chính xác
            quantity: quantity
        });
    }

    localStorage.setItem(cartKey, JSON.stringify(cart));

    if(confirm(`Đã thêm thành công! Bạn có muốn đến giỏ hàng ngay không?`)) {
        window.location.href = "./cart.html";
    }
}

// Chạy khi tải trang
document.addEventListener('DOMContentLoaded', () => {
    renderProductDetail();
});