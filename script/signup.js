// ==================== XỬ LÝ ĐĂNG KÝ ====================

function signup(event) {
    event.preventDefault(); // Ngăn form reload lại trang

    // 1. Lấy dữ liệu từ ô nhập
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // 2. Validate (Kiểm tra dữ liệu)
    if (!name || !email || !password) {
        alert("Vui lòng điền đầy đủ thông tin!");
        return;
    }

    if (password.length < 6) {
        alert("Mật khẩu phải có ít nhất 6 ký tự!");
        return;
    }

    // 3. Lấy danh sách user đã lưu trong LocalStorage (nếu có)
    const users = JSON.parse(localStorage.getItem('ONEGEAR_USERS')) || [];

    // 4. Kiểm tra xem email đã tồn tại chưa
    const isExist = users.some(user => user.email === email);
    if (isExist) {
        alert("Email này đã được đăng ký! Vui lòng dùng email khác.");
        return;
    }

    // 5. Tạo user mới và lưu lại
    const newUser = { name, email, password };
    users.push(newUser);

    // Lưu mảng users mới xuống LocalStorage
    localStorage.setItem('ONEGEAR_USERS', JSON.stringify(users));

    // 6. Thông báo và chuyển sang trang đăng nhập
    alert("🎉 Đăng ký thành công! Hãy đăng nhập ngay.");
    window.location.href = "./login.html";
}