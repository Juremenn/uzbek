(function () {
    const navContent = document.getElementById("navContent");
    const navMobileToggle = document.getElementById("navMobileToggle");
    const navPrimary = document.getElementById("navPrimary");
    const jelajahiDropdown = document.getElementById("jelajahiDropdown");
    const jelajahiDropdownToggle = document.getElementById("jelajahiDropdownToggle");
    const jelajahiDropdownMenu = document.getElementById("jelajahiDropdownMenu");

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
})();
