// script/contact.js

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("contactForm");

    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Ngăn trang web tải lại

        // 1. Lấy dữ liệu từ form
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;
        const message = document.getElementById("message").value;

        // 2. Tạo object tin nhắn mới
        const newMessage = {
            id: Date.now(), // Tạo ID duy nhất
            date: new Date().toLocaleString(),
            name: name,
            email: email,
            phone: phone,
            message: message
        };

        // 3. Lấy danh sách tin nhắn cũ từ LocalStorage (nếu có)
        let messages = JSON.parse(localStorage.getItem("contactMessages")) || [];
        
        // 4. Thêm tin nhắn mới vào danh sách
        messages.push(newMessage);

        // 5. Lưu lại vào LocalStorage
        localStorage.setItem("contactMessages", JSON.stringify(messages));

        // 6. Thông báo và xóa trắng form
        alert("Cảm ơn bạn! Chúng tôi đã nhận được tin nhắn và sẽ phản hồi sớm.");
        form.reset();
    });
});