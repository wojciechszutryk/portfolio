const swiper = new Swiper(".swiper-container", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 50,
    stretch: 50,
    depth: 100,
    modifier: 1,
    slideShadows: false,
  },
  pagination: {
    el: ".swiper-pagination",
  },
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
});
