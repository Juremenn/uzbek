const globalMain = document.getElementById("nilaiGlobalMain");
const accordion = document.getElementById("nilaiGlobalAccordion");

if (globalMain && accordion) {
    const items = Array.from(accordion.querySelectorAll(".accordion-item"));

    function openPanel(panel) {
        if (panel.style.maxHeight === "none") {
            panel.style.maxHeight = `${panel.scrollHeight}px`;
        }
        panel.style.maxHeight = `${panel.scrollHeight}px`;
    }

    function closePanel(panel) {
        if (panel.style.maxHeight === "none" || !panel.style.maxHeight) {
            panel.style.maxHeight = `${panel.scrollHeight}px`;
        }

        window.requestAnimationFrame(() => {
            panel.style.maxHeight = "0px";
        });
    }

    function closeItem(itemToClose) {
        const toggle = itemToClose.querySelector(".accordion-toggle");
        const panel = itemToClose.querySelector(".accordion-panel");

        itemToClose.classList.remove("is-open");

        if (toggle) {
            toggle.setAttribute("aria-expanded", "false");
        }

        if (panel) {
            closePanel(panel);
        }
    }

    function openItem(itemToOpen, skipAnimation = false) {
        items.forEach((item) => {
            const isCurrent = item === itemToOpen;
            const toggle = item.querySelector(".accordion-toggle");
            const panel = item.querySelector(".accordion-panel");

            item.classList.toggle("is-open", isCurrent);

            if (toggle) {
                toggle.setAttribute("aria-expanded", isCurrent ? "true" : "false");
            }

            if (panel) {
                if (isCurrent) {
                    if (skipAnimation) {
                        panel.style.maxHeight = `${panel.scrollHeight}px`;
                    } else {
                        openPanel(panel);
                    }
                } else {
                    closePanel(panel);
                }
            }
        });

    }

    items.forEach((item) => {
        const toggle = item.querySelector(".accordion-toggle");
        if (!toggle) {
            return;
        }

        toggle.addEventListener("click", () => {
            const isOpen = item.classList.contains("is-open");
            if (isOpen) {
                closeItem(item);
                return;
            }

            openItem(item, false);
        });

        const panel = item.querySelector(".accordion-panel");
        if (panel) {
            panel.addEventListener("transitionend", (event) => {
                if (event.propertyName !== "max-height") {
                    return;
                }

                if (item.classList.contains("is-open")) {
                    panel.style.maxHeight = "none";
                }
            });
        }
    });

    window.addEventListener("resize", () => {
        items.forEach((item) => {
            if (!item.classList.contains("is-open")) {
                return;
            }

            const panel = item.querySelector(".accordion-panel");
            if (!panel) {
                return;
            }

            panel.style.maxHeight = `${panel.scrollHeight}px`;
            window.requestAnimationFrame(() => {
                panel.style.maxHeight = "none";
            });
        });
    });

    const initialItem = accordion.querySelector(".accordion-item.is-open") || items[0];
    if (initialItem) {
        openItem(initialItem, true);
    }
}
