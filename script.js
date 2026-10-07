document.addEventListener("DOMContentLoaded", () => {
  // Mobile Hamburger Toggle
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });
  }

  // Active Link Highlighting based on URL
  const currentPath = window.location.pathname.split("/").pop();
  const navAnchors = document.querySelectorAll(".nav-links a");
  navAnchors.forEach(link => {
    if (link.getAttribute("href") === currentPath || (currentPath === "" && link.getAttribute("href") === "index.html")) {
      link.classList.add("active");
    }
  });

  // Featured Project Image Carousel (Projects Page)
  const slides = document.querySelectorAll(".carousel-slide");
  const prevBtn = document.getElementById("prevSlide");
  const nextBtn = document.getElementById("nextSlide");
  const dotsContainer = document.getElementById("carouselDots");
  let currentSlide = 0;

  if (slides.length > 0) {
    // Generate indicator dots dynamically
    slides.forEach((_, idx) => {
      const dot = document.createElement("div");
      dot.classList.add("indicator-dot");
      if (idx === 0) dot.classList.add("active");
      dot.addEventListener("click", () => goToSlide(idx));
      dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll(".indicator-dot");

    function updateCarousel() {
      slides.forEach((slide, idx) => {
        slide.classList.toggle("active", idx === currentSlide);
      });
      dots.forEach((dot, idx) => {
        dot.classList.toggle("active", idx === currentSlide);
      });
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      updateCarousel();
    }

    function prevSlide() {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      updateCarousel();
    }

    function goToSlide(idx) {
      currentSlide = idx;
      updateCarousel();
    }

    if (nextBtn) nextBtn.addEventListener("click", nextSlide);
    if (prevBtn) prevBtn.addEventListener("click", prevSlide);

    // Optional: Auto slide every 5 seconds
    setInterval(nextSlide, 5000);
  }

  // Lead Form Handling
  const leadForm = document.getElementById("leadForm");
  if (leadForm) {
    leadForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Dhanyawaad! Shree Gateemaan Builders ki team aapse jald hi sampark karegi.");
      leadForm.reset();
    });
  }
});