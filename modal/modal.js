document.addEventListener('DOMContentLoaded', function() {
    console.log("Modal Script đã sẵn sàng!"); // Kiểm tra xem file có load không

    const modal = document.getElementById("productModal");
    const modalBody = document.getElementById("modal-body");
    const closeBtn = document.querySelector(".close-btn");

    // Lắng nghe sự kiện click trên toàn bộ trang
    document.addEventListener('click', function(e) {
        // Kiểm tra nếu thứ vừa bấm có class là 'view-btn'
        if (e.target && e.target.classList.contains('view-btn')) {
            console.log("Đã bấm nút Xem chi tiết!");
            
            const card = e.target.closest('.art-card');
            if (!card) return;

            // Lấy thông tin
            const title = card.querySelector('h4').innerText;
            const author = card.querySelector('.author').innerText;
            const price = card.querySelector('.art-price').innerText;
            const imgSrc = card.querySelector('img').src;

            // Đổ nội dung vào Modal
            modalBody.innerHTML = `
                <img src="${imgSrc}" style="width:100%; border-radius:10px; margin-bottom:15px;">
                <h2 style="color:#333;">${title}</h2>
                <p style="color:#666; margin:5px 0;">${author}</p>
                <h3 style="color:#ff4757;">${price}</h3>
                <hr style="margin:15px 0; border:0; border-top:1px solid #eee;">
                <p style="font-style:italic; color:#888;">Nội dung chi tiết cho bài viết này đang được các thành viên Tổ 1 cập nhật. Vui lòng quay lại sau nhé bro!</p>
            `;

            modal.style.display = "block";
        }
    });

    // Đóng modal khi bấm nút X
    if(closeBtn) {
        closeBtn.onclick = function() {
            modal.style.display = "none";
        }
    }

    // Đóng khi bấm ra ngoài
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});