document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.querySelector(".logos_wrapper");
  const track = document.querySelector(".logos_track");

  // Clone les items (pas tout le innerHTML pour éviter les doublons de doublons)
  const items = Array.from(track.children);
  items.forEach((item) => track.appendChild(item.cloneNode(true)));

  // Hauteur d'un seul set (avant duplication)
  let singleHeight = 0;
  items.forEach((item) => {
    singleHeight +=
      item.offsetHeight + parseFloat(getComputedStyle(track).gap || 0);
  });

  let currentY = 0;
  let velocity = 0;
  let direction = 1;
  const baseSpeed = 1;

  lenis.on("scroll", ({ velocity: v }) => {
    velocity = v;
  });

  gsap.ticker.add(() => {
    const speed = baseSpeed + Math.abs(velocity) * 0.25;

    if (velocity > 0.1) direction = 1;
    else if (velocity < -0.1) direction = -1;

    currentY += speed * direction;

    // Reset propre : modulo sur la hauteur exacte d'un set
    currentY = ((currentY % singleHeight) + singleHeight) % singleHeight;

    gsap.set(track, { y: -currentY });
  });
});
