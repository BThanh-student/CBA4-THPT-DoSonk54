const slider = document.querySelector(".member-slider");
const cards = document.querySelectorAll(".member-card");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

// Lấy chiều rộng 1 card (bao gồm gap)
function getCardWidth() {
    const cardStyle = window.getComputedStyle(cards[0]);
    const gap = parseInt(window.getComputedStyle(slider).gap) || 20;
    return cards[0].offsetWidth + gap;
}

// Next
nextBtn.addEventListener("click", () => {
    slider.scrollBy({
        left: getCardWidth(),
        behavior: "smooth"
    });
});

// Prev
prevBtn.addEventListener("click", () => {
    slider.scrollBy({
        left: -getCardWidth(),
        behavior: "smooth"
    });
});

let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener("mousedown", (e) => {
    isDown = true;
    slider.classList.add("dragging");
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
});

slider.addEventListener("mouseleave", () => {
    isDown = false;
});

slider.addEventListener("mouseup", () => {
    isDown = false;
});

slider.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 1.5; 
    slider.scrollLeft = scrollLeft - walk;
});