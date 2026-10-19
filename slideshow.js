
document.addEventListener("DOMContentLoaded", () => {
    const source = document.getElementById("prayer-source");
    const container = document.getElementById("slides-container");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const counter = document.getElementById("slide-counter");

    if (!source || !container || !prevBtn || !nextBtn || !counter) {
        console.error("Slideshow elements are missing.");
        return;
    }

    // Each paragraph becomes its own slide.
    const paragraphs = Array.from(source.querySelectorAll("p"))
        .flatMap(p => p.innerHTML.split(/<br\s*\/?>\s*<br\s*\/?>/i))
        .map(text => text.trim())
        .filter(text => text.length > 0);

    let currentSlide = 0;

    paragraphs.forEach((paragraph, index) => {
        const slide = document.createElement("div");
        slide.className = "slide";
        slide.innerHTML = paragraph;
        slide.hidden = index !== 0;
        container.appendChild(slide);
    });

    const slides = Array.from(container.querySelectorAll(".slide"));

    function showSlide(index) {
        currentSlide = Math.max(0, Math.min(index, slides.length - 1));

        slides.forEach((slide, i) => {
            slide.hidden = i !== currentSlide;
        });

        counter.textContent = slides.length
            ? `${currentSlide + 1} / ${slides.length}`
            : "0 / 0";

        prevBtn.disabled = currentSlide === 0;
        nextBtn.disabled = currentSlide === slides.length - 1;
    }

    prevBtn.addEventListener("click", () => {
        showSlide(currentSlide - 1);
    });

    nextBtn.addEventListener("click", () => {
        showSlide(currentSlide + 1);
    });

    showSlide(0);
});
