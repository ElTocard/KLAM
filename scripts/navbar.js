document.addEventListener("DOMContentLoaded", () => {
  const isHome =
    window.location.pathname === "/";

  gsap.from(".navbar_container", {
    maxWidth: window.innerWidth + "px",
    paddingLeft: "0",
    ...(isHome && { color: "#F9F8EE" }),
    border: "0px",
    backgroundColor: "transparent",
    backdropFilter: "blur(0px)",
    duration: 0.4,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "body",
      start: "top top",
      end: "400px top",
      scrub: true,
    },
  });
});
