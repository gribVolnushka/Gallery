const mainImage = document.querySelector('.big-image');
const imgGallery = document.querySelectorAll('.thumb');
const wrapperElement = document.querySelector('.container');
const prevButton = document.querySelector('.btn-prev');
const nextButton = document.querySelector('.btn-next');

function centerImage() {
  const widthWrapper = wrapperElement.clientWidth;
  const imageWidth = mainImage.clientWidth;
  const imageHeight = mainImage.clientHeight;

  if (imageWidth > 0) {
    mainImage.style.left = `${(widthWrapper - imageWidth) / 2}px`;
    prevButton.style.left = `${(widthWrapper - imageWidth) / 2 - 60}px`;
    nextButton.style.right = `${(widthWrapper - imageWidth) / 2 - 60}px`;
    prevButton.style.top = `${imageHeight / 2}px`;
    nextButton.style.top = `${imageHeight / 2}px`;
  }
}

let currentIndex = 0;

function showImage(index) {

  if (index < 0) {
    index = imgGallery.length - 1;
  } else if (index > imgGallery.length - 1) {
    index = 0;
  }

  currentIndex = index;

  mainImage.style.opacity = '0';

  setTimeout(() => {
    mainImage.src = imgGallery[currentIndex].src;

    mainImage.onload = () => {
      centerImage();
      mainImage.classList.add('main');
      mainImage.style.opacity = '1';
    }
  }, 300);

}

imgGallery.forEach((img,index) => {
  img.addEventListener('click', function () {
    showImage(index);
    prevButton.style.opacity = '0';
    nextButton.style.opacity = '0';
    setTimeout(() => {
      prevButton.style.opacity = '1';
      nextButton.style.opacity = '1';
      prevButton.style.display = 'inline-block';
      nextButton.style.display = 'inline-block';
    },400);
  })
})

prevButton.addEventListener('click', () => showImage(currentIndex - 1));
nextButton.addEventListener('click', () => showImage(currentIndex + 1));

mainImage.onclick = function () {
  setTimeout(() => {
    mainImage.src = '';
    mainImage.style.opacity = '0';
    prevButton.style.display = 'none';
    nextButton.style.display = 'none';
  },300);
};
