// state
var timeout;

window.wallpaperPropertyListener = {
  applyUserProperties: properties => {
    if (properties.subreddit_or_user) {
      updateSubreddit(properties.subreddit_or_user.value);
    }
    if (properties.fill) {
      updateFill(properties.fill.value);
    }
    if (properties.tile) {
      changeBackgroundStyle('backgroundRepeat', properties.tile.value ? 'repeat' : 'no-repeat');
    }
    if (properties.background_color) {
      const rgb = properties.background_color.value.split(' ').map(value => value * 255);
      changeBackgroundStyle('backgroundColor', `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`);
    }
    if (properties.change_picture_every) {
      // value in seconds
    }
  },
  setPaused: pauseStatus => {
    if (!pauseStatus) { // unpaused
      console.log('came back from being suspended');
    }
  }
}

function changeBackgroundStyle(property, value) {
  const elems = document.querySelectorAll('.wallpaper');
  for (const e of elems) {
    e.style[property] = value;
  }
}

function updateFill(fill) {
  switch (fill) {
    case 'smart':
      // if portrait contain
      // if landscape cover
      break;
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

const updateSubreddit = debounce(async (sub) => {
  startSlideshow(await getImages(sub));
}, 5000);


async function getImages(sub) {
  let images = [];
  const data = await get(`https://www.reddit.com/${sub}.json`);
  console.log(data.data.children.length);
  for (let listing of data.data.children) {
    const { post_hint, url } = listing.data;
    switch (post_hint) {
      case 'image':
        images.push(url);
        break;
      default:
      //
    }
  }
  return images;
}

function changeImage(after) {
  console.log(after);
  const afterElem = document.querySelector('#after');
  const beforeElem = document.querySelector('#before');

  beforeElem.style.backgroundImage = afterElem.style.backgroundImage;

  const preloadImage = document.createElement('img');
  preloadImage.onload = () => {
    const clone = afterElem.cloneNode();
    clone.style.backgroundImage = `url(${after})`;
    clone.classList.add('fade-in');
    afterElem.parentNode.replaceChild(clone, afterElem);
  }
  preloadImage.src = after;
}

function startSlideshow(images) {
  console.log('clearing timeout and starting new slideshow');
  clearTimeout(timeout);
  const loop = (index) => {
    changeImage(images[index]);
    timeout = setTimeout(() => loop(index + 1), 1000 * 10);
  }
  loop(0);
}

// utils
function debounce(callback, wait) {
  let timeout;
  return (...args) => {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => callback.apply(context, args), wait);
  };
}

// wrapper for fetch to retry 10 times with incrementing delays
async function get(api, n = 10, wait = 1000) {
  try {
    const response = await fetch(api);
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  } catch (e) {
    if (n === 1) {
      throw new Error(`Failed to GET from ${api}`);
    }
    setTimeout(async () => {
      return await get(api, n - 1, wait * 2);
    }, wait)
  }
}
//end utils
