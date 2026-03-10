let slideIndex = 1;
showSlides(slideIndex);

setInterval(() => {
    slideIndex += 1;
    showSlides(slideIndex);
}, 5000);

function currentSlide(n) {
    slideIndex = n;
    showSlides(slideIndex);
}

function showSlides(n) {
    const slides = document.getElementsByClassName("slide");
    const indicators = document.getElementsByClassName("indicator");

    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }

    for (let i = 0; i < slides.length; i += 1) {
        slides[i].classList.remove("active");
    }
    for (let i = 0; i < indicators.length; i += 1) {
        indicators[i].classList.remove("active");
    }

    slides[slideIndex - 1].classList.add("active");
    indicators[slideIndex - 1].classList.add("active");
}

window.currentSlide = currentSlide;

const citiesSection = document.querySelector(".cities-section");
const rightPanel = document.querySelector(".right-panel");
const panelPopup = document.getElementById("panelPopup");
const panelPopupImg = document.getElementById("panelPopupImg");
const panelPopupTitle = document.getElementById("panelPopupTitle");
const panelPopupDesc = document.getElementById("panelPopupDesc");
const panelPopupClose = document.getElementById("panelPopupClose");
const sectionOverlay = document.getElementById("sectionOverlay");

const cityNames = {
    tashkent: "Tashkent",
    samarkand: "Samarkand",
    bukhara: "Bukhara"
};

function shouldAutoScrollToPanel() {
    return window.matchMedia("(max-width: 1100px)").matches;
}

function scrollToCityExplanation() {
    if (!shouldAutoScrollToPanel()) {
        return;
    }

    const navbar = document.querySelector(".navbar");
    const navbarHeight = navbar ? navbar.offsetHeight : 0;
    const targetTop = rightPanel.getBoundingClientRect().top + window.scrollY - navbarHeight - 16;

    window.scrollTo({
        top: Math.max(0, targetTop),
        behavior: "smooth"
    });
}

function openPanelPopup(city, img, desc) {
    panelPopupImg.src = img;
    panelPopupImg.alt = cityNames[city] || city;
    panelPopupTitle.textContent = cityNames[city] || city;
    panelPopupDesc.textContent = desc;
    citiesSection.classList.add("panel-active");
    rightPanel.classList.add("has-popup");
    panelPopup.setAttribute("aria-hidden", "false");
}

function closePanelPopup() {
    citiesSection.classList.remove("panel-active");
    rightPanel.classList.remove("has-popup");
    panelPopup.setAttribute("aria-hidden", "true");
}

document.querySelectorAll(".card-button").forEach((btn) => {
    btn.addEventListener("click", () => {
        openPanelPopup(btn.dataset.city, btn.dataset.img, btn.dataset.desc);
        window.requestAnimationFrame(scrollToCityExplanation);
    });
});

panelPopupClose.addEventListener("click", closePanelPopup);
sectionOverlay.addEventListener("click", closePanelPopup);

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && rightPanel.classList.contains("has-popup")) {
        closePanelPopup();
    }
});

const flipbookStage = document.getElementById("flipbookStage");
const flipPrev = document.getElementById("flipPrev");
const flipNext = document.getElementById("flipNext");
const flipMeta = document.getElementById("flipbookMeta");
const flipbookLink = document.getElementById("flipbookLink");

let frontCanvas = document.getElementById("flipCanvasFront");
let backCanvas = document.getElementById("flipCanvasBack");
let pdfDoc = null;
let currentPage = 1;
let isFlipping = false;

const pdfCandidates = [
    "/assets/ebook/UZBEKISTAN.pdf",
    "assets/ebook/UZBEKISTAN.pdf",
    "../assets/ebook/UZBEKISTAN.pdf"
];

async function pickPdfUrl() {
    for (const url of pdfCandidates) {
        try {
            const res = await fetch(url, { method: "HEAD" });
            if (res.ok) {
                return url;
            }
        } catch (error) {
            // Try next candidate.
        }
    }
    return pdfCandidates[0];
}

async function loadPdfFromUrl(url) {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error("PDF not found");
    }
    const data = await res.arrayBuffer();
    const loadingTask = window.pdfjsLib.getDocument({ data });
    return loadingTask.promise;
}

function setCanvasRoles() {
    frontCanvas.classList.add("flip-front");
    frontCanvas.classList.remove("flip-back");
    backCanvas.classList.add("flip-back");
    backCanvas.classList.remove("flip-front");
}

function updateFlipControls() {
    if (!pdfDoc) {
        flipPrev.disabled = true;
        flipNext.disabled = true;
        return;
    }

    flipPrev.disabled = currentPage <= 1 || isFlipping;
    flipNext.disabled = currentPage >= pdfDoc.numPages || isFlipping;
    flipMeta.textContent = `Halaman ${currentPage} / ${pdfDoc.numPages}`;
}

async function renderPage(pageNumber, canvas) {
    const page = await pdfDoc.getPage(pageNumber);
    const viewport = page.getViewport({ scale: 1 });
    const stageWidth = flipbookStage.clientWidth;
    const scale = stageWidth / viewport.width;
    const scaledViewport = page.getViewport({ scale });
    const dpr = window.devicePixelRatio || 1;

    canvas.width = Math.floor(scaledViewport.width * dpr);
    canvas.height = Math.floor(scaledViewport.height * dpr);

    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    await page.render({
        canvasContext: ctx,
        viewport: scaledViewport
    }).promise;
}

async function goToPage(targetPage, direction) {
    if (!pdfDoc || isFlipping) {
        return;
    }

    if (targetPage < 1 || targetPage > pdfDoc.numPages || targetPage === currentPage) {
        return;
    }

    isFlipping = true;
    updateFlipControls();

    try {
        await renderPage(targetPage, backCanvas);

        flipbookStage.classList.add("is-flipping", direction === "next" ? "is-next" : "is-prev");

        window.setTimeout(() => {
            const temp = frontCanvas;
            frontCanvas = backCanvas;
            backCanvas = temp;

            setCanvasRoles();
            flipbookStage.classList.remove("is-flipping", "is-next", "is-prev");

            currentPage = targetPage;
            isFlipping = false;
            updateFlipControls();
        }, 620);
    } catch (error) {
        isFlipping = false;
        flipMeta.textContent = "Gagal membuka halaman ebook.";
        updateFlipControls();
    }
}

flipPrev.addEventListener("click", () => goToPage(currentPage - 1, "prev"));
flipNext.addEventListener("click", () => goToPage(currentPage + 1, "next"));

window.addEventListener("resize", () => {
    if (!pdfDoc || isFlipping) {
        return;
    }

    window.clearTimeout(window.__flipbookResizeTimer);
    window.__flipbookResizeTimer = window.setTimeout(() => {
        renderPage(currentPage, frontCanvas).catch(() => {
            flipMeta.textContent = "Gagal menyesuaikan ukuran ebook.";
        });
    }, 140);
});

(async function initFlipbook() {
    if (!window.pdfjsLib) {
        flipMeta.textContent = "PDF engine tidak tersedia.";
        return;
    }

    window.pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

    try {
        const resolvedPdfUrl = await pickPdfUrl();
        if (flipbookLink) {
            flipbookLink.href = resolvedPdfUrl;
        }
        pdfDoc = await loadPdfFromUrl(resolvedPdfUrl);
        currentPage = 1;

        await renderPage(currentPage, frontCanvas);
        setCanvasRoles();
        updateFlipControls();
    } catch (error) {
        flipMeta.textContent = "Ebook gagal dimuat. Coba buka PDF penuh.";
        flipPrev.disabled = true;
        flipNext.disabled = true;
    }
})();
