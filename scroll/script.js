const swiper = new Swiper('.swiper', {
  slidesPerView: 'auto',
  spaceBetween: 10,
});

// let eventTrigger2 = false;

function tabCenter(target) {
  var tabSwiper = $('.swiper'),
    tabWrapper = target.closest('.swiper-wrapper'),
    tabItem = tabWrapper.find('.swiper-slide'),
    tabSwiperWidth = tabSwiper.width(),
    targetPos = target.position(),
    tabSwiperHarf = tabSwiper.width() / 2;
  var pos;
  var listWidth = 0;

  tabItem.each(function () {
    listWidth += $(this).outerWidth() + 12;
  }); // swiper-slide들의 총 길이

  var selectTargetPos = targetPos.left + target.outerWidth() / 2; // target 위치

  if (eventTrigger2) return;
  if (selectTargetPos <= tabSwiperHarf) {
    pos = 0;
  } else if ((listWidth - selectTargetPos) <= tabSwiperHarf) {
    pos = listWidth - tabSwiper.width();
  } else {
    pos = selectTargetPos - tabSwiperHarf;
  }
  if (listWidth > tabSwiperWidth) {
    setTimeout(function () {
      tabWrapper.css({
        'transform': 'translate3d(' + (pos * -1) + 'px, 0, 0)',
        'transition-duration': '450ms'
      })
    }, 0);
  }
}

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

let sum = 0;
slides.forEach(e => sum += e.offsetWidth);

const slideMargin = parseInt(document.querySelector('.swiper-slide').style.marginRight);
const slidesWidth = sum + (slideMargin * (slides.length - 1));


const swiperWidth = document.querySelector('.swiper').offsetWidth;
const swiperWidthHalf = swiperWidth / 2;


const handleCenter = (targetSlide) => {
  const targetSlidePos = targetSlide.offsetLeft + (targetSlide.offsetWidth / 2);
  let xPos = 0;

  if (targetSlidePos <= swiperWidthHalf) {
    // 앞쪽에 위치하고 있어서 앞에 붙음
    xPos = 0;
  } else if ((slidesWidth - targetSlidePos) <= swiperWidthHalf) {
    // 뒤쪽에 위치하고 있어서 뒤에 붙음
    xPos = -(slidesWidth - swiperWidth);
    // wrapper.style.transform = `translate3d(${-(slidesWidth - swiperWidth)}px, 0px, 0px)`;
  } else {
    // 이동함
    xPos = -(targetSlidePos - swiperWidthHalf);
    // wrapper.style.transform = `translate3d(${-(targetSlidePos - swiperWidthHalf)}px, 0px, 0px)`;
  }

  if (slidesWidth > swiperWidth) {
    wrapper.style.transform = `translate3d(${xPos}px, 0px, 0px)`;
  }
}




// let isPending = false;

const menuClick = () => {
  wrapper.addEventListener('click', e => {
    const targetSlide = e.target.closest('.swiper-slide');

    // isPending = true;

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

    // setTimeout(() => {
    //   isPending = false;
    // }, 1000);
  });
};

const contentScroll = () => {
  window.addEventListener('scroll', () => {

    // if (isPending === true) return;

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

menuClick();
contentScroll();