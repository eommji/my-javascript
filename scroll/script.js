//swiper
const swiper = new Swiper('.swiper', {
  slidesPerView: 'auto',
  spaceBetween: 10,
});

const wrapper = document.querySelector('.menus .swiper-wrapper');
const slides = wrapper.querySelectorAll('.swiper-slide');
const on_CN = 'on';
const content = document.querySelectorAll('.content');

// handleCenter
const handleCenter = (targetSlide) => {
  const targetSlidePos = targetSlide.offsetLeft + (targetSlide.offsetWidth / 2);
  const slideMargin = parseInt(document.querySelector('.swiper-slide').style.marginRight);
  const swiperWidth = document.querySelector('.swiper').offsetWidth;
  const swiperWidthHalf = swiperWidth / 2;
  let sum = 0;
  slides.forEach(e => sum += e.offsetWidth);
  const slidesWidth = sum + (slideMargin * (slides.length - 1));
  let xPos = 0;
  if (targetSlidePos <= swiperWidthHalf) { // 앞쪽에 위치하고 있어서 앞에 붙음
    xPos = 0;
  } else if ((slidesWidth - targetSlidePos) <= swiperWidthHalf) { // 뒤쪽에 위치하고 있어서 뒤에 붙음
    xPos = -(slidesWidth - swiperWidth);
  } else { // 이동함
    xPos = -(targetSlidePos - swiperWidthHalf);
  };
  if (slidesWidth > swiperWidth) {
    wrapper.style.transform = `translate3d(${xPos}px, 0px, 0px)`;
  };
};

// menuClick
const menuClick = () => {
  wrapper.addEventListener('click', e => {
    const targetSlide = e.target.closest('.swiper-slide');
    if (!targetSlide) return;
    handleCenter(targetSlide);
    slides.forEach(e => e.classList.remove(on_CN));
    targetSlide.classList.add(on_CN);
    const slideIndex = [...slides].indexOf(targetSlide);
    const contentTarget = [...content][slideIndex];
    const contentTargetOffsetTop = contentTarget.offsetTop;
    window.scrollTo({
      top: contentTargetOffsetTop + 1,
      behavior: 'smooth'
    });
  });
};

// contentScroll
const contentScroll = () => {
  const container = document.querySelector('.container');
  window.addEventListener('scroll', () => {
    const windowY = this.scrollY;
    const targetIndex = [...content].findIndex(e => {
      return windowY >= e.offsetTop && windowY <= e.offsetTop + e.offsetHeight;
    });
    [...slides].map(e => e.classList.remove(on_CN));
    if (targetIndex === -1) {
      if (windowY <= container.offsetTop) {
        slides[0].classList.add(on_CN);
        return;
      } else {
        slides[slides.length - 1].classList.add(on_CN);
        return;
      };
    };
    slides[targetIndex].classList.add(on_CN);
    handleCenter(slides[targetIndex]);
  });
};

menuClick();
contentScroll();