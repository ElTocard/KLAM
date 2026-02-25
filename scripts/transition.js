// PAGE TRANSITION — overlay visible immédiatement via CSS
document.head.insertAdjacentHTML(
  "beforeend",
  `<style>
    .page-transition {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #F9F8EE;
      z-index: 9999;
      pointer-events: none;
    }
  </style>`
);

// Créer l'overlay sur <html> (disponible immédiatement, pas besoin d'attendre body)
const overlay = document.createElement("div");
overlay.classList.add("page-transition");
document.documentElement.appendChild(overlay);

window.addEventListener("load", () => {
  // Fade out overlay une fois la page complètement chargée
  gsap.to(overlay, {
    opacity: 0,
    duration: 0.5,
    ease: "power2.out",
    onComplete: () => (overlay.style.visibility = "hidden"),
  });

  // Fade in overlay au clic sur un lien interne
  document.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (
      !link ||
      link.hostname !== window.location.hostname ||
      link.getAttribute("href").startsWith("#") ||
      link.target === "_blank"
    )
      return;

    e.preventDefault();
    const href = link.href;

    overlay.style.visibility = "visible";
    gsap.to(overlay, {
      opacity: 1,
      duration: 0.5,
      ease: "power2.in",
      onComplete: () => (window.location = href),
    });
  });

  // Back/forward
  window.addEventListener("pageshow", (e) => {
    if (e.persisted) {
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => (overlay.style.visibility = "hidden"),
      });
    }
  });
});
