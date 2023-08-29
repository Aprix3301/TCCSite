const cardContainers = document.querySelectorAll('.card-container');
const leftNav = document.querySelector('.nav.left');
const rightNav = document.querySelector('.nav.right');
let activeCardIndex = 0;

function showCard(index) {
  cardContainers.forEach((cardContainer, i) => {
    if (i === index) {
      cardContainer.style.transform = 'translateX(0)';
    } else if (i < index) {
      cardContainer.style.transform = 'translateX(-100%)';
    } else {
      cardContainer.style.transform = 'translateX(100%)';
    }
  });
}

function navigateLeft() {
  activeCardIndex = (activeCardIndex === 0) ? cardContainers.length - 1 : activeCardIndex - 1;
  showCard(activeCardIndex);
}

function navigateRight() {
  activeCardIndex = (activeCardIndex === cardContainers.length - 1) ? 0 : activeCardIndex + 1;
  showCard(activeCardIndex);
}

leftNav.addEventListener('click', navigateLeft);
rightNav.addEventListener('click', navigateRight);

showCard(activeCardIndex);
