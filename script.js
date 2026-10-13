document.addEventListener("DOMContentLoaded", () => {
  // Mobile Hamburger Toggle
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });
  }

  // Active Nav Link
  const currentPath = window.location.pathname.split("/").pop();
  document.querySelectorAll(".nav-links a").forEach(link => {
    if (link.getAttribute("href") === currentPath || (currentPath === "" && link.getAttribute("href") === "index.html")) {
      link.classList.add("active");
    }
  });

  // ========================================================
  // REUSABLE CAROUSEL INITIALIZER (For Any Slider on Page)
  // ========================================================
  function initCarousel(containerSelector, slideSelector, prevBtnSelector, nextBtnSelector, dotsContainerSelector) {
    const containers = document.querySelectorAll(containerSelector);

    containers.forEach((container) => {
      const slides = container.querySelectorAll(slideSelector);
      const prevBtn = container.querySelector(prevBtnSelector);
      const nextBtn = container.querySelector(nextBtnSelector);
      const dotsBox = container.querySelector(dotsContainerSelector);

      if (slides.length <= 1) {
        if (prevBtn) prevBtn.style.display = "none";
        if (nextBtn) nextBtn.style.display = "none";
        return;
      }

      let currentIndex = 0;

      // Generate dots automatically
      if (dotsBox) {
        dotsBox.innerHTML = "";
        slides.forEach((_, i) => {
          const dot = document.createElement("span");
          dot.classList.add(containerSelector === ".carousel-container" ? "indicator-dot" : "card-dot");
          if (i === 0) dot.classList.add("active");
          dot.addEventListener("click", (e) => {
            e.stopPropagation();
            goToSlide(i);
          });
          dotsBox.appendChild(dot);
        });
      }

      const dots = dotsBox ? dotsBox.children : [];

      function updateSlide() {
        slides.forEach((slide, idx) => {
          slide.classList.toggle("active", idx === currentIndex);
        });
        if (dots.length > 0) {
          Array.from(dots).forEach((dot, idx) => {
            dot.classList.toggle("active", idx === currentIndex);
          });
        }
      }

      function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlide();
      }

      function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlide();
      }

      function goToSlide(idx) {
        currentIndex = idx;
        updateSlide();
      }

      if (nextBtn) {
        nextBtn.addEventListener("click", (e) => {
          e.preventDefault();
          nextSlide();
        });
      }

      if (prevBtn) {
        prevBtn.addEventListener("click", (e) => {
          e.preventDefault();
          prevSlide();
        });
      }
    });
  }

  // Initialize Top Flagship Showcase Carousel
  initCarousel(".carousel-container", ".carousel-slide", "#prevSlide", "#nextSlide", "#carouselDots");

  // Initialize All Card Carousels in Grid (Runs on all cards automatically)
  initCarousel(".card-carousel", ".card-slide", ".card-carousel-btn.prev", ".card-carousel-btn.next", ".card-indicators");

  // Lead Form
  const leadForm = document.getElementById("leadForm");
  if (leadForm) {
    leadForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Dhanyawaad! Shree Gateemaan Builders ki team aapse jald hi sampark karegi.");
      leadForm.reset();
    });
  }
});