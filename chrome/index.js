const stage1 = document.querySelector('.stage-1');
const stage2 = document.querySelector('.stage-2');
const nextButton = stage1.querySelector('.next');
nextButton.addEventListener('click', () => {
  stage1.classList.add('animation');
  setTimeout(() => {
    stage1.classList.add('none');
    stage2.classList.remove('animation');
    stage2.classList.remove('none');
    setTimeout(() => {
      stage2.classList.add('animation');
    }, 10);
  }, 1000);
})
