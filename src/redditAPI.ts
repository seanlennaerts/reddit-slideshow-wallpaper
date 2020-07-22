import { Wallpaper, Type } from './wallpaper';
import { get } from './utils';

class RedditAPI {
  private subreddit: string; // subreddit or user
  private after: string; // reddit api pagination after id
  private controller = new AbortController();

  constructor(subreddit: string) {
    this.subreddit = subreddit;
  }

  cancel() {
    this.controller.abort();
  }

  async getImages(): Promise<Wallpaper[]> {
    try {
      let wallpapers: Wallpaper[] = [];
      const data = await get(`https://www.reddit.com/${this.subreddit}/top.json?t=all&after=${this.after}&limit=100`);
      this.after = data.data.after;
      for (let listing of data.data.children) {
        const { post_hint, url, preview } = listing.data;
        switch (post_hint) {
          case 'image':
            const { height, width } = preview.images[0].source;
            wallpapers.push(new Wallpaper(url, height, width, Type.Image));
            break;
          default:
          //
        }
      }
      return wallpapers;
    } catch (e) {
      if (e.name === 'AbortError') {
        console.log('fetch was aborted');
        // fail silently
      }
    }
  }
}

export { RedditAPI };
