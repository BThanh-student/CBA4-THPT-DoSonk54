/**
 * profile.js — Nằm trong thư mục script/ hoặc gốc
 * Quản lý: Thanh cuộn Slider thành viên + Đóng mở Popup Profile thành viên
 * BÁO TƯỜNG TỔ 1 - 12A4 | OPTIMIZED VERSION
 */
document.addEventListener("DOMContentLoaded", function () {

    // =========================================================
    // 1. QUẢN LÝ THANH TRƯỢT THÀNH VIÊN (MEMBER SLIDER)
    // =========================================================
    const slider = document.querySelector(".member-slider");
    const nextBtn = document.getElementById("nextBtn");
    const prevBtn = document.getElementById("prevBtn");

    if (slider && nextBtn && prevBtn) {
        // Hàm tính toán chiều rộng thực tế của một Card (gồm cả khoảng cách gap)
        function getCardWidth() {
            const gap = parseInt(window.getComputedStyle(slider).gap) || 20;
            const firstCard = slider.querySelector(".member-card");
            return firstCard ? (firstCard.offsetWidth + gap) : 270;
        }

        // Click nút Next (Trượt sang phải)
        nextBtn.addEventListener("click", () => {
            slider.scrollBy({
                left: getCardWidth(),
                behavior: "smooth"
            });
        });

        // Click nút Prev (Trượt sang trái)
        prevBtn.addEventListener("click", () => {
            slider.scrollBy({
                left: -getCardWidth(),
                behavior: "smooth"
            });
        });
    }

    // =========================================================
    // 2. QUẢN LÝ POPUP CHI TIẾT THÀNH VIÊN (PROFILE MODAL)
    // =========================================================
    const cards = document.querySelectorAll(".member-card");
    const modals = document.querySelectorAll(".profile-modal");

    // Lắng nghe sự kiện khi click vào một Thẻ Thành Viên
    cards.forEach(card => {
        card.addEventListener("click", function (e) {
            e.preventDefault(); // Chặn hành vi nhảy cuộn trang do thuộc tính href="#"

            // --- Quản lý hiệu ứng khung viền xoay đặc biệt ---
            const wrapper = this.querySelector('.member-img-wrapper');
            // Xóa khung viền xoay của thành viên cũ trước đó
            document.querySelectorAll('.member-img-wrapper').forEach(w => {
                w.classList.remove('has-special-frame');
            });
            // Thêm khung viền xoay RGB rực rỡ cho thành viên vừa click
            if (wrapper) {
                wrapper.classList.add('has-special-frame');
            }

            // --- Mở Modal thông tin chi tiết tương ứng ---
            const hrefAttr = this.getAttribute("href");
            if (hrefAttr && hrefAttr.startsWith("#")) {
                const targetId = hrefAttr.replace("#", "");
                const modal = document.getElementById(targetId);
                if (modal) {
                    modal.classList.add("active");
                    document.body.style.overflow = "hidden"; // Khóa cuộn nền trang web
                }
            }
        });
    });

    // Lắng nghe sự kiện để đóng Modal khi nhấn nút X hoặc bấm ra vùng ngoài (Overlay)
    modals.forEach(modal => {
        const closeBtn = modal.querySelector(".close");
        const overlay = modal.querySelector(".overlay");

        // Hàm xử lý đóng modal dùng chung
        const closeModal = (e) => {
            if (e) e.preventDefault();
            modal.classList.remove("active");
            document.body.style.overflow = ""; // Khôi phục lại thanh cuộn trang web
        };

        // Click vào dấu X để đóng
        if (closeBtn) {
            closeBtn.addEventListener("click", closeModal);
        }

        // Click vào vùng mờ đen (vùng ngoài hộp thoại) để đóng
        if (overlay) {
            overlay.addEventListener("click", closeModal);
        }
    });

    // Hỗ trợ thêm phím tắt Escape (Esc) để đóng nhanh hộp thoại thành viên
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
            modals.forEach(modal => {
                if (modal.classList.contains("active")) {
                    modal.classList.remove("active");
                    document.body.style.overflow = "";
                }
            });
        }
    });
});