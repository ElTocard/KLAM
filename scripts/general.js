document.addEventListener("DOMContentLoaded", () => {
  // COPYRIGHT
  document.querySelector(".footer_credit-year").textContent =
    new Date().getFullYear();

  // BUTTON
  document.querySelectorAll(".button").forEach((btn) => {
    const chars = btn.textContent
      .trim()
      .split("")
      .map(
        (char) =>
          `<span class="char" style="display:inline-block;">${
            char === " " ? "&nbsp;" : char
          }</span>`
      )
      .join("");

    btn.innerHTML = `
        <div class="button_text" style="overflow:hidden; display:inline-flex; position:relative;">
          <div class="layer-top">${chars}</div>
          <div class="layer-bottom" style="position:absolute; top:0; left:0;">${chars}</div>
        </div>`;
  });

  gsap.utils.toArray(".button").forEach((btn) => {
    const top = btn.querySelectorAll(".layer-top .char");
    const bottom = btn.querySelectorAll(".layer-bottom .char");
    const stagger = Math.min(0.025, 0.4 / top.length);

    gsap.set(bottom, { y: "110%" });

    btn.addEventListener("mouseenter", () => {
      gsap.killTweensOf([top, bottom]);
      gsap
        .timeline()
        .to(
          top,
          { y: "-110%", stagger, duration: 0.4, ease: "power3.inOut" },
          0
        )
        .to(
          bottom,
          { y: "0%", stagger, duration: 0.4, ease: "power3.inOut" },
          0
        );
    });

    btn.addEventListener("mouseleave", () => {
      gsap.killTweensOf([top, bottom]);
      gsap
        .timeline()
        .to(
          bottom,
          { y: "110%", stagger, duration: 0.4, ease: "power3.inOut" },
          0
        )
        .to(top, { y: "0%", stagger, duration: 0.4, ease: "power3.inOut" }, 0);
    });
  });
});

// DATA REVEAL
window.addEventListener("load", () => {
  gsap.utils.toArray("[data-reveal]").forEach((el) => {
    const delay = parseFloat(el.dataset.revealDelay) || 0;
    const split = new SplitText(el, { type: "words", mask: "words" });

    split.words.forEach((word) => {
      word.parentElement.style.overflow = "clip";
      word.parentElement.style.overflowClipMargin = "0.15em";
    });

    gsap.from(split.words, {
      yPercent: 110,
      opacitty: 0,
      duration: 0.8,
      delay,
      stagger: 0.06,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
        once: true,
      },
    });
  });
});

// DATA SPEED
window.addEventListener("load", () => {
  gsap.utils.toArray("[data-speed]").forEach((el) => {
    new SplitText(el, {
      type: "lines, words",
      linesClass: "line",
      wordsClass: "word",
    });

    const speed = parseFloat(el.dataset.speed) || 1;

    gsap.to(el, {
      yPercent: (1 - speed) * 50,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });
  });

  let refreshTimeout;
  document.querySelectorAll("img").forEach((img) => {
    if (!img.complete) {
      img.addEventListener("load", () => {
        clearTimeout(refreshTimeout);
        refreshTimeout = setTimeout(() => ScrollTrigger.refresh(), 200);
      });
    }
  });
});
