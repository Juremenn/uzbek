const modal = document.getElementById("citaModal");
const modalBg = document.getElementById("citaModalBg");
const modalImage = document.getElementById("citaModalImage");
const modalDesc = document.getElementById("citaModalDesc");
const modalPrimaryBtn = modal?.querySelector(".cita-modal-btn") ?? null;
const langButtons = Array.from(document.querySelectorAll("[data-lang]"));

const heroTitle = document.querySelector(".hero-title");
const heroCopyTitle = document.querySelector(".hero-copy h2");
const heroCopyText = document.querySelector(".hero-copy p");
const sectionTitle = document.querySelector(".section-title");

const pageDict = {
    id: {
        heroTitle: "CITA RASA",
        heroCopyTitle: "BERBAGAI KULINER SEDANG MENANTIMU",
        heroCopyText:
            "Kuliner Uzbekistan menawarkan cita rasa khas dengan rempah autentik dan bahan segar. Setiap hidangan mencerminkan tradisi, kehangatan, dan kekayaan budaya yang diwariskan turun-temurun.",
        sectionTitle: "MENU POPULER",
        modalCta: "LIHAT SELENGKAPNYA"
    },
    en: {
        heroTitle: "CUISINE",
        heroCopyTitle: "A VARIETY OF DISHES IS WAITING FOR YOU",
        heroCopyText:
            "Uzbek cuisine offers distinctive flavors with authentic spices and fresh ingredients. Each dish reflects tradition, warmth, and cultural richness passed down through generations.",
        sectionTitle: "POPULAR MENU",
        modalCta: "SEE DETAILS"
    }
};

let lastFocusedElement = null;
let savedScrollY = 0;
let isScrollLocked = false;

const setModalTextDensity = (text) => {
    const normalized = (text || "").replace(/\s+/g, " ").trim();
    const isShort = normalized.length > 0 && normalized.length <= 260;
    modal.classList.toggle("is-short-text", isShort);
};

const lockScroll = () => {
    if (isScrollLocked) return;

    savedScrollY = window.scrollY || window.pageYOffset || 0;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const supportsStableGutter =
        typeof CSS !== "undefined" &&
        typeof CSS.supports === "function" &&
        CSS.supports("scrollbar-gutter: stable");

    document.documentElement.style.overflow = "hidden";
    document.documentElement.style.paddingRight =
        !supportsStableGutter && scrollbarWidth > 0 ? `${scrollbarWidth}px` : "";

    document.body.classList.add("modal-open");
    document.body.style.top = `-${savedScrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";

    isScrollLocked = true;
};

const unlockScroll = () => {
    if (!isScrollLocked) return;

    document.body.classList.remove("modal-open");
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.documentElement.style.overflow = "";
    document.documentElement.style.paddingRight = "";

    window.scrollTo(0, savedScrollY);
    isScrollLocked = false;
};

const openModal = (card) => {
    const lang = getCurrentLang();
    const isEn = lang === "en";
    const image = card.dataset.image;
    const desc = isEn ? card.dataset.descEn || card.dataset.desc : card.dataset.desc;
    const title = isEn ? card.dataset.titleEn || card.dataset.title : card.dataset.title;
    const primaryHref = card.dataset.primaryHref || "";
    const primaryLabel = isEn
        ? card.dataset.primaryLabelEn || pageDict.en.modalCta
        : card.dataset.primaryLabel || pageDict.id.modalCta;

    modalBg.style.backgroundImage = `url("${image}")`;
    modalImage.src = image;
    modalImage.alt = title || (isEn ? "Uzbek menu" : "Menu Uzbekistan");
    modalDesc.textContent = (desc || "").replace(/\\n/g, "\n");
    setModalTextDensity(modalDesc.textContent);
    if (modalPrimaryBtn) {
        modalPrimaryBtn.textContent = primaryLabel || (isEn ? pageDict.en.modalCta : pageDict.id.modalCta);
        modalPrimaryBtn.dataset.href = primaryHref;
        modalPrimaryBtn.toggleAttribute("hidden", !primaryHref);
    }

    lastFocusedElement = document.activeElement;
    lockScroll();
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");

    if (modalPrimaryBtn) modalPrimaryBtn.focus();
};

const closeModal = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    modal.classList.remove("is-short-text");
    unlockScroll();

    if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
        lastFocusedElement.focus();
    }
    lastFocusedElement = null;
};

const getCurrentLang = () => {
    const docLang = (document.documentElement.getAttribute("lang") || "").toLowerCase();
    if (docLang === "en") return "en";

    try {
        const stored = (window.localStorage.getItem("lang") || "").toLowerCase();
        if (stored === "en") return "en";
    } catch (_) {
        // ignore
    }

    return "id";
};

const applyPageLanguage = () => {
    const lang = getCurrentLang();
    const dict = pageDict[lang] || pageDict.id;

    if (heroTitle) heroTitle.textContent = dict.heroTitle;
    if (heroCopyTitle) heroCopyTitle.textContent = dict.heroCopyTitle;
    if (heroCopyText) heroCopyText.textContent = dict.heroCopyText;
    if (sectionTitle) sectionTitle.textContent = dict.sectionTitle;

    document.querySelectorAll(".food-card").forEach((card) => {
        const titleNode = card.querySelector("h3");
        if (!titleNode) return;
        const title = lang === "en"
            ? card.dataset.titleEn || card.dataset.title || ""
            : card.dataset.title || "";
        titleNode.textContent = title;
    });

    if (modalPrimaryBtn && !modal.classList.contains("is-open")) {
        modalPrimaryBtn.textContent = dict.modalCta;
    }
};

document.querySelectorAll(".food-card").forEach((card) => {
    card.addEventListener("click", () => openModal(card));
    card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openModal(card);
        }
    });
});

if (modalPrimaryBtn) {
    modalPrimaryBtn.addEventListener("click", () => {
        const href = modalPrimaryBtn.dataset.href;
        if (!href) return;

        const isExternal = /^https?:\/\//i.test(href);
        closeModal();

        if (isExternal) {
            window.open(href, "_blank", "noopener,noreferrer");
            return;
        }

        window.location.href = href;
    });
}

modal.addEventListener("click", (event) => {
    if (event.target.closest("[data-close='true']")) {
        closeModal();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("is-open")) {
        closeModal();
    }
});

if (langButtons.length) {
    langButtons.forEach((button) => {
        button.addEventListener("click", () => {
            window.setTimeout(applyPageLanguage, 0);
        });
    });
}

window.addEventListener("storage", (event) => {
    if (event.key === "lang") applyPageLanguage();
});

applyPageLanguage();
