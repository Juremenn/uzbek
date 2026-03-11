(function () {
    const navContent = document.getElementById("navContent");
    const navMobileToggle = document.getElementById("navMobileToggle");
    const navPrimary = document.getElementById("navPrimary");
    const jelajahiDropdown = document.getElementById("jelajahiDropdown");
    const jelajahiDropdownToggle = document.getElementById("jelajahiDropdownToggle");
    const jelajahiDropdownMenu = document.getElementById("jelajahiDropdownMenu");
    const langButtons = Array.from(document.querySelectorAll("[data-lang]"));

    if (!navContent || !navMobileToggle || !navPrimary || !jelajahiDropdown || !jelajahiDropdownToggle || !jelajahiDropdownMenu) {
        return;
    }

    const mobileNavQuery = window.matchMedia("(max-width: 820px)");
    const prefersReducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let navTransitionTimer = null;

    function isMobileNavLayout() {
        return mobileNavQuery.matches;
    }

    function clearNavTransitionTimer() {
        if (navTransitionTimer) {
            window.clearTimeout(navTransitionTimer);
            navTransitionTimer = null;
        }
    }

    function animateNavPrimary(open) {
        if (!isMobileNavLayout()) return;

        clearNavTransitionTimer();

        if (prefersReducedMotionQuery.matches) {
            navPrimary.style.height = "";
            return;
        }

        const node = navPrimary;

        if (open) {
            node.style.height = "0px";
            void node.offsetHeight;
            node.style.height = `${node.scrollHeight}px`;

            const onEnd = (event) => {
                if (event.target !== node || event.propertyName !== "height") return;
                node.style.height = "";
                node.removeEventListener("transitionend", onEnd);
            };
            node.addEventListener("transitionend", onEnd);

            navTransitionTimer = window.setTimeout(() => {
                node.style.height = "";
                node.removeEventListener("transitionend", onEnd);
                navTransitionTimer = null;
            }, 360);

            return;
        }

        const start = node.getBoundingClientRect().height;
        node.style.height = `${Math.max(0, Math.round(start))}px`;
        void node.offsetHeight;
        node.style.height = "0px";
    }

    function setDropdownState(isOpen) {
        jelajahiDropdown.classList.toggle("open", isOpen);
        jelajahiDropdownToggle.setAttribute("aria-expanded", String(isOpen));
        jelajahiDropdownMenu.setAttribute("aria-hidden", String(!isOpen));
    }

    function setMobileNavState(isOpen) {
        const shouldOpen = isMobileNavLayout() && isOpen;
        const wasOpen = navContent.classList.contains("is-open");
        if (shouldOpen === wasOpen) return;

        if (isMobileNavLayout()) {
            navPrimary.setAttribute("aria-hidden", String(!shouldOpen));
        } else {
            navPrimary.removeAttribute("aria-hidden");
        }

        if (shouldOpen) {
            navContent.classList.add("is-open");
            navMobileToggle.setAttribute("aria-expanded", "true");
            animateNavPrimary(true);
            return;
        }

        // Animate close, then remove the open class so layout work is minimized.
        animateNavPrimary(false);
        navMobileToggle.setAttribute("aria-expanded", "false");
        setDropdownState(false);

        const finish = () => {
            navContent.classList.remove("is-open");
            navPrimary.style.height = "";
        };

        const onEnd = (event) => {
            if (event.target !== navPrimary || event.propertyName !== "height") return;
            navPrimary.removeEventListener("transitionend", onEnd);
            clearNavTransitionTimer();
            finish();
        };
        navPrimary.addEventListener("transitionend", onEnd);
        navTransitionTimer = window.setTimeout(() => {
            navPrimary.removeEventListener("transitionend", onEnd);
            finish();
            navTransitionTimer = null;
        }, 360);
    }

    function syncResponsiveNav() {
        if (isMobileNavLayout()) {
            if (!navContent.classList.contains("is-open")) {
                setDropdownState(false);
            }

            navPrimary.setAttribute("aria-hidden", String(!navContent.classList.contains("is-open")));
            navPrimary.style.height = "";
            return;
        }

        navContent.classList.remove("is-open");
        navMobileToggle.setAttribute("aria-expanded", "false");
        navPrimary.removeAttribute("aria-hidden");
        navPrimary.style.height = "";
        setDropdownState(false);
    }

    const translations = {
        id: {
            "brand.name": "UZBEKISTAN",
            "nav.menu": "Menu",
            "nav.home": "Beranda",
            "nav.explore": "Jelajahi Uzbekistan",
            "nav.cuisine": "Cita Rasa",
            "nav.values": "Nilai Global",
            "nav.gallery": "Galeri",
            "nav.about": "Tentang Kami",
            "nav.geo": "Kondisi Geografis",
            "nav.dest": "Destinasi & Wisata",
            "nav.figures": "Tokoh Inspiratif",
            "nav.packages": "Paket Wisata",
            "hero.welcome": "SELAMAT DATANG DI",
            "hero.title": "UZBEKISTAN",
            "hero.subtitle": "TEMUKAN HAL MENARIK TENTANG UZBEKISTAN",
            "hero.cta": "JELAJAHI SEKARANG",
            "map.title": "PETA NEGARA UZBEKISTAN",
            "map.desc":
                "Uzbekistan adalah negara terkurung daratan yang terletak di Asia Tengah, berbatasan dengan Kazakhstan di utara, Kyrgyzstan di timur laut, Tajikistan di tenggara, Afghanistan di selatan, dan Turkmenistan di barat daya. Negara ini dibagi menjadi 12 provinsi dan memiliki sejarah yang kaya sebagai bagian dari Uni Soviet dari tahun 1924 hingga 1991. Ibu kotanya adalah Tashkent, dan bahasa resminya adalah Uzbek.",
            "map.cta": "Lihat di Maps",
            "cities.title": "KOTA TERKENAL DI UZBEKISTAN",
            "cities.detail": "Detail",
            "ebook.title": "E-BOOK UZBEKISTAN",
            "ebook.prev": "Sebelumnya",
            "ebook.next": "Berikutnya",
            "ebook.meta": "Klik tombol untuk memuat pratinjau ebook.",
            "ebook.load": "Muat eBook",
            "ebook.open": "Buka PDF penuh",
            "footer.about": "Tentang kami",
            "footer.info": "Uzbekistan info",
            "footer.link.home": "Beranda",
            "footer.link.geo": "Kondisi geografis",
            "footer.link.dest": "Destinasi wisata",
            "footer.link.figures": "Tokoh inspiratif",
            "footer.link.packages": "Paket wisata",
            "footer.link.cuisine": "Cita rasa",
            "footer.link.values": "Nilai global",
            "footer.link.gallery": "Galeri",
            "footer.contact": "Hubungi kami",
            "footer.addr": "Jl. Kota Taman Metropolitan,<br>Cileungsi Kidul, Kec. Cileungsi,<br>Kabupaten Bogor, Jawa Barat 16820",
            "footer.web": "www.smkmetland.net",
            "footer.desc":
                "Website ini dibuat sebagai media informasi dan promosi digital yang menghadirkan keindahan serta kekayaan budaya Uzbekistan secara lebih dekat dan interaktif. Melalui tampilan visual yang menarik dan navigasi yang mudah, pengunjung dapat menjelajahi berbagai destinasi populer seperti Tashkent, Samarkand, dan Bukhara.",
            "footer.tagline": "Menjelajahi keindahan Uzbekistan dari Asia Tengah",
            "footer.copyright": "© 2026 website wisata uzbekistan | dibuat oleh kelompok 4"
        },
        en: {
            "brand.name": "UZBEKISTAN",
            "nav.menu": "Menu",
            "nav.home": "Home",
            "nav.explore": "Explore Uzbekistan",
            "nav.cuisine": "Cuisine",
            "nav.values": "Global Values",
            "nav.gallery": "Gallery",
            "nav.about": "About Us",
            "nav.geo": "Geography",
            "nav.dest": "Destinations",
            "nav.figures": "Inspiring Figures",
            "nav.packages": "Tour Packages",
            "hero.welcome": "WELCOME TO",
            "hero.title": "UZBEKISTAN",
            "hero.subtitle": "DISCOVER THE WONDERS OF UZBEKISTAN",
            "hero.cta": "EXPLORE NOW",
            "map.title": "MAP OF UZBEKISTAN",
            "map.desc":
                "Uzbekistan is a landlocked country in Central Asia bordered by Kazakhstan to the north, Kyrgyzstan to the northeast, Tajikistan to the southeast, Afghanistan to the south, and Turkmenistan to the southwest. It is divided into 12 provinces and was part of the Soviet Union from 1924 to 1991. Its capital is Tashkent and the official language is Uzbek.",
            "map.cta": "Check on Maps",
            "cities.title": "FAMOUS CITIES IN UZBEKISTAN",
            "cities.detail": "Details",
            "ebook.title": "UZBEKISTAN E-BOOK",
            "ebook.prev": "Previous",
            "ebook.next": "Next",
            "ebook.meta": "Click the button to load the ebook preview.",
            "ebook.load": "Load eBook",
            "ebook.open": "Open full PDF",
            "footer.about": "About us",
            "footer.info": "Uzbekistan info",
            "footer.link.home": "Home",
            "footer.link.geo": "Geography",
            "footer.link.dest": "Tourist destinations",
            "footer.link.figures": "Inspiring figures",
            "footer.link.packages": "Tour packages",
            "footer.link.cuisine": "Cuisine",
            "footer.link.values": "Global values",
            "footer.link.gallery": "Gallery",
            "footer.contact": "Contact us",
            "footer.addr": "Kota Taman Metropolitan St.,<br>Cileungsi Kidul, Cileungsi,<br>Bogor Regency, West Java 16820",
            "footer.web": "www.smkmetland.net",
            "footer.desc":
                "This website serves as a digital information and promotion hub bringing the beauty and cultural richness of Uzbekistan closer in an interactive way. With engaging visuals and easy navigation, visitors can explore popular destinations like Tashkent, Samarkand, and Bukhara.",
            "footer.tagline": "Exploring the beauty of Uzbekistan from Central Asia",
            "footer.copyright": "© 2026 Uzbekistan travel website | created by Team 4"
        }
    };

    function getInitialLang() {
        try {
            const stored = window.localStorage.getItem("lang");
            if (stored === "id" || stored === "en") return stored;
        } catch (_) {
            // ignore
        }

        return "id";
    }

    function setLang(lang) {
        const normalized = lang === "en" ? "en" : "id";
        document.documentElement.setAttribute("lang", normalized === "en" ? "en" : "id");

        const dict = translations[normalized] || translations.id;
        document.querySelectorAll("[data-i18n],[data-i18n-html]").forEach((node) => {
            const key = node.getAttribute("data-i18n") || node.getAttribute("data-i18n-html");
            if (!key || !dict[key]) return;
            if (node.hasAttribute("data-i18n-html")) {
                node.innerHTML = dict[key];
            } else {
                node.textContent = dict[key];
            }
        });

        langButtons.forEach((btn) => {
            const btnLang = btn.getAttribute("data-lang");
            const isActive = btnLang === normalized;
            btn.classList.toggle("is-active", isActive);
            btn.setAttribute("aria-pressed", String(isActive));
        });

        try {
            window.localStorage.setItem("lang", normalized);
        } catch (_) {
            // ignore
        }
    }

    navMobileToggle.addEventListener("click", () => {
        setMobileNavState(!navContent.classList.contains("is-open"));
    });

    jelajahiDropdownToggle.addEventListener("click", () => {
        const isOpen = jelajahiDropdown.classList.contains("open");
        setDropdownState(!isOpen);
    });

    document.addEventListener("click", (event) => {
        if (!jelajahiDropdown.contains(event.target)) {
            setDropdownState(false);
        }

        if (isMobileNavLayout() && !navContent.contains(event.target)) {
            setMobileNavState(false);
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            setDropdownState(false);
            setMobileNavState(false);
        }
    });

    navPrimary.addEventListener("click", (event) => {
        const clickedLink = event.target.closest("a");
        if (clickedLink && isMobileNavLayout()) {
            setMobileNavState(false);
        }
    });

    window.addEventListener("resize", syncResponsiveNav);
    syncResponsiveNav();

    if (langButtons.length) {
        langButtons.forEach((button) => {
            button.addEventListener("click", () => {
                const nextLang = button.getAttribute("data-lang");
                setLang(nextLang);
            });
        });

        setLang(getInitialLang());
    }

    // Lightweight perf tweak: lazy-load all images/iframes that aren't explicitly marked
    window.addEventListener("DOMContentLoaded", () => {
        document.querySelectorAll("img:not([loading])").forEach((img) => {
            img.setAttribute("loading", "lazy");
            img.setAttribute("decoding", "async");
        });
        document.querySelectorAll("iframe:not([loading])").forEach((frame) => {
            frame.setAttribute("loading", "lazy");
        });
    });
})();
