const tabButtons = Array.from(document.querySelectorAll(".itinerary-tab-btn"));
const tabPanels = Array.from(document.querySelectorAll(".tab-panel"));

const activateTab = (button) => {
    const targetId = button.dataset.tabTarget;
    if (!targetId) return;

    tabButtons.forEach((btn) => {
        const isActive = btn === button;
        btn.classList.toggle("is-active", isActive);
        btn.setAttribute("aria-selected", isActive ? "true" : "false");
    });

    tabPanels.forEach((panel) => {
        const isActive = panel.id === targetId;
        panel.classList.toggle("is-active", isActive);
        panel.hidden = !isActive;
    });
};

tabButtons.forEach((button) => {
    button.addEventListener("click", () => activateTab(button));
});

const defaultButton = document.querySelector(".itinerary-tab-btn.is-active") || tabButtons[0];
if (defaultButton) activateTab(defaultButton);
