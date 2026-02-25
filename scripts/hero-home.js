// HERO HOME — Logo letters reveal
window.addEventListener("load", () => {
  const paths = document.querySelectorAll(".hero_logo path");
  if (!paths.length) return;

  gsap.from(paths, {
    yPercent: 120,
    duration: 0.8,
    stagger: 0.1,
    ease: "power3.out",
    delay: 0.3,
  });
});
