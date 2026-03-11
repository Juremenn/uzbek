const modal = document.getElementById("citaModal");
const modalBg = document.getElementById("citaModalBg");
const modalImage = document.getElementById("citaModalImage");
const modalDesc = document.getElementById("citaModalDesc");
const modalPrimaryBtn = modal?.querySelector(".cita-modal-btn") ?? null;

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
    const image = card.dataset.image;
    const desc = card.dataset.desc;
    const primaryHref = card.dataset.primaryHref || "";
    const primaryLabel = card.dataset.primaryLabel || "";

    modalBg.style.backgroundImage = `url("${image}")`;
    modalImage.src = image;
    modalImage.alt = card.dataset.title || "Menu Uzbekistan";
    modalDesc.textContent = (desc || "").replace(/\\n/g, "\n");
    setModalTextDensity(modalDesc.textContent);
    if (modalPrimaryBtn) {
        modalPrimaryBtn.textContent = primaryLabel || "LIHAT SELENGKAPNYA";
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
