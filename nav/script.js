const nav = document.querySelector('.nav');
const links = document.querySelectorAll('.nav-link');
const container = document.querySelector('.nav-content-container');
const content = container.querySelector('.nav-content');
const contentItems = content.querySelectorAll('.nav-content-item');
const caret = container.querySelector('.nav-caret');
let debounceClose = false;

container.style.top = `${document.querySelector('.nav-links').offsetHeight}px`;


document.querySelector('.nav-links').addEventListener('mouseover', event => {
  clearTimeout(debounceClose);

  container.classList.add('show');
  setTimeout(() => container.classList.add('open'), 50);

  [...links].map((e, index) => {
    if (event.target.parentNode === links[index]) {
      [...contentItems].map((e, i) => {
        e.classList.remove('active');
        if (index === i) {
          content.style.width = `${contentItems[i].offsetWidth}px`;
          content.style.height = `${contentItems[i].offsetHeight}px`;
          let sum = 0;
          for (let j = 0; j < index; j++) sum += links[j].offsetWidth;
          caret.style.transform = `translateX(${sum + (links[i].offsetWidth) / 2}px)`;
          content.style.transform = `translateX(${sum - (contentItems[i].offsetWidth - links[i].offsetWidth) / 2}px)`;
        }
      });
      contentItems[index].classList.add('active');
    }
  })
  setTimeout(() => {
    caret.classList.add('is-visible');
    content.classList.add('is-visible');
  }, 300);
})

document.querySelector('.nav').addEventListener('mouseleave', () => {
  debounceClose = setTimeout(() => {
    caret.classList.remove('is-visible');
    content.classList.remove('is-visible');
    container.classList.remove('open');
    setTimeout(() => container.classList.remove('show'), 300);
  }, 1000);
})