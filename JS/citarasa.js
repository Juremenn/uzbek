const modal = document.getElementById("citaModal");
const modalBg = document.getElementById("citaModalBg");
const modalImage = document.getElementById("citaModalImage");
const modalDesc = document.getElementById("citaModalDesc");

const openModal = (card) => {
    const image = card.dataset.image;
    const desc = card.dataset.desc;

    modalBg.style.backgroundImage = `url("${image}")`;
    modalImage.src = image;
    modalImage.alt = card.dataset.title || "Menu Uzbekistan";
    modalDesc.textContent = desc;

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
};

const closeModal = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
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
