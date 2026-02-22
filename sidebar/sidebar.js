document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.getElementById("sidebar");

    const data = {
        title: "📌 Thông tin",
        items: [
            "🏫 Lớp: 12A4",
            "👥 Tổ: 1",
            "📅 Niên khóa: 2023-2026",
            "❤️ Chủ đề: Hồi ức thanh xuân"
        ],
        image: "anh1/12A4.jpg"
    };

    let html = `
        <h4>${data.title}</h4>
        <ul>
            ${data.items.map(item => `<li>${item}</li>`).join("")}
        </ul>
        <div class="picture">
            <img src="${data.image}" alt="Hình ảnh lớp 12A4">
        </div>
    `;

    sidebar.innerHTML = html;
});
