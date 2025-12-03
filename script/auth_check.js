// ==================== QUẢN LÝ TRẠNG THÁI ĐĂNG NHẬP/ĐĂNG XUẤT ====================

document.addEventListener('DOMContentLoaded', () => {
    updateUserInterface();
});

function updateUserInterface() {
    // 1. Lấy thông tin người dùng hiện tại
    const currentUser = JSON.parse(localStorage.getItem('ONEGEAR_CURRENT_USER'));
    
    // Nếu chưa đăng nhập thì thôi, không làm gì cả
    if (!currentUser) return;

    // 2. Tìm danh sách menu (ul.navbar-nav)
    const navList = document.querySelector('.navbar-nav');
    if (!navList) return;

    // 3. Ẩn các nút "Đăng ký", "Đăng nhập" cũ đi
    // Chúng ta tìm các thẻ <a> có chứa chữ Đăng nhập/Đăng ký
    const links = navList.querySelectorAll('a.nav-link');
    links.forEach(link => {
        const text = link.innerText.toLowerCase();
        if (text.includes('đăng ký') || text.includes('đăng nhập') || text.includes('sign up')) {
            link.parentElement.style.display = 'none'; // Ẩn thẻ li chứa nó
        }
    });

    // 4. Thêm Menu "Xin chào..." và nút Đăng xuất
    // Sử dụng Dropdown của Bootstrap
    const userMenuHtml = `
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" style="color: #db4444; font-weight: bold;">
                Xin chào, ${currentUser.name}
            </a>
            <ul class="dropdown-menu" aria-labelledby="userDropdown">
                <li><a class="dropdown-item" href="./history.html">📦 Lịch sử mua hàng</a></li> <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="#" onclick="logoutUser()">Đăng xuất</a></li>
            </ul>
        </li>
    `;

    // Chèn vào cuối danh sách menu
    navList.insertAdjacentHTML('beforeend', userMenuHtml);
}

// ==================== HÀM ĐĂNG XUẤT ====================
// Hàm này phải khai báo dạng window.logoutUser để HTML gọi được
window.logoutUser = function() {
    if(confirm("Bạn có chắc chắn muốn đăng xuất không?")) {
        // 1. Xóa thông tin người dùng khỏi LocalStorage
        localStorage.removeItem('ONEGEAR_CURRENT_USER');
        
        // 2. (Tùy chọn) Xóa giỏ hàng nếu muốn đăng xuất là mất giỏ
        // localStorage.removeItem('ONEGEAR_CART');

        // 3. Tải lại trang để giao diện quay về như cũ
        window.location.reload();
        
        // Hoặc chuyển về trang chủ:
        // window.location.href = 'index.html';
    }
}