document.addEventListener("DOMContentLoaded", function () {

    const slider = document.querySelector(".member-slider");
    const nextBtn = document.getElementById("nextBtn");
    const prevBtn = document.getElementById("prevBtn");

    if (!slider || !nextBtn || !prevBtn) return;

    function getCardWidth() {
        const gap = parseInt(window.getComputedStyle(slider).gap) || 20;
        return slider.querySelector(".member-card").offsetWidth + gap;
    }

    nextBtn.addEventListener("click", () => {
        slider.scrollBy({
            left: getCardWidth(),
            behavior: "smooth"
        });
    });

    prevBtn.addEventListener("click", () => {
        slider.scrollBy({
            left: -getCardWidth(),
            behavior: "smooth"
        });
    });

});
document.addEventListener("DOMContentLoaded", function () {

    const cards = document.querySelectorAll(".member-card");
    const modals = document.querySelectorAll(".profile-modal");

    // Khi click vào card
    cards.forEach(card => {
        card.addEventListener("click", function (e) {
            e.preventDefault(); // chặn nhảy #id

            const targetId = this.getAttribute("href").replace("#", "");
            const modal = document.getElementById(targetId);

            if (modal) {
                modal.classList.add("active");
            }
        });
    });

    cards.forEach(card => {
    card.addEventListener("click", function (e) {
        e.preventDefault(); // Giữ nguyên của bạn

        // --- ĐÂY LÀ PHẦN TÔI GỬI GẮM THÊM ---
        const wrapper = this.querySelector('.member-img-wrapper');
        // Xóa khung người cũ
        document.querySelectorAll('.member-img-wrapper').forEach(w => w.classList.remove('has-special-frame'));
        // Bật khung người mới
        if (wrapper) wrapper.classList.add('has-special-frame');
        // ------------------------------------

        // Đoạn dưới này là code gốc của bạn, vẫn y xì:
        const targetId = this.getAttribute("href").replace("#", "");
        const modal = document.getElementById(targetId);
        if (modal) { modal.classList.add("active"); }
    });
});

    // Đóng modal
    modals.forEach(modal => {

        const closeBtn = modal.querySelector(".close");
        const overlay = modal.querySelector(".overlay");

        closeBtn.addEventListener("click", function (e) {
            e.preventDefault();
            modal.classList.remove("active");
        });

        overlay.addEventListener("click", function () {
            modal.classList.remove("active");
        });

    });

});