document.addEventListener("DOMContentLoaded", () => {

    // ==============================
    // LẤY ELEMENT
    // ==============================
    const iframe = document.getElementById("yt-player");
    const playBtn = document.getElementById("play");
    const nextBtn = document.getElementById("next");
    const prevBtn = document.getElementById("prev");

    const modal = document.getElementById("productModal");
    const modalBody = document.getElementById("modal-body");
    const closeBtn = document.querySelector(".close-btn");

    // ==============================
    // PLAYLIST
    // ==============================
    const playlist = ["ZLWUjPdAJb4", "-XxZTgMWKV0", "SnpKIuFaTPE"];
    let currentIndex = 0;
    let isPlaying = false;

    // ==============================
    // LOAD VIDEO
    // ==============================
    function loadSong(index) {
        if (!iframe) return;

        const videoId = playlist[index];
        const listString = playlist.join(",");

        iframe.src =
            `https://www.youtube.com/embed/${videoId}?autoplay=1&playlist=${listString}&loop=1&rel=0`;

        isPlaying = true;
    }

    // ==============================
    // PLAY / PAUSE
    // ==============================
    if (playBtn) {
        playBtn.addEventListener("click", () => {

            if (!isPlaying) {
                loadSong(currentIndex);
            } else {
                iframe.src = "";
                isPlaying = false;
            }

        });
    }

    // ==============================
    // NEXT
    // ==============================
    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            currentIndex = (currentIndex + 1) % playlist.length;
            loadSong(currentIndex);
        });
    }

    // ==============================
    // PREVIOUS
    // ==============================
    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            currentIndex =
                (currentIndex - 1 + playlist.length) % playlist.length;
            loadSong(currentIndex);
        });
    }

    // ==============================
    // DATA SẢN PHẨM
    // ==============================
    const products = {
        anime: { img: "anh1/anime.jpg", desc: "Thế giới anime Nhật Bản đầy màu sắc..." },
        hoavuon: { img: "anh1/Hoa.jpg", desc: "Khu vườn hoa nghệ thuật..." },
        hoavuon2: { img: "anh1/Hoa2.jpg", desc: "Phiên bản hoa nâng cấp..." },
        duyen: { img: "anh1/Duyen.jpg", desc: "Một nét đẹp dịu dàng, duyên dáng" },
        thanh: { img: "anh1/Thanh.jpg", desc: "Nhẹ nhàng nhưng nguy hiểm và quá vô đạo bất lương" },
        cute: { img: "anh1/Cute.jpg", desc: "Meomeo siêu cấp đáng yêu, nhìn là muốn nhận nuôi rồi( Ngọc Khánh sad)..." },
        minhnam: { img: "anh1/MinhNam.jpg", desc: "Visual chuẩn chỉnh, hệ điều hành đẹp trai nhưng tiếc là hoa đã có chủ..." },
        tan: { img: "anh1/Tân.jpg", desc: "Tri thức là sức mạnh, boy anime..." },
        bao: { img: "anh1/Bao.jpg", desc: "Một người bạn tuyệt vời, sai đẹp chiêu và hài hước..." },
        ha: { img: "anh1/Ha.jpg", desc: "Thợ săn tình cảm hoang dại..." },
        thu: { img: "anh1/Thư.jpg", desc: "Yêu cái đẹp đến điên dại..." },
        viet: { img: "anh1/Việt.jpg", desc: "Cây hài của lớp và say mê..." }
    };

    // ==============================
    // MODAL
    // ==============================
    document.querySelectorAll(".view-btn").forEach(button => {
        button.addEventListener("click", () => {

            const id = button.getAttribute("data-id");
            const product = products[id];
            if (!product) return;

            const card = button.closest(".art-card");

            const title =
                card?.querySelector("h4")?.innerText || "Sản phẩm";

            const author =
                card?.querySelector(".author")?.innerText || "N/A";

            const price =
                card?.querySelector(".art-price")?.innerText || "Liên hệ";

            modalBody.innerHTML = `
                <img src="${product.img}"
                     alt="${title}"
                     style="width:100%; border-radius:10px;">
                <h2>${title}</h2>
                <p><strong>Tác giả:</strong> ${author}</p>
                <p><strong>Giá:</strong>
                   <span style="color:red">${price}</span></p>
                <p>${product.desc}</p>
            `;

            if (modal) modal.style.display = "block";
        });
    });

    if (closeBtn) {
        closeBtn.onclick = () => {
            if (modal) modal.style.display = "none";
        };
    }

    window.onclick = (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    };

});