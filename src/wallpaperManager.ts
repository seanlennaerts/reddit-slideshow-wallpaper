import { Wallpaper } from './wallpaper';
import { RedditAPI } from './redditAPI';
import { changeImage, showNotification } from './domController';
import { mod } from './utils';

class WallpaperManager {
  private static instance: WallpaperManager;
  private redditAPI: RedditAPI;
  private subreddit: string;
  private filter: string;
  private wallpapers: Wallpaper[];
  private timeout: number;
  private delay: number; // in seconds
  private index: number = 0;
  private timeoutStart: number;

  private constructor() { }

  static getInstance(): WallpaperManager {
    if (!WallpaperManager.instance) {
      WallpaperManager.instance = new WallpaperManager();
    }

    return WallpaperManager.instance;
  }

  private async restart() {
    if (this.subreddit && this.filter) {
      console.log('restarting');
      clearTimeout(this.timeoutStart);
      this.index = 0;

      if (this.redditAPI) {
        this.redditAPI.cancel();
      }

      this.redditAPI = new RedditAPI(this.subreddit, this.filter);
      this.wallpapers = await this.redditAPI.getImages();
      this.startSlideshow();
    }
  }

  updateSubreddit(subreddit: string) {
    console.log('updating subreddit');
    showNotification(`Fetching from ${this.subreddit}`);
    this.subreddit = subreddit;
    this.restart();
  }

  updateFilter(filter: string) {
    console.log('updating filter');
    this.filter = filter;
    this.restart();
  }

  private startSlideshow() {
    if (this.wallpapers) {
      clearTimeout(this.timeout);
      const loop = async () => {
        console.log(`showing ${this.index + 1} of ${this.wallpapers.length}`);
        if ((this.wallpapers.length - this.index) < 5) {
          this.wallpapers = [...this.wallpapers, ... await this.redditAPI.getImages()];
        }
        changeImage(this.wallpapers[this.index].url);
        this.timeoutStart = Date.now();
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

  public pause(pauseStatus: boolean) {
    if (pauseStatus) {
      console.log('pausing');
      clearTimeout(this.timeout);
    } else {
      console.log('resuming');
      const timeRemaining = Math.max(2000, this.delay * 1000 - Date.now() + this.timeoutStart);
      console.log(timeRemaining);
      this.timeout = setTimeout(() => this.startSlideshow(), timeRemaining);
    }
  }
}

export { WallpaperManager };