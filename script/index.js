const products = dbProducts;

// 2. HÀM ĐỊNH DẠNG TIỀN TỆ (Để hiển thị 2.000.000đ đẹp hơn)
function formatCurrency(amount) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}

// 3. HÀM RENDER HTML
function renderProducts() {
  const container = document.getElementById('product-container');
  if (!container) return;

  let htmlContent = '';

  products.forEach(product => {
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

    // Nếu product.tags không có, thì dùng mảng rỗng [] để không bị lỗi
const tagsHtml = (product.tags || []).map(tag => `<span class="tag">${tag}</span>`).join('');
    const hotBadge = product.isHot ? `<div class="card-badge hot-deal"><i class="fas fa-fire"></i> HOT DEAL</div>` : '';

    htmlContent += `
      <div class="product-card-custom">
        ${hotBadge}
        <div class="product-img-wrap">
            <a href="product.html?id=${product.id}">
                <img src="${product.image}" alt="${product.name}" onerror="this.onerror=null;this.src='./img/products/keyboard1.png'">
            </a>
        </div>
        <div class="product-info">
            <h3 class="product-name">
                <a href="product.html?id=${product.id}" style="color: inherit; text-decoration: none;">
                    ${product.name}
                </a>
            </h3>
            <div class="product-tags">
                ${tagsHtml}
            </div>
            <div class="product-price-box">
                ${priceBoxHtml}
            </div>
            
            </div>
      </div>
    `;
  });

  container.innerHTML = htmlContent;
}

// ==================== LOGIC BỘ LỌC & SẮP XẾP ====================

// 1. Hàm lọc chính (Chạy khi bạn thay đổi bất kỳ ô select nào)
function filterProducts() {
    // Lấy giá trị từ các ô input
    const product_Type = document.getElementById('filter-type').value;
    const priceType = document.getElementById('filter-price').value;
    const brandType = document.getElementById('filter-brand').value;
    const connType  = document.getElementById('filter-connection').value;
    const ledType   = document.getElementById('filter-led').value;
    const keycapType = document.getElementById('filter-keycap').value;
    const sortType  = document.getElementById('sort-order').value;
    const layoutType = document.getElementById('filter-layout').value
    const purposeType = document.getElementById('filter-purpose').value
    const sizeType = document.getElementById('filter-size').value
    // Bắt đầu lọc
    let filteredData = products.filter(item => {
        // Mặc định là giữ lại (true), nếu vi phạm điều kiện nào thì loại bỏ (false)

        // --- Lọc GIÁ ---
        if (priceType === 'under-1' && item.price >= 1000000) return false;
        if (priceType === '1-3' && (item.price < 1000000 || item.price > 3000000)) return false;
        if (priceType === 'over-3' && item.price <= 3000000) return false;

        // --- Lọc HÃNG (So sánh không phân biệt hoa thường) ---
        if (brandType !== 'all' && item.brand.toLowerCase() !== brandType.toLowerCase()) return false;

        // --- Lọc KẾT NỐI ---
        if (connType !== 'all' && item.connection.toLowerCase() !== connType.toLowerCase()) return false;

        // --- Lọc LED ---
        if (ledType !== 'all' && item.led.toLowerCase() !== ledType.toLowerCase()) return false;

        // --- Lọc KEYCAP ---
        if (keycapType !== 'all' && item.keycap.toLowerCase() !== keycapType.toLowerCase()) return false;

        //--- Lọc Size ---
        if(sizeType !== 'all' && item.sizeType.toLowerCase() !== sizeType.toLowerCase()) return false;

        //--- Lọc Layout ---
        if(layoutType !== 'all' && item.layoutType.toLowerCase() !== layoutType.toLowerCase()) return false;

        // ---Lọc Purpose ---
        if(purposeType !== 'all' && item.purposeType.toLowerCase() !== purposeType.toLowerCase()) return false;

        // ---Lọc Type ---
        if(product_Type !== 'all' && item.type.toLowerCase() !== product_Type.toLowerCase()) return false;

        return true; // Nếu qua được hết các cửa ải trên thì giữ lại
    });

    // Sau khi lọc xong thì SẮP XẾP
    if (sortType === 'price-asc') {
        filteredData.sort((a, b) => a.price - b.price);
    } else if (sortType === 'price-desc') {
        filteredData.sort((a, b) => b.price - a.price);
    } else if (sortType === 'name-asc') {
        filteredData.sort((a, b) => a.name.localeCompare(b.name));
    }

    // Vẽ lại giao diện
    renderFilteredList(filteredData);
}

// 2. Hàm vẽ lại danh sách (Chỉ dùng cho bộ lọc)
function renderFilteredList(data) {
    const container = document.getElementById('product-container');
    
    if (data.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 4rem;">
                <h3>😢 Không tìm thấy sản phẩm nào!</h3>
                <p>Hãy thử bỏ bớt các tiêu chí lọc xem sao.</p>
            </div>
        `;
        return;
    }

    let htmlContent = '';
    
    // Tái sử dụng logic vẽ HTML cũ
    data.forEach(product => {
        let priceBoxHtml = `
            <div class="price-row" style="margin-top: auto">
                <span class="new-price">${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}</span>
            </div>
        `;
        
        // Nếu có giá cũ
        if (product.oldPrice) {
             priceBoxHtml = `
                <span class="old-price">${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.oldPrice)}</span>
                <div class="price-row">
                    <span class="new-price">${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}</span>
                </div>
              `;
        }

        const hotBadge = product.isHot ? `<div class="card-badge hot-deal"><i class="fas fa-fire"></i> HOT DEAL</div>` : '';

        htmlContent += `
          <div class="product-card-custom">
            ${hotBadge}
            <div class="product-img-wrap">
                <a href="product.html?id=${product.id}">
                    <img src="${product.image}" alt="${product.name}" onerror="this.onerror=null;this.src='./img/products/keyboard1.png'">
                </a>
            </div>
            <div class="product-info">
                <h3 class="product-name">
                    <a href="product.html?id=${product.id}">${product.name}</a>
                </h3>
                <div class="product-price-box">${priceBoxHtml}</div>
            </div>
          </div>
        `;
    });

    container.innerHTML = htmlContent;
}

// 3. Hàm Reset (Xóa hết lọc)
function resetFilters() {
    document.getElementById('filter-price').value = 'all';
    document.getElementById('filter-brand').value = 'all';
    document.getElementById('filter-connection').value = 'all';
    document.getElementById('filter-led').value = 'all';
    document.getElementById('filter-keycap').value = 'all';
    document.getElementById('sort-order').value = 'default';
    
    // Gọi lại hàm lọc để hiện tất cả
    filterProducts();
}

// 4. CHẠY HÀM KHI TRANG WEB TẢI XONG
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
});