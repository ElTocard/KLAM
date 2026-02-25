// PAGE TRANSITION
document.head.insertAdjacentHTML(
  "beforeend",
  "<style>.page-transition{position:fixed;top:0;left:0;width:100%;height:100%;background:#F9F8EE;z-index:9999;pointer-events:none}</style>"
);

const overlay = document.createElement("div");
overlay.classList.add("page-transition");
document.body.appendChild(overlay);

// Fade in on page load
gsap.to(overlay, {
  autoAlpha: 0,
  duration: 0.5,
  ease: "power2.out",
});

// Fade out on link click
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

  gsap.to(overlay, {
    autoAlpha: 1,
    duration: 0.5,
    ease: "power2.in",
    onComplete: () => (window.location = href),
  });
});

// Handle back/forward navigation
window.addEventListener("pageshow", (e) => {
  if (e.persisted) {
    gsap.to(overlay, {
      autoAlpha: 0,
      duration: 0.5,
      ease: "power2.out",
    });
  }
});
