// ==================== XỬ LÝ ĐĂNG NHẬP ====================

function login(event) {
    event.preventDefault(); // Ngăn form reload trang

    // 1. Lấy dữ liệu nhập vào
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // 2. Lấy danh sách user từ LocalStorage
    const users = JSON.parse(localStorage.getItem('ONEGEAR_USERS')) || [];

    // 3. Tìm xem có ai khớp email và password không
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        // --- ĐĂNG NHẬP THÀNH CÔNG ---
        
        // Lưu thông tin người đang đăng nhập vào 'CURRENT_USER'
        // Để các trang khác biết là ai đang dùng
        localStorage.setItem('ONEGEAR_CURRENT_USER', JSON.stringify(user));

        alert(`Chào mừng trở lại, ${user.name}!`);
        
        // Chuyển về trang chủ
        window.location.href = "./index.html";
    } else {
        // --- ĐĂNG NHẬP THẤT BẠI ---
        const resultDiv = document.getElementById('result');
        if(resultDiv) {
            resultDiv.innerHTML = '<p style="color: red; margin-top: 10px;">❌ Email hoặc mật khẩu không đúng!</p>';
        } else {
            alert("Email hoặc mật khẩu không đúng!");
        }
    }
}