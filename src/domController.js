function changeBackgroundStyle(property, value) {
  const elems = document.querySelectorAll('.wallpaper');
  for (const e of elems) {
    e.style[property] = value;
  }
}

export function updateFill(value) {
  switch (value) {
    case 'cover':
      changeBackgroundStyle('backgroundSize', 'cover');
      break;
    case 'fit':
      changeBackgroundStyle('backgroundSize', 'contain');
      break;
    default:
    //
  }
}

export function updateTile(value) {
  changeBackgroundStyle('backgroundRepeat', value ? 'repeat' : 'no-repeat');
}

// param value in format "r g b"
export function updateBackgroundColor(value) {
  const rgb = value.split(' ').map((value) => value * 255);
  changeBackgroundStyle('backgroundColor', `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`);
}

export function changeImage(image) {
  const afterElem = document.querySelector('#after');
  const beforeElem = document.querySelector('#before');

  beforeElem.style.backgroundImage = afterElem.style.backgroundImage;

  const preloadImage = document.createElement('img');
  preloadImage.onload = () => {
    const clone = afterElem.cloneNode();
    clone.style.backgroundImage = `url(${image})`;
    clone.style.animationPlayState = 'running';
    clone.classList.add('fade-in');
    afterElem.parentNode.replaceChild(clone, afterElem);
  }
  preloadImage.src = image;
}

export function showNotification(error, persist = false) {
  const debugElem = document.querySelector('.debug');
  const logElem = document.createElement('p');
  logElem.innerText = error;
  debugElem.appendChild(logElem);
  if (!persist) {
    setTimeout(() => {
      debugElem.innerHTML = '';
    }, 5000);
  }
}
