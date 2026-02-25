// PAGE TRANSITION
document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.querySelector(".transition-overlay");
  if (!overlay) return;

  // Fade out on link click
  document.querySelectorAll('a[href^="/"]:not([href*="#"]):not([target="_blank"])').forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const href = link.getAttribute("href");

      gsap.to(overlay, {
        opacity: 1,
        duration: 0.5,
        ease: "power2.inOut",
        onComplete: () => (window.location.href = href),
      });
    });
  });

  // Fade in on page load
  window.addEventListener("load", () => {
    if (getComputedStyle(overlay).opacity !== "0") {
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.5,
        delay: 0.2,
        ease: "power2.inOut",
      });
    }
  });
});
