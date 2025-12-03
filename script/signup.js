// script/signup.js

// ==================== XỬ LÝ ĐĂNG KÝ (CÓ OTP GIẢ LẬP) ====================

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

    // --- BẮT ĐẦU: LOGIC GIẢ LẬP GỬI OTP ---
    
    // a. Tạo mã ngẫu nhiên 6 chữ số
    const otpCode = Math.floor(100000 + Math.random() * 900000);

    // b. Giả vờ gửi email (Trong thực tế đoạn này sẽ gọi API backend)
    // Dùng setTimeout để tạo cảm giác "đang gửi"
    alert(`[HỆ THỐNG] Đang gửi mã xác thực về email: ${email}...`);
    
    // c. Hiện mã cho người dùng thấy (Simulation)
    setTimeout(() => {
        alert(`📧 Email từ ONEGEAR:\nMã xác thực (OTP) của bạn là: ${otpCode}`);

        // d. Yêu cầu người dùng nhập mã
        const userEnteredCode = prompt("Vui lòng nhập mã xác thực 6 số vừa nhận được:");

        // e. Kiểm tra mã
        if (userEnteredCode == otpCode) {
            // === MÃ ĐÚNG -> LƯU TÀI KHOẢN ===
            const newUser = { name, email, password };
            users.push(newUser);

            localStorage.setItem('ONEGEAR_USERS', JSON.stringify(users));

            alert("🎉 Xác thực thành công! Đăng ký hoàn tất.");
            window.location.href = "./login.html";
        } else {
            // === MÃ SAI ===
            alert("❌ Mã xác thực không đúng! Vui lòng thử lại.");
        }
    }, 500); // Delay 0.5s cho chân thật
}