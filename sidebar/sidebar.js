/**
 * sidebar.js — Nằm trong thư mục: sidebar/ hoặc thư mục gốc script/
 * Quản lý: Render toàn bộ sidebar (thông tin + countdown + ảnh + bài nổi bật)
 * BÁO TƯỜNG TỔ 1 - 12A4 | UPGRADED VERSION
 */
document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.getElementById("sidebar");
    if (!sidebar) return;

    // =========================================================
    // 1. KHO DỮ LIỆU ĐỒNG BỘ CHO SIDEBAR (DATA)
    // =========================================================
    const data = {
        info: {
            title: " 📌  Thông tin tổ",
            items: [
                { icon: " 🏫 ", text: "Lớp: 12A4 - THPT Đồ Sơn" },
                { icon: " 👥 ", text: "Tổ: 1" },
                { icon: " 📅 ", text: "Niên khóa: 2023 – 2026" },
                { icon: " ❤️ ", text: "Chủ đề: Hồi ức thanh xuân" },
                { icon: " 📍 ", text: "Hải Phòng, Việt Nam" },
            ]
        },
        countdown: {
            title: " ⏳  Đếm ngược tốt nghiệp",
            target: new Date("2026-06-05T08:00:00") // Bạn có thể chỉnh sửa ngày tốt nghiệp thực tế tại đây
        },
        image: {
            title: " 📸  Khoảnh khắc lớp",
            src: "anh1/Kỷ yếu.JPG",
            alt: "Ảnh kỷ yếu lớp 12A4"
        },
        highlights: {
            title: " ⭐  Bài viết nổi bật",
            items: [
                { id: "thanh", text: "Bài viết đặc biệt từ Coder chính thức" },
                { id: "anime", text: "Nét văn hóa Anime độc đáo qua góc nhìn 12A4" },
                { id: "cute", text: "Chùm ảnh Meomeo siêu cấp đáng yêu" }
            ]
        }
    };

    // =========================================================
    // 2. KHỞI TẠO CẤU TRÚC VÀ RENDER SIDEBAR GIAO DIỆN
    // =========================================================
    sidebar.innerHTML = `
        <div class="sidebar-box info-box">
            <h4>${data.info.title}</h4>
            <ul class="highlight-list">
                ${data.info.items.map((item, idx) => `
                    <li style="animation-delay: ${idx * 0.08}s">
                        <span class="hl-emoji">${item.icon}</span>
                        <span class="hl-text">${item.text}</span>
                    </li>
                `).join('')}
            </ul>
        </div>

        <div class="sidebar-box countdown-box">
            <h4>${data.countdown.title}</h4>
            <div id="countdown-timer" class="timer-grid">
                <div class="time-item"><span id="cd-days" class="time-num">00</span><span class="time-lbl">Ngày</span></div>
                <div class="time-item"><span id="cd-hours" class="time-num">00</span><span class="time-lbl">Giờ</span></div>
                <div class="time-item"><span id="cd-mins" class="time-num">00</span><span class="time-lbl">Phút</span></div>
                <div class="time-item"><span id="cd-secs" class="time-num">00</span><span class="time-lbl">Giây</span></div>
            </div>
        </div>

        <div class="sidebar-box picture-box">
            <h4>${data.image.title}</h4>
            <div class="picture-wrapper">
                <img src="${data.image.src}" alt="${data.image.alt}" loading="lazy">
                <div class="pic-overlay"><span>12A4 Mãi Đỉnh 💖</span></div>
            </div>
        </div>

        <div class="sidebar-box highlights-box">
            <h4>${data.highlights.title}</h4>
            <ul class="highlight-links">
                ${data.highlights.items.map(item => `
                    <li>
                        <a href="javascript:void(0)" class="quick-view" data-id="${item.id}">
                            <i class="fa-solid fa-chevron-right text-accent"></i> ${item.text}
                        </a>
                    </li>
                `).join('')}
            </ul>
        </div>
    `;

    // =========================================================
    // 3. XỬ LÝ SỰ KIỆN KHI CLICK VÀO BÀI NỔI BẬT TRÊN SIDEBAR
    // =========================================================
    // Đồng bộ gọi hàm openModal từ file modal.js sang
    sidebar.querySelectorAll(".quick-view").forEach(btn => {
        btn.addEventListener("click", function () {
            const articleId = this.getAttribute("data-id");
            // Kiểm tra xem hàm openModal ở file modal.js có tồn tại trên global window không
            if (typeof window.openModal === "function") {
                window.openModal(articleId);
            } else {
                // Phương án dự phòng nếu chưa kích hoạt global: Tìm nút Xem bài viết tương ứng ở nội dung chính và click giả lập
                const mainBtn = document.querySelector(`.view-btn[data-id="${articleId}"], .quick-view[data-id="${articleId}"]`);
                if (mainBtn) mainBtn.click();
            }
        });
    });

    // =========================================================
    // 4. LẬP TRÌNH BỘ ĐẾM NGƯỢC THỜI GIAN CHUẨN (COUNTDOWN)
    // =========================================================
    const daysEl  = document.getElementById("cd-days");
    const hoursEl = document.getElementById("cd-hours");
    const minsEl  = document.getElementById("cd-mins");
    const secsEl  = document.getElementById("cd-secs");
    const timerGrid = document.getElementById("countdown-timer");

    function pad(num) {
        return num < 10 ? "0" + num : num;
    }

    function updateCountdown() {
        if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

        const now = new Date().getTime();
        const diff = data.countdown.target.getTime() - now;

        // Nếu đã qua hoặc chạm tới mốc thời gian tốt nghiệp
        if (diff <= 0) {
            if (timerGrid) {
                timerGrid.innerHTML = `
                    <div class="ended-message" style="width:100%; text-align:center; padding:10px; color:#A52A2A; font-weight:bold; font-size:1.1rem; animation: pulse 1.5s infinite;">
                        🎉 Chúc mừng chúng ta đã trưởng thành! 🎉
                    </div>
                `;
            }
            return;
        }

        // Tính toán chi tiết Ngày - Giờ - Phút - Giây từ khoảng cách mili-giây
        const days  = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins  = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const secs  = Math.floor((diff % (1000 * 60)) / 1000);

        daysEl.textContent  = pad(days);
        hoursEl.textContent = pad(hours);
        minsEl.textContent  = pad(mins);
        secsEl.textContent  = pad(secs);
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

    // =========================================================
    // 5. INJECT EXTRA STYLES ĐỒNG BỘ MÀU SẮC CHO SIDEBAR
    // =========================================================
    if (!document.getElementById("sidebar-extra-style")) {
        const style = document.createElement("style");
        style.id = "sidebar-extra-style";
        style.textContent = `
            .sidebar-box {
                background: #ffffff;
                border-radius: 12px;
                padding: 18px;
                margin-bottom: 20px;
                box-shadow: 0 4px 15px rgba(0,0,0,0.04);
                border: 1px solid #f0f0f0;
            }
            .sidebar-box h4 {
                margin-top: 0;
                margin-bottom: 15px;
                color: #2f3542;
                font-size: 1.1rem;
                border-bottom: 2px solid #72C1D9;
                padding-bottom: 8px;
            }
            .highlight-list {
                list-style: none;
                padding: 0;
                margin: 0;
            }
            .highlight-list li {
                display: flex;
                align-items: center;
                gap: 10px;
                padding: 10px 0;
                border-bottom: 1px dashed #eee;
                font-size: 0.95rem;
                color: #57606f;
                animation: fadeInUp 0.4s ease both;
            }
            .highlight-list li:last-child { border-bottom: none; }
            .hl-emoji { font-size: 1.1rem; flex-shrink: 0; }
            
            /* CSS Giao diện đếm ngược */
            .timer-grid {
                display: flex;
                justify-content: space-around;
                text-align: center;
                background: #f8f9fa;
                padding: 12px;
                border-radius: 8px;
            }
            .time-item { display: flex; flex-direction: column; }
            .time-num { font-size: 1.4rem; font-weight: bold; color: #A52A2A; }
            .time-lbl { font-size: 0.75rem; color: #777; text-transform: uppercase; margin-top: 2px; }

            /* CSS Khung ảnh kỷ niệm */
            .picture-wrapper {
                position: relative;
                border-radius: 8px;
                overflow: hidden;
                cursor: pointer;
            }
            .picture-wrapper img {
                width: 100%;
                height: auto;
                display: block;
                transition: transform 0.4s ease;
            }
            .picture-wrapper:hover img { transform: scale(1.06); }
            .pic-overlay {
                position: absolute;
                inset: 0;
                background: rgba(0,0,0,0.3);
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                transition: opacity 0.3s;
                color: #fff;
                font-weight: bold;
                font-size: 0.95rem;
            }
            .picture-wrapper:hover .pic-overlay { opacity: 1; }

            /* CSS Danh sách liên kết nhanh */
            .highlight-links { list-style: none; padding: 0; margin: 0; }
            .highlight-links li { margin: 8px 0; }
            .highlight-links a {
                color: #444;
                text-decoration: none;
                font-size: 0.92rem;
                display: flex;
                align-items: center;
                gap: 8px;
                transition: all 0.2s;
            }
            .highlight-links a:hover { color: #A52A2A; padding-left: 5px; }
            .text-accent { color: #72C1D9; font-size: 0.8rem; }

            @keyframes fadeInUp {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.03); }
                100% { transform: scale(1); }
            }
        `;
        document.head.appendChild(style);
    }
});