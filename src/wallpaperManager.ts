import { Wallpaper } from './wallpaper';
import { RedditAPI } from './redditAPI';

class WallpaperManager {
  private static instance: WallpaperManager;
  private timeout: number;
  private wallpapers: Wallpaper[];
  private index: number = 0;
  private redditAPI: RedditAPI;

  private constructor() { }

  static getInstance(): WallpaperManager {
    if (!WallpaperManager.instance) {
      WallpaperManager.instance = new WallpaperManager();
    }

    return WallpaperManager.instance;
  }

  async updateSubreddit(subreddit: string) {
    console.log('updating subreddit');
    if (this.redditAPI) {
      this.redditAPI.cancel();
    }
    this.redditAPI = new RedditAPI(subreddit);
    this.wallpapers = await this.redditAPI.getImages();
  }

  startSlideshow() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => { }, 1000 * 10);
  }

  updateWallpapers(wallpapers: Wallpaper[]) {
    this.wallpapers = wallpapers;
    this.startSlideshow();
  }
}

export { WallpaperManager };