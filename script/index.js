// 1. DỮ LIỆU SẢN PHẨM (Mô phỏng Database)
const products = [
  {
    id: 1,
    name: "Bàn phím SKYLOONG GK104 PRO Twilight Tri-mode",
    image: "img/products/AULAF81TM(Đen_Crystalswitch)F8102.png", // Bạn thay ảnh tương ứng
    price: 2490000,
    oldPrice: null,
    discount: null,
    rating: 0,
    reviews: 0,
    tags: ["Tri-mode", "Fullsize"],
    isHot: false
  },
  {
    id: 2,
    name: "Bàn phím AULA F99 PRO TM (Có núm xoay/ Xanh dương)",
    image: "img/products/AULAF81TM(Đen_IceSoulswitch)F8105.png",
    price: 1490000,
    oldPrice: 1829000,
    discount: 19,
    rating: 0,
    reviews: 0,
    tags: ["Có núm", "99 phím"],
    isHot: false
  },
  {
    id: 3,
    name: "Bàn phím AKKO 5075B Plus Red World Tour VIET NAM",
    image: "img/products/AULAF81TM(Hồng_Crystalswitch)F8103.png",
    price: 1790000,
    oldPrice: 2000000,
    discount: 11,
    rating: 5.0,
    reviews: 3,
    tags: ["Không dây", "75%"],
    isHot: true
  },
  {
    id: 4,
    name: "Bàn phím AKKO 5075B Plus Black World Tour VIET NAM",
    image: "img/products/AULAF81TM(Hồng_IceSoulswitch)F8107.png",
    price: 1790000,
    oldPrice: null,
    discount: null,
    rating: 5.0,
    reviews: 3,
    tags: ["Không dây", "75%"],
    isHot: true
  },
  {
    id: 5,
    name: "Bàn phím AKKO 5108B Plus Hatsune Miku Piano",
    image: "img/products/AULAF81TM(Tím_Crystalswitch)F8104.png",
    price: 2490000,
    oldPrice: null,
    discount: null,
    rating: 0,
    reviews: 0,
    tags: ["Fullsize", "Miku"],
    isHot: false
  },
  {
    id: 6,
    name: "Bàn phím AKKO TAC87 3 MODE Prunus Lannesiana",
    image: "img/products/AULAF81TM(Trắng_Crystalswitch)F8101.png",
    price: 1290000,
    oldPrice: 1390000,
    discount: 7,
    rating: 0,
    reviews: 0,
    tags: ["TKL", "3 Mode"],
    isHot: false
  },
  {
    id: 7,
    name: "Bàn phím Leobog Hi75C PRO TM (Be + trắng + nâu)",
    image: "img/products/AULAF81TM(Trắng_IceSoulswitch)F8106.png",
    price: 1650000,
    oldPrice: 2261000,
    discount: 27,
    rating: 5.0,
    reviews: 12,
    tags: ["Nhôm", "Núm xoay"],
    isHot: true
  },
  {
    id: 8,
    name: "Bàn phím cơ E-Dra EK387 Pro Gateron (Huano)",
    image: "img/products/AULAF99PROTM(Cónúmxoay_Xanhdương+Trắng+Tím_GreyWoodV3Switch)F9915.png", // Dùng tạm ảnh mẫu
    price: 890000,
    oldPrice: 1100000,
    discount: 19,
    rating: 4.5,
    reviews: 45,
    tags: ["TKL", "Có dây"],
    isHot: false
  },
  {
    id: 9,
    name: "Chuột Gaming Logitech G Pro X Superlight 2",
    image: "", // Dùng tạm ảnh mẫu
    price: 2990000,
    oldPrice: 3500000,
    discount: 15,
    rating: 5.0,
    reviews: 102,
    tags: ["Wireless", "Siêu nhẹ"],
    isHot: true
  },
  {
    id: 10,
    name: "Bàn phím MonsGeek M1W SP (Nhôm nguyên khối)",
    image: "./img/products/keyboard3.png", 
    price: 2850000,
    oldPrice: null,
    discount: null,
    rating: 4.9,
    reviews: 20,
    tags: ["Custom", "Nhôm"],
    isHot: true
  }
];

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

    const tagsHtml = product.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
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

// 4. CHẠY HÀM KHI TRANG WEB TẢI XONG
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
});