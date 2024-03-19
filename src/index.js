import './styles/main.css';
import './styles/reset-css.css';
import renderImage, {
  renderIndicators,
  advanceIndex,
  regressIndex,
  fillIndicator,
} from './renderDom';
import turkishAngora from './assets/turkish-angora.jpg';
import scottishFold from './assets/scottish-fold.jpg';
import norwegianForestCat from './assets/norwegian-forest-cat.jpg';
import maineCoon from './assets/maine-coon.jpg';
import bengal from './assets/bengal.jpg';

class ImageSlider {
  constructor(imageArray) {
    this.imageArray = imageArray;
    this.count = imageArray.length;
  }

  cycleForwards() {
    const removedIndex = this.imageArray.shift();
    this.imageArray.push(removedIndex);
  }

  cycleBackwards() {
    const removedIndex = this.imageArray.pop();
    this.imageArray.unshift(removedIndex);
  }
}

const catImageSlider = new ImageSlider([
  turkishAngora,
  scottishFold,
  norwegianForestCat,
  maineCoon,
  bengal,
]);

let forwardLoop;

function advanceSlider() {
  catImageSlider.cycleForwards();
  renderImage(catImageSlider);
  advanceIndex(catImageSlider);
  fillIndicator();
  forwardLoop = setTimeout(advanceSlider, 5000);
}

function regressSlider() {
  catImageSlider.cycleBackwards();
  renderImage(catImageSlider);
  regressIndex(catImageSlider);
  fillIndicator();
  forwardLoop = setTimeout(advanceSlider, 5000);
}

document.querySelector('#forwards-button').addEventListener('click', () => {
  clearTimeout(forwardLoop);
  advanceSlider();
});

document.querySelector('#back-button').addEventListener('click', () => {
  clearTimeout(forwardLoop);
  regressSlider();
});

renderImage(catImageSlider);
renderIndicators(catImageSlider);
fillIndicator();
setTimeout(advanceSlider, 5000);
