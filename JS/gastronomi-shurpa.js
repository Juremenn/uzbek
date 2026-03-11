(() => {
    const slider = document.getElementById("dishSlider");
    const titleNode = document.getElementById("dishTitle");
    const introNode = document.getElementById("dishIntro");
    const introImg = document.getElementById("dishIntroImg");
    const prevBtn = document.getElementById("dishPrevBtn");
    const nextBtn = document.getElementById("dishNextBtn");
    const cardsNode = document.getElementById("gastroCards");

    const giziModal = document.getElementById("giziModal");
    const giziModalContent = document.getElementById("giziModalContent");
    const giziModalImg = document.getElementById("giziModalImg");

    let leftCard = document.getElementById("dishCardLeft");
    let centerCard = document.getElementById("dishCardCenter");
    let rightCard = document.getElementById("dishCardRight");
    let incomingCard = document.getElementById("dishCardIncoming");

    let leftImg = document.getElementById("dishPhotoLeft");
    let centerImg = document.getElementById("dishPhotoCenter");
    let rightImg = document.getElementById("dishPhotoRight");
    let incomingImg = document.getElementById("dishPhotoIncoming");

    if (
        !slider ||
        !titleNode ||
        !introNode ||
        !introImg ||
        !prevBtn ||
        !nextBtn ||
        !cardsNode ||
        !giziModal ||
        !giziModalContent ||
        !giziModalImg ||
        !leftCard ||
        !centerCard ||
        !rightCard ||
        !incomingCard ||
        !leftImg ||
        !centerImg ||
        !rightImg ||
        !incomingImg
    ) {
        return;
    }

    const dishes = [
        {
            key: "kompot",
            title: "Fruit Kompot",
            image: "assets/img/card/FruitKompot.png",
            imagePosition: "50% 0%",
            intro:
                "Kompot adalah minuman tradisional berupa rebusan buah-buahan (segar atau kering) yang dimasak perlahan bersama air dan sedikit gula. Minuman ini populer di Asia Tengah karena mudah dibuat, menyegarkan, dan cocok dinikmati bersama hidangan utama. Aroma buah yang lembut dan rasa manis alami membuat kompot sering hadir saat jamuan keluarga maupun acara kecil di rumah.",
            introImage: "assets/img/card/FruitKompot.png",
            introPosition: "50% 0%",
            nutritionImage: "assets/img/gastronomi/nilaigizisup.png",
            nutritionThumb: "button",
            gastroTemplate: "default",
            gastronomy: {
                method: {
                    title: "Metode Masak Tradisional",
                    text: "Buah direbus dengan api kecil hingga sari keluar, lalu didinginkan. Kompot bisa disajikan hangat atau dingin sesuai musim."
                },
                social: {
                    title: "Simbol Sosial",
                    text: "Di banyak keluarga, kompot jadi minuman penyambut tamu—sederhana tapi hangat, sering hadir di jamuan rumah maupun acara kecil."
                },
                habit: {
                    title: "Kebiasaan Masyarakat",
                    text: "Kompot sering dibuat dari buah musiman atau buah kering sebagai cara praktis mengolah persediaan di rumah."
                },
                variations: {
                    title: "Variasi",
                    items: ["Kompot apel", "Kompot aprikot", "Kompot ceri", "Kompot buah kering"]
                },
                enjoy: {
                    title: "Cara Menikmati",
                    text: "Disajikan dingin saat cuaca panas atau hangat saat cuaca dingin. Biasanya dinikmati bersama hidangan utama atau sebagai minuman penutup."
                }
            }
        },
        {
            key: "shurpa",
            title: "Sup Uzbek Shurpa",
            image: "assets/img/card/SupUzbekShurpa.png",
            imagePosition: "50% 22%",
            intro:
                "Hidangan ini berasal dari Asia Tengah. Shurpa adalah sup tradisional dari Uzbekistan di wilayah Asia Tengah. Hidangan ini sudah ada sejak lama dan berkembang dari kebiasaan masyarakat nomaden yang memasak sup daging sederhana. Resepnya menyebar melalui jalur perdagangan Silk Road. Menurut cerita rakyat, para pedagang Jalur Sutra memasak daging, sayuran, dan air dalam satu panci saat perjalanan jauh. Sup hangat itu mengenyangkan dan kemudian dikenal sebagai shurpa.",
            introImage: "assets/img/card/SupUzbekShurpa.png",
            introPosition: "50% 22%",
            nutritionImage: "assets/img/gastronomi/nilaigizisup.png",
            nutritionThumb: "button",
            gastroTemplate: "default",
            gastronomy: {
                method: {
                    title: "Metode Masak Tradisional",
                    lines: [
                        "Shurpa dimasak dalam kazan (kuali besar) dengan cara:",
                        "Merebus daging kambing atau sapi",
                        "Menambahkan wortel, kentang, bawang, dan tomat",
                        "Dimasak lama di api kayu agar kaldunya kuat."
                    ]
                },
                social: {
                    title: "Simbol Sosial",
                    text: "Shurpa melambangkan keramahan dan kebersamaan. Biasanya disajikan untuk tamu atau acara keluarga."
                },
                habit: {
                    title: "Kebiasaan Masyarakat",
                    lines: [
                        "Shurpa dimasak dalam kazan (kuali besar) dengan cara:",
                        "Merebus daging kambing atau sapi",
                        "Menambahkan wortel, kentang, bawang, dan tomat",
                        "Dimasak lama di api kayu agar kaldunya kuat."
                    ]
                },
                variations: {
                    title: "Variasi",
                    items: [
                        "Kainatma Shurpa (rebus langsung)",
                        "Kovurma Shurpa (daging digoreng dulu)",
                        "Shurpa ayam",
                        "Shurpa sayuran."
                    ]
                },
                enjoy: {
                    title: "Cara Menikmati",
                    lines: [
                        "Disajikan panas dalam mangkuk.",
                        "Dimakan dengan roti tradisional (non).",
                        "Biasanya ditambah sayuran atau daun ketumbar."
                    ]
                }
            }
        },
        {
            key: "plov",
            title: "Plov Uzbek",
            image: "assets/img/card/PlovUzbekistan.png",
            imagePosition: "50% 55%",
            intro:
                "Uzbek Plov adalah hidangan nasi yang berasal dari Uzbekistan sejak abad ke 11 atau 12, dimana nasi di tumis dan di rebus bersama daging kambing, wortel, dan bawang dalam kuali besar. Meskipun sering dikaitkan dengan penaklukan Alexander Agung di Sogdia pada abad ke 4 SM, plov lebih akurat dari tradisi kuliner persia dan Asia Tengah. Dikedikawan abad ke 10, Abu Ali Ibn Sina, tercatat mendokumentasikan metode persiapan hidangan sejenis Palov.",
            introImage: "assets/img/card/nasigoreng.png",
            introPosition: "50% 45%",
            nutritionImage: "assets/img/gastronomi/nilaigiziplov.png",
            nutritionThumb: "image",
            gastroTemplate: "plov",
            gastronomy: {
                method: {
                    title: "Metode Masak Tradisional",
                    text: "Tidak seperti nasi kukus biasa, Plov Uzbek dibuat dengan menumis bahan-bahan (daging, wortel, rempah) yang disebut zirvak, lalu nasi ditambahkan keatasnya dan dimasak hingga semua kaldu terserap sempurna."
                },
                social: {
                    title: "Simbol Sosial",
                    text: "Di Uzbekistan, Plov bukan sekedar makanan, melainkan tradisi sosial yang dimasak sejumlah besar oleh seorang (juru masak plov) untuk pernikahan dan perayaan."
                },
                variations: {
                    title: "Variasi",
                    text: "Setiap wilayah di Uzbekistan memiliki versi Plov sendiri."
                }
            }
        }
    ];

    const modulo = (n, m) => ((n % m) + m) % m;

    let currentIndex = 1;
    let isAnimating = false;

    const escapeHtml = (value) =>
        String(value)
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");

    const renderGastronomy = (dish) => {
        const gastro = dish.gastronomy || {};

        const card = (title, bodyHtml, extraClass = "") =>
            `<article class="gastro-card${extraClass ? ` ${extraClass}` : ""}"><h3>${escapeHtml(title)}</h3>${bodyHtml}</article>`;

        const paragraph = (text) => `<p>${escapeHtml(text)}</p>`;

        const lines = (items) =>
            `<p class="gastro-lines">${items.map((item) => escapeHtml(item)).join("<br>")}</p>`;

        const body = (section) => (Array.isArray(section?.lines) ? lines(section.lines) : paragraph(section?.text || ""));

        const list = (items) =>
            `<ul class="gastro-variations">${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;

        const variationsBody = () => {
            if (Array.isArray(gastro?.variations?.items)) return list(gastro.variations.items);
            return paragraph(gastro?.variations?.text || "");
        };

        const giziControl = () => {
            const src = escapeHtml(dish.nutritionImage || "assets/img/gastronomi/nilaigizisup.png");
            if (dish.nutritionThumb === "image") {
                return `<button class="gastro-gizi-thumb" type="button" data-open-gizi data-gizi-src="${src}" aria-label="Lihat informasi nilai gizi">
                            <img src="${src}" alt="Lihat informasi nilai gizi" loading="lazy" decoding="async">
                        </button>`;
            }
            return `<button class="gastro-cta" type="button" data-open-gizi data-gizi-src="${src}">Lihat informasi nilai gizi</button>`;
        };

        const template = dish.gastroTemplate || "default";

        if (template === "plov") {
            cardsNode.innerHTML = `
                <div class="gastro-layout" data-template="plov" aria-label="Gastronomi layout">
                    <div class="gastro-col gastro-col--left">
                        ${card(gastro.method?.title || "", body(gastro.method))}
                        <img class="gastro-dapur" src="assets/img/gastronomi/dapur.png" alt="" aria-hidden="true" loading="lazy" decoding="async">
                    </div>
                    <div class="gastro-col gastro-col--mid">
                        ${card(gastro.social?.title || "", body(gastro.social))}
                        ${card(gastro.variations?.title || "", variationsBody(), "gastro-card--small")}
                    </div>
                    <div class="gastro-col gastro-col--right">
                        ${giziControl()}
                    </div>
                </div>
            `;
            return;
        }

        cardsNode.innerHTML = `
            <div class="gastro-layout" data-template="default" aria-label="Gastronomi layout">
                <div class="gastro-col gastro-col--left">
                    ${card(gastro.method?.title || "", body(gastro.method))}
                    <img class="gastro-dapur" src="assets/img/gastronomi/dapur.png" alt="" aria-hidden="true" loading="lazy" decoding="async">
                </div>
                <div class="gastro-col gastro-col--mid">
                    ${card(gastro.social?.title || "", body(gastro.social))}
                    ${card(gastro.variations?.title || "", variationsBody())}
                    ${giziControl()}
                </div>
                <div class="gastro-col gastro-col--right">
                    ${card(gastro.habit?.title || "", body(gastro.habit))}
                    ${card(gastro.enjoy?.title || "", body(gastro.enjoy))}
                </div>
            </div>
        `;
    };

    const setDishImage = (imgEl, dish) => {
        imgEl.src = dish.image;
        imgEl.alt = dish.title;
        imgEl.style.objectPosition = dish.imagePosition || "";
    };

    const updateDetail = (dish) => {
        titleNode.textContent = dish.title;
        introNode.textContent = dish.intro;
        introImg.src = dish.introImage;
        introImg.alt = `Ilustrasi ${dish.title}`;
        introImg.style.objectPosition = dish.introPosition || dish.imagePosition || "";
        renderGastronomy(dish);
    };

    const setPosInstant = (cardEl, pos) => {
        cardEl.classList.add("no-transition");
        cardEl.dataset.pos = pos;
        cardEl.offsetHeight;
        cardEl.classList.remove("no-transition");
    };

    const setBusy = (busy) => {
        prevBtn.disabled = busy;
        nextBtn.disabled = busy;
        if (busy) slider.setAttribute("aria-busy", "true");
        else slider.removeAttribute("aria-busy");
    };

    const renderStatic = () => {
        const current = dishes[currentIndex];
        const left = dishes[modulo(currentIndex - 1, dishes.length)];
        const right = dishes[modulo(currentIndex + 1, dishes.length)];

        setDishImage(leftImg, left);
        setDishImage(centerImg, current);
        setDishImage(rightImg, right);

        updateDetail(current);

        incomingCard.setAttribute("aria-hidden", "true");
        setPosInstant(incomingCard, "off-right");
    };

    const animateTo = (dir) => {
        if (isAnimating) return;
        if (dishes.length < 2) return;

        isAnimating = true;
        setBusy(true);

        const isNext = dir === "next";
        const incomingPos = isNext ? "off-right" : "off-left";
        const incomingDishIndex = isNext
            ? modulo(currentIndex + 2, dishes.length)
            : modulo(currentIndex - 2, dishes.length);
        const newIndex = isNext ? modulo(currentIndex + 1, dishes.length) : modulo(currentIndex - 1, dishes.length);

        setDishImage(incomingImg, dishes[incomingDishIndex]);
        incomingCard.removeAttribute("aria-hidden");
        setPosInstant(incomingCard, incomingPos);

        requestAnimationFrame(() => {
            if (isNext) {
                leftCard.dataset.pos = "off-left";
                centerCard.dataset.pos = "left";
                rightCard.dataset.pos = "center";
                incomingCard.dataset.pos = "right";
            } else {
                rightCard.dataset.pos = "off-right";
                centerCard.dataset.pos = "right";
                leftCard.dataset.pos = "center";
                incomingCard.dataset.pos = "left";
            }
        });

        const transitionTarget = incomingCard;
        let didFinish = false;

        const finish = () => {
            if (didFinish) return;
            didFinish = true;

            if (isNext) {
                const outgoingCard = leftCard;
                const outgoingImg = leftImg;

                leftCard = centerCard;
                leftImg = centerImg;
                centerCard = rightCard;
                centerImg = rightImg;
                rightCard = incomingCard;
                rightImg = incomingImg;
                incomingCard = outgoingCard;
                incomingImg = outgoingImg;
            } else {
                const outgoingCard = rightCard;
                const outgoingImg = rightImg;

                rightCard = centerCard;
                rightImg = centerImg;
                centerCard = leftCard;
                centerImg = leftImg;
                leftCard = incomingCard;
                leftImg = incomingImg;
                incomingCard = outgoingCard;
                incomingImg = outgoingImg;
            }

            currentIndex = newIndex;
            updateDetail(dishes[currentIndex]);

            incomingCard.setAttribute("aria-hidden", "true");
            setPosInstant(incomingCard, "off-right");

            isAnimating = false;
            setBusy(false);
        };

        const onEnd = (event) => {
            if (event.propertyName !== "transform") return;
            transitionTarget.removeEventListener("transitionend", onEnd);
            clearTimeout(fallbackTimer);
            finish();
        };

        transitionTarget.addEventListener("transitionend", onEnd);

        const fallbackTimer = window.setTimeout(() => {
            transitionTarget.removeEventListener("transitionend", onEnd);
            finish();
        }, 900);
    };

    prevBtn.addEventListener("click", () => animateTo("prev"));
    nextBtn.addEventListener("click", () => animateTo("next"));

    document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft") animateTo("prev");
        if (event.key === "ArrowRight") animateTo("next");
    });

    let lastFocusEl = null;

    const openGiziModal = (src) => {
        if (!src) return;
        lastFocusEl = document.activeElement;
        giziModalImg.src = src;
        giziModal.classList.add("is-open");
        giziModal.setAttribute("aria-hidden", "false");
        document.body.classList.add("is-modal-open");
        giziModalContent.focus();
    };

    const closeGiziModal = () => {
        if (!giziModal.classList.contains("is-open")) return;
        giziModal.classList.remove("is-open");
        giziModal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("is-modal-open");
        if (lastFocusEl && typeof lastFocusEl.focus === "function") lastFocusEl.focus();
        lastFocusEl = null;
    };

    cardsNode.addEventListener("click", (event) => {
        const button = event.target.closest("[data-open-gizi]");
        if (!button) return;
        const src = button.getAttribute("data-gizi-src") || "assets/img/gastronomi/nilaigizisup.png";
        openGiziModal(src);
    });

    giziModal.addEventListener("click", (event) => {
        if (event.target === giziModal) closeGiziModal();
        const closeTarget = event.target.closest("[data-gizi-close]");
        if (closeTarget) closeGiziModal();
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") closeGiziModal();
    });

    renderStatic();
})();

