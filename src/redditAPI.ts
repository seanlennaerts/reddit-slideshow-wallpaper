import { Wallpaper, Type } from './wallpaper';
import { get } from './utils';

class RedditAPI {
  private subreddit: string; // subreddit or user
  private filter: string;
  private after: string; // reddit api pagination after id
  private controller = new AbortController();

  constructor(subreddit: string, filter: string) {
    this.subreddit = subreddit;
    this.filter = filter;
  }

  cancel() {
    this.controller.abort();
  }

  private testFilter(height: number, width: number): boolean {
    switch (this.filter) {
      case 'landscape': //landscape only
        return width > height;
      case 'portrait':
        return height > width;
      case '1920x1080':
        return width > height && height >= 1080 && width >= 1920;
      default:
        return true;
    }
  }

  async getImages(): Promise<Wallpaper[]> {
    try {
      let wallpapers: Wallpaper[] = [];
      const data = await get(`https://www.reddit.com/${this.subreddit}/top.json?t=all&after=${this.after}&limit=100`, this.controller.signal);
      this.after = data.data.after;
      for (let listing of data.data.children) {
        const { post_hint, url, preview } = listing.data;
        switch (post_hint) {
          case 'image':
            const { height, width } = preview.images[0].source;
            if (this.testFilter(height, width)) {
              wallpapers.push({
                url,
                height,
                width,
                type: Type.Image,
              });
            }
            break;
          default:
          //
        }
      }
      return wallpapers;
    } catch (e) {
      // fail silently
    }
  }
}

export { RedditAPI };
