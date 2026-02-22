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