const tabs = () => {
  const tablistArr = document.querySelectorAll('.tab-list');
  tablistArr.forEach(tablist => {
    const index = [...tablist.children].indexOf(tablist.querySelector('li.active'));
    const liArr = tablist.querySelectorAll('li');
    tablist.closest('.tabs').querySelector('.tab-content').children[index].classList.add('active');
    tablist.addEventListener('click', event => {
      if (event.target.tagName !== 'A') return;
      event.preventDefault();
      const targetLi = event.target.closest('li');
      const targetLiIndex = [...event.target.closest('ul').children].indexOf(targetLi);
      const tabPanelArr = event.target.closest('.tabs').querySelector('.tab-content').children;
      liArr.forEach(li => li.classList.remove('active'));
      targetLi.classList.add('active');
      [...tabPanelArr].forEach(tabPanel => tabPanel.classList.remove('active'));
      tabPanelArr[targetLiIndex].classList.add('active');
    })
  })
}
if (document.querySelector('.tabs')) tabs();