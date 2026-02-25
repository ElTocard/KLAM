document.addEventListener("DOMContentLoaded", () => {
  const splideEl = document.querySelector(".splide-testimonials");
  const cursor = document.querySelector(".splide__cursor");
  const leftPoly = cursor.querySelector(".cursor-left");
  const rightPoly = cursor.querySelector(".cursor-right");

  const leftLen = leftPoly.getTotalLength();
  const rightLen = rightPoly.getTotalLength();

  gsap.set(leftPoly, { strokeDasharray: leftLen, strokeDashoffset: leftLen });
  gsap.set(rightPoly, {
    strokeDasharray: rightLen,
    strokeDashoffset: rightLen,
  });

  let currentSide = null;
  let firstMove = true;

  splideEl.addEventListener("mouseleave", () => {
    gsap.to(cursor, { opacity: 0, duration: 0.3 });
    gsap.to(leftPoly, { strokeDashoffset: leftLen, duration: 0.3 });
    gsap.to(rightPoly, { strokeDashoffset: rightLen, duration: 0.3 });
    currentSide = null;
    firstMove = true;
  });

  splideEl.addEventListener("mousemove", (e) => {
    // Premier mouvement : positionne sans animation puis affiche
    if (firstMove) {
      gsap.set(cursor, { x: e.clientX, y: e.clientY, opacity: 0 });
      gsap.to(cursor, { opacity: 1, duration: 0.3 });
      firstMove = false;
    }

    gsap.to(cursor, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.6,
      ease: "power3.out",
      overwrite: "auto",
    });

    const rect = splideEl.getBoundingClientRect();
    const side = e.clientX - rect.left < rect.width / 2 ? "left" : "right";

    if (side === currentSide) return;
    currentSide = side;

    if (side === "left") {
      gsap.to(leftPoly, {
        strokeDashoffset: 0,
        duration: 0.4,
        ease: "power2.out",
      });
      gsap.to(rightPoly, { strokeDashoffset: rightLen, duration: 0.3 });
    } else {
      gsap.to(rightPoly, {
        strokeDashoffset: 0,
        duration: 0.4,
        ease: "power2.out",
      });
      gsap.to(leftPoly, { strokeDashoffset: leftLen, duration: 0.3 });
    }
  });
});
