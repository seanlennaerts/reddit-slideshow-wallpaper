import { Wallpaper } from './wallpaper';
import { RedditAPI } from './redditAPI';
import { changeImage } from './domController';
import { mod } from './utils';

class WallpaperManager {
  private static instance: WallpaperManager;
  private redditAPI: RedditAPI;
  private wallpapers: Wallpaper[];
  private timeout: number;
  private delay: number; // in seconds
  private index: number = 0;

  private constructor() { }

  static getInstance(): WallpaperManager {
    if (!WallpaperManager.instance) {
      WallpaperManager.instance = new WallpaperManager();
    }

    return WallpaperManager.instance;
  }

  async updateSubreddit(subreddit: string) {
    if (this.redditAPI) {
      this.redditAPI.cancel();
    }
    this.redditAPI = new RedditAPI(subreddit);
    this.wallpapers = await this.redditAPI.getImages();
    this.index = 0;
    this.startSlideshow();
  }

  private startSlideshow() {
    if (this.wallpapers) {
      clearTimeout(this.timeout);
      const loop = () => {
        console.log(`showing ${this.index + 1} of ${this.wallpapers.length}`);
        changeImage(this.wallpapers[this.index].url);
        this.timeout = setTimeout(() => loop(), 1000 * this.delay);
        this.index = mod(this.index + 1, this.wallpapers.length);
      }
      loop();
    }
  }

  public setDelay(delay: number) {
    this.delay = delay;
    this.startSlideshow();
  }
}

export { WallpaperManager };