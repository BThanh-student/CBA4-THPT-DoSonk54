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