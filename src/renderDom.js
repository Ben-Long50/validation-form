/* eslint-disable no-plusplus */
const imgContainer = document.querySelector('#image-container');
const indicatorContainer = document.querySelector('#indicator-container');
let index = 0;

export default function renderImage(slider) {
  if (imgContainer.firstChild) {
    imgContainer.removeChild(imgContainer.firstChild);
  }
  const imgElement = document.createElement('img');
  const imgUrl = slider.imageArray[0];
  imgElement.src = imgUrl;
  imgElement.classList.add('active-img');
  imgContainer.appendChild(imgElement);
}

function createIndicator() {
  const svgCircle = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'svg',
  );
  svgCircle.setAttribute('height', '30');
  svgCircle.setAttribute('width', '30');
  const circle = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'circle',
  );
  circle.setAttribute('cx', '50%');
  circle.setAttribute('cy', '50%');
  circle.setAttribute('r', '5');
  circle.setAttribute('stroke', 'black');
  circle.setAttribute('stroke-width', '2');
  circle.setAttribute('fill', 'none');

  svgCircle.appendChild(circle);

  return svgCircle;
}

export function renderIndicators(slider) {
  const { count } = slider;
  for (let i = 1; i <= count; i++) {
    const indicator = createIndicator();
    indicatorContainer.appendChild(indicator);
  }
}

export function advanceIndex(slider) {
  const { count } = slider;
  if (index === count - 1) {
    index = 0;
    return index;
  }
  return index++;
}

export function regressIndex(slider) {
  const { count } = slider;
  if (index === 0) {
    index = count - 1;
    return index;
  }
  return index--;
}

export function fillIndicator() {
  const indicatorElements = document.querySelectorAll('circle');
  const indicatorArray = Array.from(indicatorElements);
  indicatorArray.forEach((element) => {
    element.setAttribute('fill', 'none');
  });
  indicatorArray.forEach((element) => {
    const i = indicatorArray.indexOf(element);
    if (i === index) {
      element.setAttribute('fill', 'black');
    }
  });
}
