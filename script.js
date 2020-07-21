var timeout;

window.wallpaperPropertyListener = {
  applyUserProperties: properties => {
    if (properties.subreddit_or_user) {
      updateSubreddit(properties.subreddit_or_user.value);
    }
    if (properties.fill) {

    }
    if (properties.background_color) {

    }
    if (properties.change_picture_every) {

    }
    if (properties.click_to_change_picture) {

    }
  },
  setPaused: pauseStatus => {
    if (!pauseStatus) { // unpaused
    }
  }
}

const updateSubreddit = debounce(async (sub) => {
  console.log(sub);
  clearTimeout(timeout);
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

// document.addEventListener('click', () => nextImage());

function changeImage(after) {
  console.log(after);
  const afterElem = document.querySelector('#after');
  const beforeElem = document.querySelector('#before');

  beforeElem.style.backgroundImage = afterElem.style.backgroundImage;

  let preloadImage = document.createElement('img');
  preloadImage.src = after;

  preloadImage.onload = () => {
    const clone = afterElem.cloneNode();
    clone.style.backgroundImage = `url(${after})`;
    clone.classList.add('fade-in');
    afterElem.parentNode.replaceChild(clone, afterElem);
    preloadImage = null;
  }
}

function startSlideshow(images) {
  const loop = (index = 0) => {
    changeImage(images[index]);
    timeout = setTimeout(() => loop(index + 1), 60 * 1000 * 1);
  }
  loop();
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