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

    function isMobileNavLayout() {
        return mobileNavQuery.matches;
    }

    function setDropdownState(isOpen) {
        jelajahiDropdown.classList.toggle("open", isOpen);
        jelajahiDropdownToggle.setAttribute("aria-expanded", String(isOpen));
        jelajahiDropdownMenu.setAttribute("aria-hidden", String(!isOpen));
    }

    function setMobileNavState(isOpen) {
        const shouldOpen = isMobileNavLayout() && isOpen;
        navContent.classList.toggle("is-open", shouldOpen);
        navMobileToggle.setAttribute("aria-expanded", String(shouldOpen));

        if (isMobileNavLayout()) {
            navPrimary.setAttribute("aria-hidden", String(!shouldOpen));
        } else {
            navPrimary.removeAttribute("aria-hidden");
        }

        if (!shouldOpen) {
            setDropdownState(false);
        }
    }

    function syncResponsiveNav() {
        if (isMobileNavLayout()) {
            if (!navContent.classList.contains("is-open")) {
                setDropdownState(false);
            }

            navPrimary.setAttribute("aria-hidden", String(!navContent.classList.contains("is-open")));
            return;
        }

        navContent.classList.remove("is-open");
        navMobileToggle.setAttribute("aria-expanded", "false");
        navPrimary.removeAttribute("aria-hidden");
        setDropdownState(false);
    }

    const translations = {
        id: {
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
            "nav.packages": "Paket Wisata"
        },
        en: {
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
            "nav.packages": "Tour Packages"
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
        document.querySelectorAll("[data-i18n]").forEach((node) => {
            const key = node.getAttribute("data-i18n");
            if (key && dict[key]) {
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
})();
