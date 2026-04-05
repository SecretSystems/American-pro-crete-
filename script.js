/* =============================================
   AMERICAN PRO-CRETE LLC — script.js
   ============================================= */

(function () {
  "use strict";

  // ── NAV SCROLL EFFECT ──────────────────────────
  const nav = document.getElementById("nav");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 60) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  });

  // ── HAMBURGER MENU ─────────────────────────────
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    navLinks.classList.toggle("open");
  });

  // Close nav on link click (mobile)
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("open");
      navLinks.classList.remove("open");
    });
  });

  // ── SMOOTH SCROLL FOR ANCHOR LINKS ────────────
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        const offset = 72;
        const top =
          target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  });

  // ── SCROLL REVEAL ─────────────────────────────
  const revealEls = [];

  function addReveal(selector) {
    document.querySelectorAll(selector).forEach((el) => {
      el.classList.add("reveal");
      revealEls.push(el);
    });
  }

  addReveal(".service-card");
  addReveal(".gallery-item");
  addReveal(".why-point");
  addReveal(".trust-item");
  addReveal(".stat-badge");
  addReveal(".contact-detail-item");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  revealEls.forEach((el, i) => {
    el.style.transitionDelay = (i % 4) * 0.08 + "s";
    observer.observe(el);
  });

  // ── GALLERY FILTER ────────────────────────────
  const filterBtns = document.querySelectorAll(".filter-btn");
  const galleryItems = document.querySelectorAll(".gallery-item");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Update active button
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;

      galleryItems.forEach((item) => {
        const cat = item.dataset.category;
        if (filter === "all" || cat === filter) {
          item.style.opacity = "1";
          item.style.transform = "scale(1)";
          item.style.display = "";
        } else {
          item.style.opacity = "0.2";
          item.style.transform = "scale(0.97)";
        }
      });
    });
  });

  // ── CONTACT FORM ──────────────────────────────
  const form = document.getElementById("contact-form");
  const successMsg = document.getElementById("form-success");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Basic validation
      const name = form.querySelector("#name").value.trim();
      const phone = form.querySelector("#phone").value.trim();

      if (!name || !phone) {
        alert("Please fill in your name and phone number.");
        return;
      }

      // Simulate submission (replace with real backend/Formspree)
      const submitBtn = form.querySelector("button[type=submit]");
      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;

      setTimeout(() => {
        form.reset();
        submitBtn.textContent = "Send My Request";
        submitBtn.disabled = false;
        successMsg.classList.add("visible");
        setTimeout(() => successMsg.classList.remove("visible"), 6000);
      }, 1200);
    });
  }

  // ── PARALLAX HERO STRIPES (subtle) ────────────
  const stripes = document.querySelectorAll(".stripe");
  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    stripes.forEach((s, i) => {
      s.style.transform = `skewX(-8deg) translateY(${y * (0.05 + i * 0.02)}px)`;
    });
  });

  // ── ACTIVE NAV LINK ON SCROLL ─────────────────
  const sections = document.querySelectorAll("section[id]");
  const navLinksAll = document.querySelectorAll(".nav-links a");

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinksAll.forEach((a) => {
            a.style.color =
              a.getAttribute("href") === `#${id}`
                ? "var(--white)"
                : "rgba(255,255,255,0.7)";
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach((s) => sectionObserver.observe(s));
})();
