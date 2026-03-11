(() => {
    const slider = document.getElementById("dishSlider");
    const titleNode = document.getElementById("dishTitle");
    const introNode = document.getElementById("dishIntro");
    const introImg = document.getElementById("dishIntroImg");
    const introGiziBtn = document.getElementById("dishIntroGiziBtn");
    const introWrap = document.querySelector(".dish-intro");
    const introActionsWrap = document.querySelector(".dish-intro-actions");
    const cookSection = document.querySelector(".cook-section");
    const cookTitle = document.querySelector(".cook-title");
    const ingredientsTitle = document.querySelector(".ingredients-title");
    const ingredientLists = Array.from(document.querySelectorAll(".ingredients-list"));
    const stepsHeaderCells = Array.from(document.querySelectorAll(".steps-table thead th"));
    const stepsRows = Array.from(document.querySelectorAll(".steps-table tbody tr"));
    const gastroBannerTitle = document.querySelector(".gastro-banner h2");
    const langButtons = Array.from(document.querySelectorAll("[data-lang]"));
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
        !introGiziBtn ||
        !introWrap ||
        !introActionsWrap ||
        !cookSection ||
        !cookTitle ||
        !ingredientsTitle ||
        !ingredientLists.length ||
        !stepsHeaderCells.length ||
        !stepsRows.length ||
        !gastroBannerTitle ||
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

    let currentLang = "id";

    const uiDict = {
        id: {
            giziBtn: "Lihat informasi nilai gizi",
            gastronomyTitle: "GASTRONOMI",
            funfactTitle: "Funfact Kompot",
            recipeTitle: "CARA MEMBUAT",
            recipeStepsTitle: "LANGKAH LANGKAH MEMBUAT",
            garnish: "(add-on: daun mint & lemon slice untuk garnish)",
            appleLabel: "4 apel",
            sugarLabel: "200gr gula",
            pearLabel: "2 pir",
            waterLabel: "2 liter air",
            lemonJuiceLabel: "5 ml lemon<br>juice/porsi",
            introGizi: "Lihat informasi nilai gizi",
            cookTitle: "CARA MEMBUAT",
            ingredientsTitle: "BAHAN YANG DIBUTUHKAN",
            tableHead: ["NO", "TAHAPAN", "LANGKAH LANGKAH", "COOKING METHOD", "UTENSIL&EQUIPMENT"]
        },
        en: {
            giziBtn: "View nutrition facts",
            gastronomyTitle: "GASTRONOMY",
            funfactTitle: "Kompot Fun Facts",
            recipeTitle: "HOW TO MAKE",
            recipeStepsTitle: "STEP BY STEP",
            garnish: "(add-on: mint leaves & lemon slices for garnish)",
            appleLabel: "4 apples",
            sugarLabel: "200g sugar",
            pearLabel: "2 pears",
            waterLabel: "2 liters water",
            lemonJuiceLabel: "5 ml lemon<br>juice/serving",
            introGizi: "View nutrition facts",
            cookTitle: "HOW TO MAKE",
            ingredientsTitle: "INGREDIENTS",
            tableHead: ["NO", "STAGE", "STEPS", "COOKING METHOD", "UTENSILS & EQUIPMENT"]
        }
    };

    const shurpaIngredients = {
        id: [
            [
                "1/4 cangkir minyak sayur",
                "2 bawang bombai cincang",
                "daging domba/sapi/ayam",
                "2 ruas batang kayu manis",
                "1 buah kapulaga",
                "2 sdt pasta jahe",
                "4-6 siung bawang putih",
                "4 sdt pasta tomat",
                "10gr cabe rawit ijo(kira kira)"
            ],
            [
                "1 sdt bubuk cabai",
                "1 sdt ketumbar",
                "1 sdt jintan",
                "1/2 sdt lada hitam",
                "1/2 sdt kapulaga hitam",
                "1/4 sdt jahe bubuk",
                "1/4 sdt biji kelor bubuk",
                "1/4 sdt kayu manis bubuk",
                "400 ml air(di kira kira lagi)"
            ],
            [
                "2 kentang potong kotak",
                "1 wortel jardiner",
                "1/4 ikat daun ketumbar",
                "500 gr beras",
                "600 ml air"
            ]
        ],
        en: [
            [
                "1/4 cup vegetable oil",
                "2 chopped onions",
                "lamb/beef/chicken",
                "2 sticks cinnamon",
                "1 cardamom pod",
                "2 tsp ginger paste",
                "4-6 garlic cloves",
                "4 tsp tomato paste",
                "about 10 g green chilies"
            ],
            [
                "1 tsp chili powder",
                "1 tsp coriander",
                "1 tsp cumin",
                "1/2 tsp black pepper",
                "1/2 tsp black cardamom",
                "1/4 tsp ground ginger",
                "1/4 tsp moringa seed powder",
                "1/4 tsp ground cinnamon",
                "about 400 ml water"
            ],
            [
                "2 potatoes, diced",
                "1 carrot, jardiniere cut",
                "1/4 bunch coriander leaves",
                "500 g rice",
                "600 ml water"
            ]
        ]
    };

    const shurpaSteps = {
        id: [
            ["1.", "Merebus daging", "pertama rebus air hingga boiling setelah air boil masukkan daging daun salam+jahe geprek lalu tunggu selama 30 menit setelah 30 menit tutup panci dan jangan dibuka dan pastikan tidak ada udara yang masuk ataupun keluar", "Boiling dan Braising", "Kompor,panci, leadle,pisau"],
            ["2.", "Memasak daging", "pertama tama siapkan air rebusan, setelah itu masukan daging yang sudah di rebus, masukan juga bawang bombay, daun salam, ketumbar dan merica. setelah itu tunggu selama 90 menit", "Simmering", "Kompor,panci, leadle"],
            ["3.", "Penyaringan", "setelah 90 menit, angkat bawang bombay dan herbs, lalu biarkan daging dan air nya", "Straining", "Strainer"],
            ["4.", "Masukan sayur", "setelah itu masukan wortel, kentang, kacang, tomat dan paprika, tunggu kembali selama 30 menit", "Simmering", "Kompor,panci, leadel"],
            ["5.", "Pembumbuan", "setelah 30 menit lalu masukan garam, blackpepper, cumin powder", "Simmering", "Kompor, panci, leadel"],
            ["6.", "Tahap akhir", "jika di rasa sudah pas, soup siap di plating untuk di hidangkan", "", "Kompor, panci, leadel"]
        ],
        en: [
            ["1.", "Boil the meat", "Bring water to a boil, then add the meat, bay leaves, and crushed ginger. Simmer for 30 minutes, then close the pot tightly so no air enters.", "Boiling & Braising", "Stove, pot, ladle, knife"],
            ["2.", "Cook the meat", "Prepare the stock, add the pre-boiled meat, onions, bay leaves, coriander, and pepper. Continue simmering for about 90 minutes.", "Simmering", "Stove, pot, ladle"],
            ["3.", "Strain", "After 90 minutes, remove onions and herbs, leaving the meat and broth.", "Straining", "Strainer"],
            ["4.", "Add vegetables", "Add carrots, potatoes, beans, tomatoes, and paprika, then simmer again for 30 minutes.", "Simmering", "Stove, pot, ladle"],
            ["5.", "Seasoning", "Add salt, black pepper, and cumin powder, then continue simmering.", "Simmering", "Stove, pot, ladle"],
            ["6.", "Final stage", "Once flavor is balanced, plate the soup and serve.", "", "Stove, pot, ladle"]
        ]
    };

    const getCurrentLang = () => {
        const htmlLang = (document.documentElement.getAttribute("lang") || "").toLowerCase();
        if (htmlLang === "en") return "en";
        try {
            const stored = (window.localStorage.getItem("lang") || "").toLowerCase();
            if (stored === "en") return "en";
        } catch (_) {
            // ignore
        }
        return "id";
    };

    const dishes = [
        {
            key: "kompot",
            title: "Fruit Kompot",
            titleEn: "Fruit Kompot",
            image: "assets/img/card/FruitKompot.png",
            imagePosition: "50% 0%",
            intro:
                "Salah satu minuman tradisional yang populer di Uzbekistan adalah fruit kompot, minuman berbasis rebusan buah yang ringan, segar, dan mudah dinikmati kapan saja. Kompot biasanya disajikan setelah makan, saat berkumpul bersama keluarga, atau ketika menerima tamu di rumah. Di Uzbekistan, kompot sering dibuat dari buah musiman seperti apel, aprikot, ceri, kismis, atau campuran buah kering yang direbus perlahan hingga sari buahnya keluar. Minuman ini bisa dinikmati dalam keadaan hangat saat cuaca dingin atau disajikan dingin saat musim panas. Selain rasanya yang manis alami dan menyegarkan, kompot juga dianggap sebagai cara tradisional untuk memanfaatkan buah agar tidak cepat rusak dan tetap tahan disimpan lebih lama. Karena mudah dibuat dan cocok untuk berbagai suasana, fruit kompot menjadi bagian dari kebiasaan kuliner rumahan yang tetap bertahan hingga sekarang.",
            introEn:
                "Fruit kompot is a popular traditional drink in Uzbekistan. It is made by simmering fruits to create a light, refreshing drink that can be enjoyed anytime. Kompot is commonly served after meals, during family gatherings, or when welcoming guests at home. In Uzbekistan, kompot is often prepared from seasonal fruits such as apples, apricots, cherries, raisins, or mixed dried fruits cooked slowly until their flavor is extracted. It can be enjoyed warm in winter or chilled in summer. Besides its naturally sweet and refreshing taste, kompot is also a practical traditional way to preserve fruit for longer use. Because it is simple to prepare and fits many occasions, fruit kompot remains an important part of home culinary traditions.",
            introImage: "assets/img/gastronomi/fruit.png",
            introPosition: "50% 0%",
            nutritionImage: "assets/img/gastronomi/nilaigizifruitkompot.png",
            nutritionThumb: "button",
            gastroTemplate: "kompot-direct",
            directParagraphs: [
                "Salah satu minuman tradisional di Uzbekistan adalah kompot. Minuman ini bisa diminum kapan saja, biasanya disajikan setelah makan, saat ada tamu, atau ketika berkumpul bersama keluarga. Di Uzbekistan, kompot sering dibuat saat musim panas karena buah sedang banyak dan mudah didapat. Minuman ini kemudian disimpan untuk musim dingin karena pada musim dingin buah segar sulit ditemukan. Dengan membuat kompot, orang tetap bisa menikmati rasa buah walaupun di luar sedang bersalju.",
                "Cara membuat kompot cukup sederhana. Buah direbus dengan air dan gula sampai lunak. Cara ini membantu agar buah tidak terbuang dan bisa disimpan lebih lama. Kompot biasanya dimasukkan ke dalam botol kaca dan disimpan untuk diminum nanti. Minuman ini bukan hanya pelepas kehausan, tetapi juga bagian dari kebiasaan dan tradisi keluarga."
            ],
            directParagraphsEn: [
                "One of Uzbekistan's traditional drinks is kompot. It can be enjoyed at any time and is often served after meals, when guests visit, or during family gatherings. In Uzbekistan, kompot is commonly prepared in summer when fruit is abundant and easy to get. It is then stored for winter when fresh fruit is harder to find, allowing people to still enjoy fruit flavors even in snowy weather.",
                "Kompot is very simple to make. Fruit is boiled with water and sugar until tender. This method helps reduce food waste and makes the drink last longer. Kompot is usually stored in glass bottles for later serving. It is not only a refreshing drink but also part of family habits and culinary tradition."
            ],
            funFacts: [
                "Kompot bisa dibuat dari buah segar maupun buah kering.",
                "Setiap keluarga bisa memiliki resep yang berbeda, tergantung buah yang tersedia.",
                "Rasanya bisa diminum hangat saat musim dingin atau dingin saat musim panas.",
                "Kompot sering dibuat dalam jumlah besar untuk persediaan beberapa hari atau minggu.",
                "Minuman ini termasuk minuman rumahan yang sudah ada sejak lama di wilayah Asia Tengah dan Eropa Timur."
            ],
            funFactsEn: [
                "Kompot can be made using fresh fruit or dried fruit.",
                "Each family may have a different recipe depending on available fruit.",
                "It can be served warm in winter or cold in summer.",
                "Kompot is often prepared in large batches for several days or weeks.",
                "This homemade drink has existed for a long time in Central Asia and Eastern Europe."
            ],
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
            ,
            gastronomyEn: {
                method: {
                    title: "Traditional Cooking Method",
                    text: "Fruit is simmered over low heat until flavor is extracted, then cooled. Kompot can be served warm or cold depending on the season."
                },
                social: {
                    title: "Social Symbol",
                    text: "In many families, kompot is a welcoming drink for guests, simple yet warm, often served at home gatherings."
                },
                habit: {
                    title: "Community Habit",
                    text: "Kompot is often made from seasonal or dried fruit as a practical way to manage household food supplies."
                },
                variations: {
                    title: "Variations",
                    items: ["Apple kompot", "Apricot kompot", "Cherry kompot", "Dried-fruit kompot"]
                },
                enjoy: {
                    title: "How To Enjoy",
                    text: "Served cold in hot weather or warm in cold weather. Usually enjoyed with main dishes or as a refreshing ending drink."
                }
            }
        },
        {
            key: "shurpa",
            title: "Sup Uzbek Shurpa",
            titleEn: "Uzbek Shurpa Soup",
            image: "assets/img/card/SupUzbekShurpa.png",
            imagePosition: "50% 22%",
            intro:
                "Hidangan ini berasal dari Asia Tengah. Shurpa adalah sup tradisional dari Uzbekistan di wilayah Asia Tengah. Hidangan ini sudah ada sejak lama dan berkembang dari kebiasaan masyarakat nomaden yang memasak sup daging sederhana. Resepnya menyebar melalui jalur perdagangan Silk Road. Menurut cerita rakyat, para pedagang Jalur Sutra memasak daging, sayuran, dan air dalam satu panci saat perjalanan jauh. Sup hangat itu mengenyangkan dan kemudian dikenal sebagai shurpa.",
            introEn:
                "This dish comes from Central Asia. Shurpa is a traditional Uzbek soup that has existed for a long time and developed from nomadic communities who cooked simple meat soup. Its recipe spread along the Silk Road. According to folk stories, Silk Road traders cooked meat, vegetables, and water in one pot during long journeys. This warm, filling soup became known as shurpa.",
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
            ,
            gastronomyEn: {
                method: {
                    title: "Traditional Cooking Method",
                    lines: [
                        "Shurpa is traditionally cooked in a kazan (large cauldron):",
                        "Boiling lamb or beef",
                        "Adding carrots, potatoes, onions, and tomatoes",
                        "Slow cooking over firewood for a rich broth"
                    ]
                },
                social: {
                    title: "Social Symbol",
                    text: "Shurpa represents hospitality and togetherness, often served to guests or at family events."
                },
                habit: {
                    title: "Community Habit",
                    lines: [
                        "Families often cook shurpa in large portions.",
                        "It is commonly served warm during gatherings.",
                        "Shurpa is a staple in everyday Uzbek meals.",
                        "The recipe is often passed down through generations."
                    ]
                },
                variations: {
                    title: "Variations",
                    items: [
                        "Kainatma Shurpa (direct boil)",
                        "Kovurma Shurpa (meat is fried first)",
                        "Chicken Shurpa",
                        "Vegetable Shurpa"
                    ]
                },
                enjoy: {
                    title: "How To Enjoy",
                    lines: [
                        "Served hot in a bowl.",
                        "Usually eaten with traditional bread (non).",
                        "Often topped with vegetables or coriander leaves."
                    ]
                }
            }
        },
        {
            key: "plov",
            title: "Plov Uzbek",
            titleEn: "Uzbek Plov",
            image: "assets/img/card/PlovUzbekistan.png",
            imagePosition: "50% 55%",
            intro:
                "Uzbek Plov adalah hidangan nasi yang berasal dari Uzbekistan sejak abad ke 11 atau 12, dimana nasi di tumis dan di rebus bersama daging kambing, wortel, dan bawang dalam kuali besar. Meskipun sering dikaitkan dengan penaklukan Alexander Agung di Sogdia pada abad ke 4 SM, plov lebih akurat dari tradisi kuliner persia dan Asia Tengah. Dikedikawan abad ke 10, Abu Ali Ibn Sina, tercatat mendokumentasikan metode persiapan hidangan sejenis Palov.",
            introEn:
                "Uzbek plov is a rice dish from Uzbekistan dating back to around the 11th or 12th century, where rice is sautéed and cooked with lamb, carrots, and onions in a large cauldron. Although often linked to Alexander the Great's conquest of Sogdia in the 4th century BC, plov is more accurately rooted in Persian and Central Asian culinary traditions. In the 10th century, Abu Ali Ibn Sina documented methods for preparing a similar dish known as palov.",
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
            ,
            gastronomyEn: {
                method: {
                    title: "Traditional Cooking Method",
                    text: "Unlike ordinary steamed rice, Uzbek plov starts with zirvak: sautéed meat, carrots, and spices. Rice is then added and cooked until all broth is absorbed."
                },
                social: {
                    title: "Social Symbol",
                    text: "In Uzbekistan, plov is more than food. It is a social tradition cooked in large quantities by an oshpaz (plov master) for weddings and celebrations."
                },
                variations: {
                    title: "Variations",
                    text: "Each region in Uzbekistan has its own version of plov."
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
        const gastro = (currentLang === "en" ? dish.gastronomyEn : dish.gastronomy) || dish.gastronomy || {};
        const ui = uiDict[currentLang] || uiDict.id;

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
                return `<button class="gastro-gizi-thumb" type="button" data-open-gizi data-gizi-src="${src}" aria-label="${escapeHtml(ui.giziBtn)}">
                            <img src="${src}" alt="${escapeHtml(ui.giziBtn)}" loading="lazy" decoding="async">
                        </button>`;
            }
            return `<button class="gastro-cta" type="button" data-open-gizi data-gizi-src="${src}">${escapeHtml(ui.giziBtn)}</button>`;
        };

        const template = dish.gastroTemplate || "default";

        if (template === "kompot-direct") {
            const src = escapeHtml(dish.nutritionImage || "assets/img/gastronomi/nilaigizisup.png");
            const directParagraphs = currentLang === "en" ? dish.directParagraphsEn : dish.directParagraphs;
            const funFactItems = currentLang === "en" ? dish.funFactsEn : dish.funFacts;
            const paragraphs = Array.isArray(directParagraphs) && directParagraphs.length
                ? directParagraphs.map((text) => `<p>${escapeHtml(text)}</p>`).join("")
                : `<p>${escapeHtml((currentLang === "en" ? dish.introEn : dish.intro) || dish.intro || "")}</p>`;
            const funFacts = Array.isArray(funFactItems) && funFactItems.length
                ? funFactItems.map((item, idx) => `<li>${idx + 1}. ${escapeHtml(item)}</li>`).join("")
                : "";
            cardsNode.innerHTML = `
                <div class="gastro-direct" data-template="kompot-direct" aria-label="Gastronomi Fruit Kompot">
                    <div class="gastro-direct-layout">
                        <div class="gastro-direct-copy">
                            ${paragraphs}
                        </div>
                        <figure class="gastro-direct-figure">
                            <img src="${escapeHtml(dish.introImage || "assets/img/gastronomi/fruit.png")}" alt="Ilustrasi ${escapeHtml(dish.title)}" loading="lazy" decoding="async">
                        </figure>
                    </div>
                    <p class="gastro-direct-actions">
                        <button class="gastro-cta" type="button" data-open-gizi data-gizi-src="${src}">${escapeHtml(ui.giziBtn)}</button>
                    </p>
                    ${funFacts ? `
                    <article class="gastro-funfact" aria-label="Funfact Kompot">
                        <h3>${escapeHtml(ui.funfactTitle)}</h3>
                        <ol>
                            ${funFacts}
                        </ol>
                    </article>` : ""}

                    <section class="kompot-recipe" aria-label="Cara membuat Fruit Kompot">
                        <h3 class="kompot-recipe-title">${escapeHtml(ui.recipeTitle)}</h3>
                        <div class="kompot-recipe-stage">
                            <p class="kompot-note">${ui.garnish}</p>

                            <figure class="kompot-item kompot-item--lemon">
                                <img src="assets/img/gastronomi/lemon.png" alt="Lemon" loading="lazy" decoding="async">
                            </figure>

                            <figure class="kompot-item kompot-item--apple">
                                <img src="assets/img/gastronomi/apple.png" alt="Apel" loading="lazy" decoding="async">
                                <figcaption>${escapeHtml(ui.appleLabel)}</figcaption>
                            </figure>

                            <figure class="kompot-item kompot-item--gula">
                                <img src="assets/img/gastronomi/gula.png" alt="Gula" loading="lazy" decoding="async">
                                <figcaption>${escapeHtml(ui.sugarLabel)}</figcaption>
                            </figure>

                            <figure class="kompot-item kompot-item--pir">
                                <img src="assets/img/gastronomi/pir.png" alt="Pir" loading="lazy" decoding="async">
                                <figcaption>${escapeHtml(ui.pearLabel)}</figcaption>
                            </figure>

                            <figure class="kompot-item kompot-item--air">
                                <img src="assets/img/gastronomi/2literair.png" alt="Air" loading="lazy" decoding="async">
                                <figcaption>${escapeHtml(ui.waterLabel)}</figcaption>
                            </figure>

                            <figure class="kompot-item kompot-item--lemon-juice">
                                <img src="assets/img/gastronomi/lemon.png" alt="Lemon juice" loading="lazy" decoding="async">
                                <figcaption>${ui.lemonJuiceLabel}</figcaption>
                            </figure>

                            <figure class="kompot-center">
                                <img src="assets/img/gastronomi/fruitkompotremovebg.png" alt="Fruit Kompot" loading="lazy" decoding="async">
                            </figure>
                        </div>

                        <article class="kompot-steps" aria-label="Langkah langkah membuat Fruit Kompot">
                            <h4>${escapeHtml(ui.recipeStepsTitle)}</h4>
                            <ol>
                                ${(currentLang === "en"
                                    ? [
                                        "wash fruits under running water until clean",
                                        "cut apples and pears into 4 pieces each",
                                        "turn on the stove",
                                        "pour 2 liters of water into a pot",
                                        "when water is near boiling, add 200g sugar",
                                        "after sugar dissolves, add all fruit pieces",
                                        "boil for 1 hour",
                                        "kompot is ready when color turns golden-brown and fruit pieces are soft",
                                        "let it cool, then transfer to a glass container",
                                        "refrigerate (within 2 hours after cooking)",
                                        "leave for a while, then serve chilled",
                                        "pour into a glass, add 5 ml lemon juice, and stir",
                                        "kompot is ready to serve"
                                    ]
                                    : [
                                        "cuci buah dengan air mengalir hingga bersih",
                                        "potong apel dan pir masing masing menjadi 4 bagian",
                                        "nyalakan kompor",
                                        "tuangkan 2 liter air ke dalam panci",
                                        "tunggu sampai air hampir mendidih dan masukkan 200gr gula",
                                        "setelah gula sudah dimasukkan, masukkan semua potongan buah ke dalam panci",
                                        "rebus selama 1 jam",
                                        "kompot sudah jadi jika warnanya sudah mulai kecoklatan dan potongan buah saat ditusuk sudah lunak",
                                        "tunggu sampai sudah tidak panas dan masukkan ke wadah beling",
                                        "masukkan ke dalam kulkas (maksimal 2 jam sudah masuk kulkas)",
                                        "tunggu beberapa hari dan siap diminum",
                                        "tuangkan ke gelas lalu tambahkan 5 ml lemon juice dan aduk",
                                        "kompot siap disajikan"
                                    ]
                                ).map((step) => `<li>${escapeHtml(step)}</li>`).join("")}
                            </ol>
                        </article>
                    </section>
                </div>
            `;
            return;
        }

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
        imgEl.alt = currentLang === "en" ? dish.titleEn || dish.title : dish.title;
        imgEl.style.objectPosition = dish.imagePosition || "";
    };

    const applyPageLanguage = () => {
        currentLang = getCurrentLang();
        renderStatic();
    };

    const updateDetail = (dish) => {
        document.body.dataset.dishKey = dish.key || "";
        const ui = uiDict[currentLang] || uiDict.id;
        const localizedTitle = currentLang === "en" ? dish.titleEn || dish.title : dish.title;
        const localizedIntro = currentLang === "en" ? dish.introEn || dish.intro : dish.intro;

        titleNode.textContent = localizedTitle;
        introNode.textContent = localizedIntro;
        introImg.src = dish.introImage;
        introImg.alt = currentLang === "en" ? `Illustration of ${localizedTitle}` : `Ilustrasi ${localizedTitle}`;
        introImg.style.objectPosition = dish.introPosition || dish.imagePosition || "";
        introGiziBtn.setAttribute("data-gizi-src", dish.nutritionImage || "assets/img/gastronomi/nilaigizisup.png");
        introGiziBtn.textContent = ui.introGizi;
        gastroBannerTitle.textContent = ui.gastronomyTitle;

        const isKompotDirect = dish.gastroTemplate === "kompot-direct";
        introWrap.hidden = isKompotDirect;
        introActionsWrap.hidden = isKompotDirect;
        cookSection.hidden = isKompotDirect;

        const ingredientData = shurpaIngredients[currentLang] || shurpaIngredients.id;
        ingredientLists.forEach((listNode, index) => {
            const items = ingredientData[index] || [];
            listNode.innerHTML = items.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
        });

        const stepsData = shurpaSteps[currentLang] || shurpaSteps.id;
        const headerData = ui.tableHead;
        stepsHeaderCells.forEach((cell, index) => {
            if (headerData[index]) cell.textContent = headerData[index];
        });

        stepsRows.forEach((row, rowIndex) => {
            const rowData = stepsData[rowIndex];
            if (!rowData) return;
            const cells = Array.from(row.querySelectorAll("td"));
            cells.forEach((cell, cellIndex) => {
                cell.textContent = rowData[cellIndex] || "";
            });
        });

        cookTitle.textContent = ui.cookTitle;
        ingredientsTitle.textContent = ui.ingredientsTitle;

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

    introGiziBtn.addEventListener("click", () => {
        const src = introGiziBtn.getAttribute("data-gizi-src") || "assets/img/gastronomi/nilaigizisup.png";
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

    document.addEventListener("langchange", applyPageLanguage);

    window.addEventListener("storage", (event) => {
        if (event.key === "lang") applyPageLanguage();
    });

    renderStatic();
})();
