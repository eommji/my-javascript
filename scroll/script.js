// const swiper = new Swiper('.swiper', {
//   slidesPerView: 'auto',
//   spaceBetween: 10,
// });

// let eventTrigger2 = false;

// function tabCenter(target) {
//   var tabSwiper = $('.swiper'),
//     tabWrapper = target.closest('.swiper-wrapper'),
//     tabItem = tabWrapper.find('.swiper-slide'),
//     tabSwiperWidth = tabSwiper.width(),
//     targetPos = target.position(),
//     tabSwiperHarf = tabSwiper.width() / 2;
//   var pos;
//   var listWidth = 0;
//   tabItem.each(function () {
//     listWidth += $(this).outerWidth() + 12;
//   });
//   var selectTargetPos = targetPos.left + target.outerWidth() / 2;
//   if (eventTrigger2) return;
//   if (selectTargetPos <= tabSwiperHarf) {
//     pos = 0;
//   } else if ((listWidth - selectTargetPos) <= tabSwiperHarf) {
//     pos = listWidth - tabSwiper.width();
//   } else {
//     pos = selectTargetPos - tabSwiperHarf;
//   }
//   if (listWidth > tabSwiperWidth) {
//     setTimeout(function () {
//       tabWrapper.css({
//         'transform': 'translate3d(' + (pos * -1) + 'px, 0, 0)',
//         'transition-duration': '450ms'
//       })
//     }, 0);
//   }
// }

// const $ctrlDiv = $(".content");
// let eventTrigger = false;

// $("button").on("click", (e) => {
//   console.debug("click");
//   eventTrigger = true;
//   e.preventDefault();
//   const $this = $(e.currentTarget);
//   const index = $this.closest('.swiper-slide').index();
//   console.log($this);
//   console.debug($ctrlDiv);
//   const $targetDiv = $ctrlDiv.eq(index);
//   console.debug($targetDiv);
//   const offsetTop = $targetDiv[0].offsetTop;
//   console.log(offsetTop);
//   window.scrollTo(0, offsetTop);

//   tabCenter($(".swiper-slide").eq(index))

//   $this.closest('.swiper-slide').siblings('.swiper-slide').removeClass('on');
//   $this.closest('.swiper-slide').addClass('on');

//   setTimeout(() => {
//     eventTrigger = false;
//   }, 100);
// });

const menus = document.querySelector('.menus');
const wrapper = menus.querySelector('.swiper-wrapper');
const slides = wrapper.querySelectorAll('.swiper-slide');
const on_CN = 'on';

const container = document.querySelector('.container');
const content = document.querySelectorAll('.content');

let pending

wrapper.addEventListener('click', e => {
  const targetSlide = e.target.closest('.swiper-slide');
  if (!targetSlide) return;
  slides.forEach(e => e.classList.remove(on_CN));
  targetSlide.classList.add(on_CN);

  const slideIndex = [...slides].indexOf(targetSlide);
  const contentTarget = [...content][slideIndex];
  const contentTargetOffsetTop = contentTarget.offsetTop;

  window.scrollTo({
    top: contentTargetOffsetTop,
    behavior: 'smooth'
  });
  console.dir();
});

const contentScroll = () => {
  window.addEventListener('scroll', () => {
    const windowY = this.scrollY;
    const targetIndex = [...document.querySelectorAll('.content')].findIndex(e => {
      return windowY >= e.offsetTop && windowY <= e.offsetTop + e.offsetHeight;
    });
    [...slides].map(e => e.classList.remove(on_CN));
    if (targetIndex === -1) {
      if (windowY <= document.querySelector('.container').offsetTop) {
        slides[0].classList.add(on_CN);
        return;
      } else {
        slides[slides.length - 1].classList.add(on_CN);
        return;
      };
    };
    slides[targetIndex].classList.add(on_CN);
  });
};

contentScroll();