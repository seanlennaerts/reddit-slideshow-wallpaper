enum Type {
  Image,
}

class Wallpaper {
  url: string;
  height: number;
  width: number;
  type: Type;

  constructor(url: string, height: number, width: number, type: Type) {
    this.url = url;
    this.height = height;
    this.width = width;
    this.type = type;
  }
}

export { Wallpaper, Type };
