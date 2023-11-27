var swiper = new Swiper(".mySwiper", {
  spaceBetween: 30,
  centeredSlides: true,
  effect:'fade',
  slidesPerView: 4,
  freeMode: true,
  watchSlidesProgress: true,
  keyboard: {
      enabled: true,
    },
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
}
);

let $slides = document.querySelectorAll('.swiper-slide');
for (let i of $slides) {
  i.addEventListener('mouseover', function(){
    swiper.autoplay.stop();
  });
  i.addEventListener('mouseout', function(){
    swiper.autoplay.start();
  });
}