const galleryLightbox = document.getElementById("galleryLightbox");
const galleryLightboxImage = document.getElementById("galleryLightboxImage");
const galleryLightboxCaption = document.getElementById("galleryLightboxCaption");
const galleryLightboxClose = document.getElementById("galleryLightboxClose");

if (galleryLightbox && galleryLightboxImage && galleryLightboxCaption && galleryLightboxClose) {
    const galleryImages = Array.from(document.querySelectorAll(".gallery-main img, .gallery-thumbs img"));

    function openLightbox(image) {
        galleryLightboxImage.src = image.currentSrc || image.src;
        galleryLightboxImage.alt = image.alt || "Gambar galeri";
        galleryLightboxCaption.textContent = image.alt || "Galeri Uzbekistan";

        galleryLightbox.hidden = false;
        galleryLightbox.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    }

    function closeLightbox() {
        galleryLightbox.hidden = true;
        galleryLightbox.setAttribute("aria-hidden", "true");
        galleryLightboxImage.removeAttribute("src");
        document.body.style.overflow = "";
    }

    galleryImages.forEach((image) => {
        image.setAttribute("tabindex", "0");
        image.setAttribute("role", "button");
        image.setAttribute("aria-label", `Lihat ${image.alt || "gambar"} dalam ukuran besar`);

        image.addEventListener("click", () => openLightbox(image));
        image.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openLightbox(image);
            }
        });
    });

    galleryLightboxClose.addEventListener("click", closeLightbox);

    galleryLightbox.addEventListener("click", (event) => {
        if (event.target === galleryLightbox) {
            closeLightbox();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && !galleryLightbox.hidden) {
            closeLightbox();
        }
    });
}
