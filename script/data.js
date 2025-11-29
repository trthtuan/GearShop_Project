// script/data.js - KHO DỮ LIỆU SẢN PHẨM HOÀN CHỈNH

const dbProducts = [
  // ==================== BÀN PHÍM ====================
  {
    id: 101,
    name: "Bàn phím không dây Hyper Hyperspace HS2310US",
    image: "img/keyboard/keyboard1.jpg",
    price: 990000,
    rating: 4.5, reviews: 10, isHot: true,
    type: "Bàn phím", brand: "HyperWork", connection: "Wireless", led: "None", size: "75%", keycap: "PBT"
  },
  {
    id: 102,
    name: "Bàn phím cơ E-DRA EK375 V2 Beta Blue Black",
    image: "./img/keyboard/keyboard2.jpg",
    price: 650000,
    rating: 4.2, reviews: 45, isHot: false,
    type: "Bàn phím", brand: "E-Dra", connection: "Wired", led: "Rainbow", size: "75%", keycap: "ABS"
  },
  {
    id: 103,
    name: "Bàn phím không dây Philips SPK6338BS",
    image: "img/keyboard/keyboard3.jpg",
    price: 450000,
    rating: 4.0, reviews: 20, isHot: false,
    type: "Bàn phím", brand: "Philips", connection: "Wireless", led: "None", size: "Mini", keycap: "ABS"
  },
  {
    id: 104,
    name: "Bàn phím cơ không dây AULA F75 Đen",
    image: "img/keyboard/keyboard4.jpg",
    price: 1450000,
    rating: 4.9, reviews: 88, isHot: true,
    type: "Bàn phím", brand: "Aula", connection: "Wireless", led: "RGB", size: "75%", keycap: "PBT"
  },
  {
    id: 105,
    name: "Bàn phím cơ không dây AULA F75 Trắng Xanh Gradient",
    image: "img/keyboard/keyboard5.jpg",
    price: 1490000,
    rating: 5.0, reviews: 32, isHot: true,
    type: "Bàn phím", brand: "Aula", connection: "Wireless", led: "RGB", size: "75%", keycap: "PBT"
  },
  {
    id: 106,
    name: "Bàn phím cơ không dây FL-Esports CMK75 Desert Grey",
    image: "img/keyboard/keyboard6.jpg",
    price: 3200000,
    rating: 5.0, reviews: 15, isHot: true,
    type: "Bàn phím", brand: "FL-Esports", connection: "Wireless", led: "RGB", size: "75%", keycap: "PBT"
  },
  {
    id: 107,
    name: "Bàn phím cơ E-DRA không dây EK368L Alpha",
    image: "img/keyboard/keyboard7.jpg",
    price: 790000,
    rating: 4.4, reviews: 60, isHot: false,
    type: "Bàn phím", brand: "E-Dra", connection: "Wireless", led: "RGB", size: "Mini", keycap: "ABS"
  },
  {
    id: 108,
    name: "Bàn phím Bluetooth Logitech K250",
    image: "img/keyboard/keyboard8.jpg",
    price: 550000,
    rating: 4.3, reviews: 100, isHot: false,
    type: "Bàn phím", brand: "Logitech", connection: "Wireless", led: "None", size: "Fullsize", keycap: "ABS"
  },
  {
    id: 109,
    name: "Bàn phím cơ không dây Aula S100 Pro Xanh/Trắng",
    image: "img/keyboard/keyboard9.jpg",
    price: 890000,
    rating: 4.6, reviews: 25, isHot: false,
    type: "Bàn phím", brand: "Aula", connection: "Wireless", led: "Rainbow", size: "TKL", keycap: "ABS"
  },
  {
    id: 110,
    name: "Bàn phím cơ không dây AULA F75 Ice Green",
    image: "img/keyboard/keyboard10.jpg",
    price: 1450000,
    rating: 4.9, reviews: 40, isHot: true,
    type: "Bàn phím", brand: "Aula", connection: "Wireless", led: "RGB", size: "75%", keycap: "PBT"
  },

  // ==================== CHUỘT (MICE) ====================
  {
    id: 201,
    name: "Chuột không dây Logitech MX Master 2S",
    image: "img/mouse/mouse1.jpg",
    price: 1690000,
    rating: 4.8, reviews: 200, isHot: true,
    type: "Chuột", brand: "Logitech", connection: "Wireless", led: "None", size: "Lớn", keycap: "None"
  },
  {
    id: 202,
    name: "Chuột Gaming không dây Logitech G304 Lightspeed",
    image: "img/mouse/mouse2.jpg",
    price: 890000,
    rating: 4.7, reviews: 500, isHot: true,
    type: "Chuột", brand: "Logitech", connection: "Wireless", led: "None", size: "Trung bình", keycap: "None"
  },
  {
    id: 203,
    name: "Chuột có dây Gaming Logitech G102 LightSync Gen 2",
    image: "img/mouse/mouse3.jpg",
    price: 450000,
    rating: 4.9, reviews: 1000, isHot: true,
    type: "Chuột", brand: "Logitech", connection: "Wired", led: "RGB", size: "Nhỏ", keycap: "None"
  },
  {
    id: 204,
    name: "Chuột không dây Logitech Signature M650 Size M",
    image: "img/mouse/mouse4.jpg",
    price: 750000,
    rating: 4.6, reviews: 80, isHot: false,
    type: "Chuột", brand: "Logitech", connection: "Wireless", led: "None", size: "Trung bình", keycap: "None"
  },
  {
    id: 205,
    name: "Chuột không dây Logitech MX Anywhere 3S",
    image: "img/mouse/mouse5.jpg",
    price: 1990000,
    rating: 4.8, reviews: 60, isHot: true,
    type: "Chuột", brand: "Logitech", connection: "Wireless", led: "None", size: "Nhỏ", keycap: "None"
  },
  {
    id: 206,
    name: "Chuột không dây Logitech M331 Silent",
    image: "img/mouse/mouse6.jpg",
    price: 390000,
    rating: 4.5, reviews: 300, isHot: false,
    type: "Chuột", brand: "Logitech", connection: "Wireless", led: "None", size: "Nhỏ", keycap: "None"
  },
  {
    id: 207,
    name: "Chuột không dây Logitech Signature M650 Size L",
    image: "img/mouse/mouse7.jpg",
    price: 750000,
    rating: 4.6, reviews: 45, isHot: false,
    type: "Chuột", brand: "Logitech", connection: "Wireless", led: "None", size: "Lớn", keycap: "None"
  },
  {
    id: 208,
    name: "Chuột gaming Logitech Pro X Superlight 2 Lightspeed",
    image: "img/mouse/mouse8.jpg",
    price: 3500000,
    rating: 5.0, reviews: 150, isHot: true,
    type: "Chuột", brand: "Logitech", connection: "Wireless", led: "None", size: "Trung bình", keycap: "None"
  },
  {
    id: 209,
    name: "Chuột Gaming Logitech G502 Hero",
    image: "img/mouse/mouse9.jpg",
    price: 990000,
    rating: 4.8, reviews: 600, isHot: true,
    type: "Chuột", brand: "Logitech", connection: "Wired", led: "RGB", size: "Lớn", keycap: "None"
  },

  // ==================== COMBO (PHÍM + CHUỘT) ====================
  {
    id: 301,
    name: "Combo bàn phím + Chuột không dây Logitech MK240",
    image: "img/combo/combo1.jpg",
    price: 550000,
    rating: 4.4, reviews: 120, isHot: true,
    type: "Combo", brand: "Logitech", connection: "Wireless", led: "None", size: "Mini", keycap: "ABS"
  },
  {
    id: 302,
    name: "Combo Bàn phím + Chuột không dây Rapoo 8000M",
    image: "img/combo/combo2.jpg",
    price: 390000,
    rating: 4.2, reviews: 80, isHot: false,
    type: "Combo", brand: "Rapoo", connection: "Wireless", led: "None", size: "TKL", keycap: "ABS"
  },
  {
    id: 303,
    name: "Combo bàn phím + Chuột không dây Logitech MK470 Slim",
    image: "img/combo/combo3.jpg",
    price: 1100000,
    rating: 4.7, reviews: 90, isHot: true,
    type: "Combo", brand: "Logitech", connection: "Wireless", led: "None", size: "Fullsize", keycap: "ABS"
  },
  {
    id: 304,
    name: "Combo bàn phím + Chuột không dây Logitech MK295 Silent",
    image: "img/combo/combo4.jpg",
    price: 790000,
    rating: 4.5, reviews: 150, isHot: false,
    type: "Combo", brand: "Logitech", connection: "Wireless", led: "None", size: "Fullsize", keycap: "ABS"
  },
  {
    id: 305,
    name: "Combo bàn phím + chuột gaming Aula T102",
    image: "img/combo/combo5.jpg",
    price: 450000,
    rating: 4.3, reviews: 60, isHot: false,
    type: "Combo", brand: "Aula", connection: "Wired", led: "Rainbow", size: "Fullsize", keycap: "ABS"
  },
  {
    id: 306,
    name: "Combo bàn phím + chuột không dây Dell KM3322W Đen",
    image: "img/combo/combo6.jpg",
    price: 350000,
    rating: 4.4, reviews: 40, isHot: false,
    type: "Combo", brand: "Dell", connection: "Wireless", led: "None", size: "Fullsize", keycap: "ABS"
  },
  {
    id: 307,
    name: "Combo bàn phím + chuột Gaming Aula F2023",
    image: "img/combo/combo7.jpg",
    price: 550000,
    rating: 4.5, reviews: 30, isHot: false,
    type: "Combo", brand: "Aula", connection: "Wired", led: "RGB", size: "TKL", keycap: "ABS"
  },
  {
    id: 308,
    name: "Combo bàn phím + Chuột có dây Logitech MK200",
    image: "img/combo/combo8.jpg",
    price: 320000,
    rating: 4.6, reviews: 500, isHot: true,
    type: "Combo", brand: "Logitech", connection: "Wired", led: "None", size: "Fullsize", keycap: "ABS"
  },
  {
    id: 309,
    name: "Combo Bàn phím + Chuột không dây Logitech MK235",
    image: "img/combo/combo9.jpg",
    price: 590000,
    rating: 4.5, reviews: 220, isHot: false,
    type: "Combo", brand: "Logitech", connection: "Wireless", led: "None", size: "Fullsize", keycap: "ABS"
  },
  {
    id: 310,
    name: "Combo bàn phím + Chuột không dây Logitech MK345",
    image: "img/combo/combo10.jpg",
    price: 850000,
    rating: 4.7, reviews: 180, isHot: true,
    type: "Combo", brand: "Logitech", connection: "Wireless", led: "None", size: "Fullsize", keycap: "ABS"
  }
];
