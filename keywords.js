document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger); // ← ajout

  const originalItems = gsap.utils.toArray(".keyword_item");
  const images = gsap.utils.toArray(".keyword_image");
  const totalItems = originalItems.length;
  const container = document.querySelector(".keywords_content");

  const spacing = window.innerHeight * 0.12; // ← fix
  const curve = 10;
  const rotateAmount = 6;

  const allItems = [];

  for (let c = totalItems - 1; c >= 0; c--) {
    const clone = originalItems[c].cloneNode(true);
    clone.classList.add("keyword_clone");
    container.appendChild(clone);
    allItems.push({ el: clone, offset: c - totalItems });
  }

  originalItems.forEach((item, i) => {
    allItems.push({ el: item, offset: i });
  });

  originalItems.forEach((item, i) => {
    const clone = item.cloneNode(true);
    clone.classList.add("keyword_clone");
    container.appendChild(clone);
    allItems.push({ el: clone, offset: i + totalItems });
  });

  let prevActiveImage = 0;

  function updateWheel(progress) {
    const currentIndex = progress * (totalItems - 1);
    const activeImage = Math.round(currentIndex);

    // Texte
    allItems.forEach(({ el, offset }) => {
      const distance = offset - currentIndex;
      const absD = Math.abs(distance);

      const y = distance * spacing;
      const x = -(distance * distance * curve);
      const rotation = distance * rotateAmount;
      const opacity = absD < 0.5 ? 1 : Math.max(0.15, 0.4 - absD * 0.1);

      gsap.set(el, {
        x: x,
        yPercent: -50,
        y: y,
        rotation: rotation,
        opacity: opacity,
      });
    });

    // Images : synchro avec le texte actif
    if (activeImage !== prevActiveImage) {
      if (images[prevActiveImage]) {
        gsap.to(images[prevActiveImage], { opacity: 0, duration: 0.3 });
      }
      if (images[activeImage]) {
        gsap.to(images[activeImage], { opacity: 1, duration: 0.3 });
      }
      prevActiveImage = activeImage;
    }
  }

  // État initial
  if (images[0]) gsap.set(images[0], { opacity: 1 });
  updateWheel(0);

  // Timeline vide juste pour le pin + scrub
  gsap.timeline({
    scrollTrigger: {
      trigger: ".keywords_section",
      start: "center center",
      end: () => "+=" + totalItems * window.innerHeight * 0.5,
      pin: true,
      scrub: 1,
      onUpdate: (self) => {
        updateWheel(self.progress);
      },
    },
  });
});