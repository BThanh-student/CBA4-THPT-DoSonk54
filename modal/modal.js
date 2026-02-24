const modal = document.getElementById("productModal");
const modalBody = document.getElementById("modal-body");
const closeBtn = document.querySelector(".close-btn");

const products = {
    anime: {
        img: "anh1/anime.jpg",
        desc: "Thế giới anime Nhật Bản đầy màu sắc, cảm xúc và những câu chuyện vượt thời gian."
    },
    hoavuon: {
        img: "anh1/Hoa.jpg",
        desc: "Khu vườn hoa nghệ thuật với sắc màu dịu nhẹ và cảm giác yên bình."
    },
    hoavuon2: {
        img: "anh1/Hoa2.jpg",
        desc: "Phiên bản hoa nâng cấp, đậm chất thơ và chiều sâu."
    },
    duyen: {
        img: "anh1/Duyen.jpg",
        desc: "Một nét đẹp dịu dàng, duyên dáng tốt bụng nhưng đầy khí chất riêng."
    },
    thanh: {
        img: "anh1/Thanh.jpg",
        desc: "Một nhân vật đặc biệt của Tổ 1. Nhẹ nhàng nhưng nguy hiểm và sự vô đạo bất lương."
    },
    cute: {
        img: "anh1/Cute.jpg",
        desc: "Meomeo siêu cấp đáng yêu. Nhìn một lần là muốn nuôi liền."
    },
    minhnam: {
        img: "anh1/MinhNam.jpg",
        desc: "Visual chuẩn chỉnh. Nhưng tiếc là đã có chủ."
    },
    tan: {
        img: "anh1/Tân.jpg",
        desc: "Tri thức là sức mạnh. Không bán nhưng vẫn đáng xem."
    }
};

document.querySelectorAll(".view-btn").forEach(button => {
    button.addEventListener("click", () => {

        const id = button.getAttribute("data-id");
        const product = products[id];

        const card = button.closest(".art-card");

        const title = card.querySelector("h4").innerText;
        const author = card.querySelector(".author").innerText;
        const price = card.querySelector(".art-price").innerText;

        modalBody.innerHTML = `
            <img src="${product.img}">
            <h2>${title}</h2>
            <p>${author}</p>
            <p><strong>${price}</strong></p>
            <p>${product.desc}</p>
        `;

        modal.style.display = "block";
    });
});

closeBtn.onclick = () => {
    modal.style.display = "none";
};

window.onclick = (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
};

