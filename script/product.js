// ==================== 1. KHO DỮ LIỆU SẢN PHẨM ====================
const allProducts = [
    {
        id: 1,
        name: "Bàn phím SKYLOONG GK104 PRO Twilight Tri-mode",
        price: 2490000,
        rating: 4.5,
        reviews: 10,
        stock: true,
        description: "Bàn phím cơ SKYLOONG GK104 PRO với 3 chế độ kết nối, màn hình LED tùy chỉnh, switch Glacier độc quyền. Keycap PBT chất lượng cao.",
        colors: ["#333", "#555"],
        sizes: ["Fullsize"],
        images: ["img/products/EDrakhôngdâyEK375ProBetaRedSwitch(1).png", "img/products/EDrakhôngdâyEK375ProBetaRedSwitch(1).png"]
    },
    {
        id: 2,
        name: "Bàn phím AULA F99 PRO TM (Có núm xoay/ Xanh dương)",
        price: 1490000,
        oldPrice: 1829000,
        rating: 4.8,
        reviews: 25,
        stock: true,
        description: "AULA F99 Pro là phiên bản nâng cấp với mạch xuôi, gasket mount êm ái, pin trâu 8000mAh. Màu xanh dương mát mắt.",
        colors: ["#87CEEB", "#ffffff"],
        sizes: ["99 phím"],
        images: ["./img/products/aula-f99.png", "./img/products/keyboard2.png"]
    },
    {
        id: 3,
        name: "Bàn phím AKKO 5075B Plus Red World Tour VIET NAM",
        price: 1790000,
        rating: 5.0,
        reviews: 3,
        stock: true,
        description: "Phiên bản đặc biệt tôn vinh văn hóa Việt Nam với họa tiết trống đồng, màu cờ sắc áo. Led RGB rực rỡ.",
        colors: ["#db4444", "#ffff00"],
        sizes: ["75%"],
        images: ["img/products/AULAF81TM(Đen_IceSoulswitch)F8105.png", "img/products/AULAF81TM(Đen_IceSoulswitch)F8105.png"]
    },
    {
        id: 101, 
        name: "Tay cầm chơi game Havic HV G-92",
        price: 550000,
        rating: 4.5,
        reviews: 150,
        stock: true,
        description: "Tay cầm chơi game Havic HV G-92 thiết kế công thái học...",
        colors: ["#db4444", "#333"],
        sizes: ["Standard"],
        images: ["img/products/AULAF99PROTM(Cónúmxoay_Xanhdương+Trắng+Tím_GreyWoodV3Switch)F9915.png", "img/products/AULAF99PROTM(Cónúmxoay_Xanhdương+Trắng+Tím_GreyWoodV3Switch)F9915.png"]
    }
];

// --- QUAN TRỌNG: Khai báo biến toàn cục ở đây ---
let currentProduct = null;

// Hàm định dạng tiền tệ
function formatMoney(amount) {
    if(!amount) return "Liên hệ";
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}

// ==================== 2. HÀM LẤY ID TỪ URL ====================
function getProductFromUrl() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const productId = urlParams.get('id'); 
    
    // Tìm sản phẩm trong mảng allProducts
    return allProducts.find(p => p.id == productId);
}

// ==================== 3. HÀM RENDER CHI TIẾT ====================
function renderProductDetail() {
    currentProduct = getProductFromUrl();
    
    const container = document.getElementById('product-detail-container');

    if (!currentProduct) {
        container.innerHTML = `
            <div style="text-align: center; grid-column: 1/-1;">
                <h2>⚠️ Không tìm thấy sản phẩm!</h2>
                <a href="index.html" class="btn-buy-now" style="text-decoration: none;">Quay về trang chủ</a>
            </div>
        `;
        return;
    }

    const breadcrumbName = document.getElementById('breadcrumb-name');
    if(breadcrumbName) breadcrumbName.textContent = currentProduct.name;
    document.title = `${currentProduct.name} - ONEGEAR`;

    const imageList = currentProduct.images && currentProduct.images.length > 0 
                      ? currentProduct.images 
                      : [currentProduct.image || './img/products/keyboard1.png'];

    const imagesHtml = `
        <div class="image-gallery">
            <div class="main-image-box">
                <img id="mainImage" src="${imageList[0]}" alt="${currentProduct.name}" onerror="this.onerror=null;this.src='https://via.placeholder.com/400'">
            </div>
            <div class="thumbnail-list">
                ${imageList.map((img, index) => `
                    <img src="${img}" class="thumbnail-img ${index === 0 ? 'active' : ''}" 
                    onclick="changeMainImage(this, '${img}')"
                    onerror="this.onerror=null;this.src='https://via.placeholder.com/80'">
                `).join('')}
            </div>
        </div>
    `;

    const detailsHtml = `
        <div class="product-details">
            <h1>${currentProduct.name}</h1>
            
            <div class="price-tag" style="margin-top: 1rem;">${formatMoney(currentProduct.price)}</div>
            
            <p class="product-desc">${currentProduct.description || "Đang cập nhật mô tả..."}</p>
            
            <hr class="mb-4">

            ${currentProduct.colors ? `
            <div class="option-group">
                <span class="option-title">Màu sắc:</span>
                <div class="color-options">
                    ${currentProduct.colors.map((color, index) => `
                        <span class="color-circle ${index === 0 ? 'selected' : ''}" 
                        style="background-color: ${color}" onclick="selectOption(this, 'color')"></span>
                    `).join('')}
                </div>
            </div>` : ''}

            <div class="purchase-actions">
                <div class="qty-control">
                    <button class="qty-btn" onclick="updateQty(-1)">-</button>
                    <input type="text" id="productQty" class="qty-input" value="1" readonly>
                    <button class="qty-btn" onclick="updateQty(1)">+</button>
                </div>
                
                <button class="btn-buy-now" onclick="addToCart()">Mua Ngay</button>
                
                </div>
            
             <div class="service-info">
                <div class="service-item">
                    <i class="fas fa-truck-fast service-icon"></i>
                    <div class="service-text">
                        <h5>Giao hàng miễn phí</h5>
                        <p>Nhập mã bưu điện để kiểm tra</p>
                    </div>
                </div>
                <div class="service-item">
                    <i class="fas fa-rotate service-icon"></i>
                    <div class="service-text">
                        <h5>Đổi trả hoàn tiền</h5>
                        <p>Miễn phí đổi trả trong 30 ngày</p>
                    </div>
                </div>
            </div>
        </div>
    `;

    container.innerHTML = imagesHtml + detailsHtml;
}

// Hàm render sao
// function renderStars(rating) {
//     let starsHtml = '';
//     for (let i = 1; i <= 5; i++) {
//         if (i <= rating) starsHtml += '<i class="fas fa-star"></i>';
//         else if (i === Math.ceil(rating) && !Number.isInteger(rating)) starsHtml += '<i class="fas fa-star-half-alt"></i>';
//         else starsHtml += '<i class="far fa-star"></i>';
//     }
//     return starsHtml;
// }

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

function selectOption(element, type) {
    const selector = type === 'color' ? '.color-circle' : '.size-btn';
    element.parentElement.querySelectorAll(selector).forEach(el => el.classList.remove('selected'));
    element.classList.add('selected');
}

// ==================== HÀM THÊM VÀO GIỎ HÀNG (QUAN TRỌNG) ====================
// ==================== HÀM THÊM VÀO GIỎ HÀNG (ĐA TÀI KHOẢN) ====================
function addToCart() {
    // 1. Kiểm tra xem ai đang đăng nhập
    const currentUser = JSON.parse(localStorage.getItem('ONEGEAR_CURRENT_USER'));
    
    // 2. Tạo tên key cho giỏ hàng (Nếu đăng nhập thì dùng email làm key, không thì dùng GUEST)
    let cartKey = 'ONEGEAR_CART_GUEST';
    if (currentUser) {
        cartKey = `ONEGEAR_CART_${currentUser.email}`;
    }

    // 3. Lấy số lượng
    const qtyInput = document.getElementById('productQty');
    // Nếu không ở trang chi tiết (không có input) thì mặc định là 1
    const quantity = qtyInput ? parseInt(qtyInput.value) : 1; 

    // 4. Lấy giỏ hàng tương ứng
    let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

    // 5. Logic thêm sản phẩm (Giữ nguyên)
    // Lưu ý: currentProduct phải được khai báo toàn cục từ trước
    const existingItem = cart.find(item => item.id === currentProduct.id);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        let productImage = './img/products/keyboard1.png';
        if (currentProduct.images && currentProduct.images.length > 0) {
            productImage = currentProduct.images[0];
        }

        cart.push({
            id: currentProduct.id,
            name: currentProduct.name,
            price: currentProduct.price,
            image: productImage,
            quantity: quantity
        });
    }

    // 6. Lưu vào đúng key của người dùng đó
    localStorage.setItem(cartKey, JSON.stringify(cart));

    if(confirm(`Đã thêm thành công! Bạn có muốn đến giỏ hàng ngay không?`)) {
        window.location.href = "./cart.html";
    }
}
// Chạy khi tải trang
document.addEventListener('DOMContentLoaded', () => {
    renderProductDetail();
});