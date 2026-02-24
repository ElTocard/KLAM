document.addEventListener("DOMContentLoaded", function () {
  var splideTestimonials = new Splide(".splide-testimonials", {
    rewind: true,
    type: "fade",
  });

  splideTestimonials.mount();

  var splidSpaces = new Splide(".splide-spaces", {
    rewind: true,
    mediaQuery: "min",
    padding: { right: "4rem" },
    arrows: false,
    pagination: false,
    breakpoints: {
      991: {
        destroy: true,
      },

      767: {
        perPage: 1,
      },
    },
  });
  splidSpaces.mount();
});
