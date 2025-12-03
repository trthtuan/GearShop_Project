// script/index.js

// 1. KIỂM TRA DỮ LIỆU
if (typeof dbProducts === 'undefined') {
    console.error("Lỗi: Không tìm thấy dbProducts. Hãy kiểm tra lại file data.js!");
    alert("Lỗi dữ liệu sản phẩm! Vui lòng tải lại trang.");
}

// Biến chứa danh sách sản phẩm gốc
const products = dbProducts || [];

// 2. HÀM ĐỊNH DẠNG TIỀN TỆ
function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}

// 3. HÀM RENDER HTML (HIỂN THỊ SẢN PHẨM)
function renderFilteredList(data) {
    const container = document.getElementById('product-container');
    if (!container) return;

    if (data.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 5rem;">
                <h3 class="text-muted">😢 Không tìm thấy sản phẩm phù hợp!</h3>
                <p>Vui lòng thử từ khóa hoặc bộ lọc khác.</p>
                <button class="btn btn-outline-dark mt-3" onclick="resetFilters()">Xóa bộ lọc</button>
            </div>
        `;
        return;
    }

    let htmlContent = '';

    data.forEach(product => {
        // Xử lý hiển thị giá
        let priceBoxHtml = '';
        if (product.oldPrice) {
            priceBoxHtml = `
                <span class="old-price">${formatCurrency(product.oldPrice)}</span>
                <div class="price-row">
                    <span class="new-price">${formatCurrency(product.price)}</span>
                    <span class="discount-tag">-${product.discount}%</span>
                </div>
            `;
        } else {
            priceBoxHtml = `
                <div class="price-row" style="margin-top: auto">
                    <span class="new-price">${formatCurrency(product.price)}</span>
                </div>
            `;
        }

        // Xử lý tags và nhãn hot
        const tagsHtml = (product.tags || []).map(tag => `<span class="tag">${tag}</span>`).join('');
        const hotBadge = product.isHot ? `<div class="card-badge hot-deal"><i class="fas fa-fire"></i> HOT</div>` : '';

        // Xử lý ảnh lỗi
        const fallbackImg = './img/keyboard/keyboard1.jpg';

        htmlContent += `
            <div class="product-card-custom">
                ${hotBadge}
                <div class="product-img-wrap">
                    <a href="product.html?id=${product.id}">
                        <img src="${product.image}" alt="${product.name}" onerror="this.src='${fallbackImg}'">
                    </a>
                </div>
                <div class="product-info">
                    <h3 class="product-name">
                        <a href="product.html?id=${product.id}" style="color: inherit; text-decoration: none;">
                            ${product.name}
                        </a>
                    </h3>
                    <div class="product-tags mb-2">${tagsHtml}</div>
                    <div class="product-price-box">${priceBoxHtml}</div>
                </div>
            </div>
        `;
    });

    container.innerHTML = htmlContent;
}

// 4. HÀM LỌC CHÍNH (LOGIC KẾT HỢP)
function filterProducts() {
    // Lấy giá trị từ các ô input
    const priceType = document.getElementById('filter-price').value;
    const brandType = document.getElementById('filter-brand').value;
    const connType  = document.getElementById('filter-connection').value;
    const ledType   = document.getElementById('filter-led').value;
    const keycapType = document.getElementById('filter-keycap').value;
    const sortType  = document.getElementById('sort-order').value;

    // Bắt đầu lọc
    let filteredData = products.filter(item => {
        // Mặc định là giữ lại (true), nếu vi phạm điều kiện nào thì loại bỏ (false)
        
        // --- Lọc GIÁ ---
        if (priceType === 'under-1' && item.price >= 1000000) return false;
        if (priceType === '1-3' && (item.price < 1000000 || item.price > 3000000)) return false;
        if (priceType === 'over-3' && item.price <= 3000000) return false;

        // 4. Lọc theo HÃNG
        if (brandVal !== 'all' && item.brand.toLowerCase() !== brandVal.toLowerCase()) return false;

        // --- Lọc KẾT NỐI ---
        if (connType !== 'all' && item.connection !== connType) return false;

        // --- Lọc LED ---
        if (ledType !== 'all' && item.led !== ledType) return false;

        // --- Lọc KEYCAP ---
        if (keycapType !== 'all' && item.keycap !== keycapType) return false;

        return true; // Giữ lại sản phẩm thỏa mãn tất cả điều kiện
    });

    // d. Thực hiện Sắp xếp
    if (sortVal === 'price-asc') {
        filteredData.sort((a, b) => a.price - b.price);
    } else if (sortVal === 'price-desc') {
        filteredData.sort((a, b) => b.price - a.price);
    } else if (sortVal === 'name-asc') {
        filteredData.sort((a, b) => a.name.localeCompare(b.name));
    }

    // e. Vẽ lại giao diện
    renderFilteredList(filteredData);
}

// 5. HÀM RESET BỘ LỌC
function resetFilters() {
    // Reset các dropdown về 'all'
    const selects = document.querySelectorAll('.custom-select-filter');
    selects.forEach(select => select.value = 'all');
    
    // Reset ô tìm kiếm
    const searchInput = document.getElementById('search-input');
    if (searchInput) searchInput.value = '';

    // Reset sắp xếp
    const sortSelect = document.getElementById('sort-order');
    if (sortSelect) sortSelect.value = 'default';

    // Gọi lại hàm lọc
    filterProducts();
}

// 6. KHỞI CHẠY
document.addEventListener('DOMContentLoaded', () => {
    // Render lần đầu (hiển thị tất cả)
    renderFilteredList(products);
});