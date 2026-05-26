/**
 * modal.js — Nằm trong thư mục: modal/
 * Quản lý: Music Player + Modal sản phẩm + Quote + Filter + Like + Search
 * BÁO TƯỜNG TỔ 1 - 12A4 | UPGRADED VERSION
 */
document.addEventListener("DOMContentLoaded", () => {
    
    // =========================================================
    // 1. MÀN HÌNH CHỜ (LOADING SCREEN)
    // =========================================================
    const loadingScreen = document.getElementById("loading-screen");
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.classList.add("hide");
            setTimeout(() => loadingScreen.remove(), 600);
        }, 1800);
    }

    // =========================================================
    // 2. HIỆU ỨNG HẠT BAY BỀ NỀN (PARTICLES BACKGROUND)
    // =========================================================
    const particlesContainer = document.getElementById("particles");
    if (particlesContainer) {
        const colors = ["#c0392b", "#f39c12", "#e74c3c", "#f1c40f", "#fff0a0"];
        for (let i = 0; i < 18; i++) {
            const p = document.createElement("span");
            p.className = "particle";
            const size = Math.random() * 12 + 5;
            p.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${Math.random() * 100}%;
                bottom: -20px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                animation-duration: ${Math.random() * 12 + 8}s;
                animation-delay: ${Math.random() * 10}s;
            `;
            particlesContainer.appendChild(p);
        }
    }

    // =========================================================
    // 3. ĐỒNG HỒ ĐIỆN TỬ (LIVE CLOCK)
    // =========================================================
    function updateClock() {
        const now = new Date();
        const timeEl = document.getElementById("clock-time");
        const dateEl = document.getElementById("clock-date");
        if (timeEl) {
            timeEl.textContent = now.toLocaleTimeString("vi-VN", {
                hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false
            });
        }
        if (dateEl) {
            const days = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
            dateEl.textContent = `${days[now.getDay()]} , ${now.toLocaleDateString("vi-VN")}`;
        }
    }
    updateClock();
    setInterval(updateClock, 1000);

    // =========================================================
    // 4. NÚT CUỘN TRÊN ĐẦU TRANG (BACK TO TOP)
    // =========================================================
    const backToTop = document.getElementById("back-to-top");
    if (backToTop) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 300) {
                backToTop.classList.add("visible");
            } else {
                backToTop.classList.remove("visible");
            }
        });
        backToTop.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // =========================================================
    // 5. THEO DÕI MENU CUỘN (NAV STICKY ACTIVE LINK)
    // =========================================================
    const navLinks = document.querySelectorAll(".menu ul > li > a");
    window.addEventListener("scroll", () => {
        const scrollY = window.scrollY;
        navLinks.forEach(link => {
            const href = link.getAttribute("href");
            if (!href || !href.startsWith("#")) return;
            const section = document.querySelector(href);
            if (!section) return;
            if (
                section.offsetTop - 100 <= scrollY &&
                section.offsetTop + section.offsetHeight > scrollY
            ) {
                navLinks.forEach(l => l.classList.remove("active"));
                link.classList.add("active");
            }
        });
    });

    // =========================================================
    // 6. MENU ĐIỆN THOẠI (HAMBURGER MENU)
    // =========================================================
    const hamburger = document.getElementById("hamburger");
    const navList = document.getElementById("nav-list");
    if (hamburger && navList) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("open");
            navList.classList.toggle("open");
        });
        // Đóng khi click ra vùng ngoài menu
        document.addEventListener("click", (e) => {
            if (!hamburger.contains(e.target) && !navList.contains(e.target)) {
                hamburger.classList.remove("open");
                navList.classList.remove("open");
            }
        });
    }

    // =========================================================
    // 7. TRÌNH PHÁT NHẠC YOUTUBE (MUSIC PLAYER)
    // =========================================================
    const iframe   = document.getElementById("yt-player");
    const playBtn  = document.getElementById("play");
    const nextBtn  = document.getElementById("next");
    const prevBtn  = document.getElementById("prev");
    const togglePlayer = document.getElementById("toggle-player");
    const playerBody   = document.getElementById("player-body");
    
    const playlist = ["ZLWUjPdAJb4", "-XxZTgMWKV0", "SnpKIuFaTPE"];
    let currentIndex = 0;
    let isPlaying = false;

    function loadSong(index) {
        if (!iframe) return;
        const videoId = playlist[index];
        const listStr = playlist.join(",");
        iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&playlist=${listStr}&loop=1&rel=0&modestbranding=1`;
        isPlaying = true;
        if (playBtn) playBtn.querySelector("i").className = "fa fa-pause";
    }

    if (playBtn) {
        playBtn.addEventListener("click", () => {
            if (!isPlaying) {
                loadSong(currentIndex);
            } else {
                iframe.src = "";
                isPlaying = false;
                playBtn.querySelector("i").className = "fa fa-play";
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            currentIndex = (currentIndex + 1) % playlist.length;
            loadSong(currentIndex);
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
            loadSong(currentIndex);
        });
    }

    // Thu gọn hoặc mở rộng khung nhạc
    if (togglePlayer && playerBody) {
        togglePlayer.addEventListener("click", () => {
            playerBody.classList.toggle("collapsed");
            togglePlayer.textContent = playerBody.classList.contains("collapsed") ? "+" : "−";
        });
    }

    // =========================================================
    // 8. KHO DỮ LIỆU SẢN PHẨM / BÀI VIẾT (DATA)
    // =========================================================
    const products = {
        anime:    { img: "anh1/anime.jpg",    title: "Anime Nhật Bản",  desc: "Thế giới anime Nhật Bản đầy màu sắc, nơi những câu chuyện phi thường được kể qua từng khung hình nghệ thuật." },
        hoavuon:  { img: "anh1/Hoa.jpg",      title: "Khu vườn hoa",   desc: "Khu vườn hoa nghệ thuật lung linh, nơi sắc màu và nghệ thuật hòa quyện thành một bức tranh sống động." },
        hoavuon2: { img: "anh1/Hoa2.jpg",     title: "Khu vườn hoa 2", desc: "Phiên bản nâng cấp của khu vườn hoa, với những sắc hoa rực rỡ hơn và nghệ thuật tinh tế hơn." },
        duyen:    { img: "anh1/Duyen.jpg",    title: "Duyên",          desc: "Một nét đẹp dịu dàng, duyên dáng — như hoa lài buổi sớm, thanh khiết và khó quên." },
        thanh:    { img: "anh1/Thanh.jpg",    title: "Thanh",          desc: "Nhẹ nhàng nhưng nguy hiểm và quá vô đạo bất lương. Coder chính của dự án này. Hãy cảm ơn anh ấy! 😈" },
        cute:     { img: "anh1/Cute.jpg",     title: "Meomeo",         desc: "Meomeo siêu cấp đáng yêu, nhìn là muốn nhận nuôi rồi... (Ngọc Khánh sad 😢)" },
        minhnam:  { img: "anh1/MinhNam.jpg",  title: "Minh Nam",       desc: "Visual chuẩn chỉnh, hệ điều hành đẹp trai. Tiếc là hoa đã có chủ rồi nhé các bạn! 💍" },
        tan:      { img: "anh1/Tân.jpg",      title: "Tân",            desc: "Tri thức là sức mạnh — boy anime chính hiệu. Không bán vì thuộc sở hữu của cả tổ." },
        bao:      { img: "anh1/Bao.jpg",      title: "Bảo",            desc: "Một người bạn tuyệt vời, sài đẹp chiêu và hài hước không ai sánh bằng. Gặp một lần là nhớ mãi!" },
        ha:       { img: "anh1/Ha.jpg",       title: "Hà",             desc: "Thợ săn tình cảm hoang dại nhưng đang dần bị thuần hóa. Sắp có chủ rồi nha! 💕" },
        thu:      { img: "anh1/Thư.jpg",      title: "Thư",            desc: "Yêu cái đẹp đến điên dại. Gia Việt nể phục lắm đó. Sắp về chung một nhà rồi! 💘" },
        viet:     { img: "anh1/Việt.jpg",     title: "Việt",           desc: "Cây hài của lớp, say mê theo đuổi Thư. Chúc mừng hai bạn sắp nên đôi! 🎉" }
    };

    // =========================================================
    // 9. LỌC DANH MỤC BÀI VIẾT (FILTER TABS)
    // =========================================================
    const filterBtns = document.querySelectorAll(".filter-btn");
    const artCards   = document.querySelectorAll(".art-card");
    const noResults  = document.getElementById("no-results");

    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            filterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filter = btn.dataset.filter;
            let visibleCount = 0;

            artCards.forEach(card => {
                const cat = card.dataset.category || "";
                if (filter === "all" || cat === filter) {
                    card.classList.remove("hidden");
                    visibleCount++;
                } else {
                    card.classList.add("hidden");
                }
            });

            if (noResults) {
                noResults.style.display = visibleCount === 0 ? "block" : "none";
            }
        });
    });

    // =========================================================
    // 10. TÌM KIẾM THÔNG MINH (SEARCH SYSTEM)
    // =========================================================
    const searchInput   = document.getElementById("search-input");
    const searchResults = document.getElementById("search-results");

    if (searchInput && searchResults) {
        searchInput.addEventListener("input", () => {
            const query = searchInput.value.toLowerCase().trim();

            if (!query) {
                searchResults.classList.remove("show");
                searchResults.innerHTML = "";
                artCards.forEach(c => c.classList.remove("hidden"));
                if (noResults) noResults.style.display = "none";
                return;
            }

            // Lọc danh sách bài viết hiển thị trực tiếp trên trang
            let count = 0;
            artCards.forEach(card => {
                const title = card.querySelector("h4")?.textContent.toLowerCase() || "";
                const author = card.querySelector(".author")?.textContent.toLowerCase() || "";
                const cat = (card.dataset.category || "").toLowerCase();
                const match = title.includes(query) || author.includes(query) || cat.includes(query);
                
                card.classList.toggle("hidden", !match);
                if (match) count++;
            });

            if (noResults) noResults.style.display = count === 0 ? "block" : "none";

            // Tạo danh sách Dropdown gợi ý nhanh (Nâng cấp tìm cả theo Tiêu đề và Mô tả)
            const matched = Object.entries(products).filter(([, p]) =>
                p.title.toLowerCase().includes(query) || p.desc.toLowerCase().includes(query)
            );

            if (matched.length) {
                searchResults.innerHTML = matched.map(([id, p]) => `
                    <div class="search-result-item" data-id="${id}">
                        <img src="${p.img}" alt="${p.title}">
                        <p>${p.title}</p>
                    </div>
                `).join("");
                searchResults.classList.add("show");

                searchResults.querySelectorAll(".search-result-item").forEach(item => {
                    item.addEventListener("click", () => {
                        openModal(item.dataset.id);
                        searchResults.classList.remove("show");
                        searchInput.value = "";
                    });
                });
            } else {
                searchResults.classList.remove("show");
                searchResults.innerHTML = "";
            }
        });

        // Đóng dropdown khi click ra ngoài vùng tìm kiếm
        document.addEventListener("click", (e) => {
            if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                searchResults.classList.remove("show");
            }
        });
    }

    // =========================================================
    // 11. HỘP THOẠI CHI TIẾT BÀI VIẾT (MODAL PRODUCT)
    // =========================================================
    const modal     = document.getElementById("productModal");
    const modalBody = document.getElementById("modal-body");
    const closeBtn  = document.querySelector(".close-btn");

    // TÌM ĐẾN VỊ TRÍ HÀM OPENMODAL TRONG FILE MODAL.JS VÀ SỬA LẠI THÀNH THẾ NÀY:
function openModal(id) {
    const product = products[id];
    if (!product || !modal || !modalBody) return;

    // Tìm kiếm thông tin giả lập từ card chính nếu có
    const card   = document.querySelector(`.art-card button[data-id="${id}"]`)?.closest(".art-card");
    const title  = product.title;
    const author = card?.querySelector(".author")?.innerText || "Ban Biên Tập Tổ 1";
    const price  = card?.querySelector(".art-price")?.innerText || "Kỷ niệm quý giá";

    modalBody.innerHTML = `
        <img src="${product.img}" alt="${title}">
        <h2 style="margin-top:15px; color:#2f3542;">${title}</h2>
        <p><strong>Người đóng góp:</strong> ${author}</p>
        <div class="modal-price" style="color:#A52A2A; font-weight:bold; margin-bottom:15px; font-size:1.1rem;">${price}</div>
        <p style="text-align:left; line-height:1.7; color:#555; background:#f9f9f9; padding:15px; border-radius:8px;">${product.desc}</p>
    `;
    modal.classList.add("show");
    document.body.style.overflow = "hidden";
}

// KHÓA VÀNG: Chia sẻ hàm này ra phạm vi toàn cục để file sidebar.js có thể dùng chung
window.openModal = openModal;

    // Gắn sự kiện click cho các nút Xem bài viết
    document.querySelectorAll(".view-btn, .quick-view").forEach(btn => {
        btn.addEventListener("click", () => openModal(btn.dataset.id));
    });

    function closeModal() {
        if (modal) modal.classList.remove("show");
        document.body.style.overflow = ""; // Khôi phục cuộn trang
    }

    if (closeBtn) closeBtn.addEventListener("click", closeModal);
    if (modal) modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });

    // Quản lý Modal Thành viên (Fix lỗi xung đột chung với Modal Sản phẩm)
    document.querySelectorAll(".profile-modal").forEach(pModal => {
        const closeX = pModal.querySelector(".close");
        const overlay = pModal.querySelector(".overlay");
        
        const closeProfile = () => {
            pModal.classList.remove("active");
            document.body.style.overflow = "";
        };

        if(closeX) closeX.addEventListener("click", (e) => { e.preventDefault(); closeProfile(); });
        if(overlay) overlay.addEventListener("click", closeProfile);
    });

    // =========================================================
    // 12. HỆ THỐNG THẢ TIM / YÊU THÍCH (LIKE BUTTON)
    // =========================================================
    const likes = JSON.parse(localStorage.getItem("bt_likes") || "{}");
    document.querySelectorAll(".like-btn").forEach(btn => {
        const id = btn.dataset.id;
        const countEl = btn.querySelector("span");

        if (likes[id]) {
            countEl.textContent = likes[id].count || 0;
            if (likes[id].liked) btn.classList.add("liked");
        }

        btn.addEventListener("click", () => {
            if (!likes[id]) likes[id] = { count: 0, liked: false };

            if (likes[id].liked) {
                likes[id].count = Math.max(0, likes[id].count - 1);
                likes[id].liked = false;
                btn.classList.remove("liked");
            } else {
                likes[id].count++;
                likes[id].liked = true;
                btn.classList.add("liked");

                // Tạo hiệu ứng tim bay cực đẹp khi click
                const heart = document.createElement("span");
                heart.textContent = "❤";
                heart.style.cssText = `
                    position: absolute; pointer-events: none;
                    font-size: 1.2rem; color: #ff4757;
                    animation: floatHeart .8s ease forwards;
                    left: 50%; transform: translateX(-50%);
                    z-index: 99;
                `;
                btn.style.position = "relative";
                btn.appendChild(heart);
                setTimeout(() => heart.remove(), 800);
            }

            countEl.textContent = likes[id].count;
            localStorage.setItem("bt_likes", JSON.stringify(likes));
        });
    });

    // Nhúng Animation Tim bay vào Head (chỉ chạy 1 lần)
    if (!document.getElementById("heart-anim-style")) {
        const style = document.createElement("style");
        style.id = "heart-anim-style";
        style.textContent = `@keyframes floatHeart { 0% { bottom:0; opacity:1; } 100% { bottom:40px; opacity:0; } }`;
        document.head.appendChild(style);
    }

    // =========================================================
    // 13. TRÍCH DẪN HAY (QUOTE OF THE DAY)
    // =========================================================
    const quotes = [
        { text: "Code có thể lỗi, nhưng anh thì không.", author: "Thanh — Tổ 1" },
        { text: "Tình bạn không cần hoàn hảo, chỉ cần thật lòng.", author: "Tổ 1 - 12A4" },
        { text: "Thanh xuân là khi ta còn dám mơ mà không sợ.", author: "Minh Nam" },
        { text: "Mỗi lần nhìn lại, chỉ thấy toàn kỷ niệm đẹp.", author: "Cả tổ 💛" },
        { text: "Debug không phải làm hỏng code, debug là tìm lại chính mình.", author: "Thanh" },
        { text: "Lớp 12A4 — nơi ta lớn lên và học cách trân trọng nhau.", author: "Tổ 1" },
        { text: "Anime không bỏ rơi ta, lớp học thì có khi bỏ.", author: "Tân" },
        { text: "Yêu thương không cần lý do, kỷ niệm không cần lịch.", author: "Thư & Việt 💘" }
    ];

    const quoteText   = document.getElementById("quote-text");
    const quoteAuthor = document.getElementById("quote-author");
    const newQuoteBtn = document.getElementById("new-quote-btn");
    let quoteIndex = Math.floor(Math.random() * quotes.length);

    function showQuote(index) {
        if (!quoteText || !quoteAuthor) return;
        quoteText.style.opacity = 0;
        quoteAuthor.style.opacity = 0;
        
        setTimeout(() => {
            quoteText.textContent = `"${quotes[index].text}"`;
            quoteAuthor.textContent = `— ${quotes[index].author}`;
            quoteText.style.transition = "opacity .4s";
            quoteAuthor.style.transition = "opacity .4s";
            quoteText.style.opacity = 1;
            quoteAuthor.style.opacity = 1;
        }, 300);
    }

    showQuote(quoteIndex);
    if (newQuoteBtn) {
        newQuoteBtn.addEventListener("click", () => {
            quoteIndex = (quoteIndex + 1) % quotes.length;
            showQuote(quoteIndex);
        });
    }

    // =========================================================
    // 14. HIỆU ỨNG HIỂN THỊ KHI CUỘN TRANG (INTERSECTION OBSERVER)
    // =========================================================
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = "running";
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll(".art-card, .content-box").forEach(el => {
        el.style.animationPlayState = "paused";
        observer.observe(el);
    });
});