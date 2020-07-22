import { WallpaperManager } from './wallpaperManager';
import { debounce } from './utils';

const wallpaperManager = WallpaperManager.getInstance();

declare global {
  interface Window {
    wallpaperPropertyListener: any;
  }
}
window.wallpaperPropertyListener = {
  applyUserProperties: (properties: any) => {
    if (properties.subreddit_or_user) {
      (debounce((subreddit: string) => {
        wallpaperManager.updateSubreddit(subreddit);
      }, 5000))(properties.subreddit_or_user.value);
    }
    if (properties.fill) {
      // updateFill(properties.fill.value);
    }
    if (properties.tile) {
      // changeBackgroundStyle('backgroundRepeat', properties.tile.value ? 'repeat' : 'no-repeat');
    }
    if (properties.background_color) {
      const rgb: number[] = properties.background_color.value.split(' ').map((value: number) => value * 255);
      // changeBackgroundStyle('backgroundColor', `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`);
    }
    if (properties.change_picture_every) {
      // value in seconds
    }
  },
  setPaused: (pauseStatus: any) => {
    if (!pauseStatus) { // unpaused
      console.log('came back from being suspended');
    }
  }
}

export { };
