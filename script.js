/* ============================================
   JOBAR AGRO — JavaScript
   ============================================ */

(function () {
  "use strict";

  // ---- Header scroll ----
  const header = document.getElementById("header");
  let lastScroll = 0;

  function onScroll() {
    const y = window.scrollY;
    if (y > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
    lastScroll = y;
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // ---- Mobile menu ----
  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("mobileMenu");

  function closeMenu() {
    toggle.classList.remove("active");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menu");
    menu.classList.remove("active");
    document.body.style.overflow = "";
  }

  function openMenu() {
    toggle.classList.add("active");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Fechar menu");
    menu.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  toggle.addEventListener("click", function () {
    if (menu.classList.contains("active")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close menu on link click
  menu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  // Close menu on escape
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && menu.classList.contains("active")) {
      closeMenu();
      toggle.focus();
    }
  });

  // ---- FAQ accordion ----
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(function (item) {
    const btn = item.querySelector(".faq-question");

    btn.addEventListener("click", function () {
      const isActive = item.classList.contains("active");

      // Close all
      faqItems.forEach(function (other) {
        other.classList.remove("active");
        other.querySelector(".faq-question").setAttribute("aria-expanded", "false");
      });

      // Open clicked (if it was closed)
      if (!isActive) {
        item.classList.add("active");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });

  // ---- Scroll reveal (IntersectionObserver) ----
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            // Stagger based on data-index or sibling position
            const el = entry.target;
            const delay = el.dataset.delay || 0;
            setTimeout(function () {
              el.classList.add("visible");
            }, delay);
            observer.unobserve(el);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    document.querySelectorAll(".fade-up").forEach(function (el, i) {
      // Calculate stagger delay for siblings
      const parent = el.parentElement;
      const siblings = parent.querySelectorAll(".fade-up");
      let siblingIndex = 0;
      siblings.forEach(function (s, idx) {
        if (s === el) siblingIndex = idx;
      });

      // Only apply stagger if multiple siblings
      if (siblings.length > 1 && !el.dataset.delay) {
        el.dataset.delay = siblingIndex * 80;
      }

      observer.observe(el);
    });
  } else {
    // Fallback: show everything immediately
    document.querySelectorAll(".fade-up").forEach(function (el) {
      el.classList.add("visible");
    });
  }
})();
