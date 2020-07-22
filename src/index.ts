import { WallpaperManager } from './wallpaperManager';
import { updateFill, updateBackgroundColor, updateTile } from './domController';
import { debounce } from './utils';

const wallpaperManager = WallpaperManager.getInstance();

declare global {
  interface Window {
    wallpaperPropertyListener: any;
  }
}

const updateSubreddit = debounce((subreddit: string) => {
  wallpaperManager.updateSubreddit(subreddit);
}, 5000);

window.wallpaperPropertyListener = {
  applyUserProperties: (properties: any) => {
    if (properties.subreddit_or_user) {
      updateSubreddit(properties.subreddit_or_user.value);
    }
    if (properties.fill) {
      updateFill(properties.fill.value);
    }
    if (properties.tile) {
      updateTile(properties.tile.value);
    }
    if (properties.background_color) {
      updateBackgroundColor(properties.background_color.value);
    }
    if (properties.change_picture_every) {
      wallpaperManager.setDelay(properties.change_picture_every.value);
    }
  },
  setPaused: (pauseStatus: any) => {
    wallpaperManager.pause(pauseStatus);
    //
  }
}

export { };
