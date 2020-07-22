enum Type {
  Image,
}

interface Wallpaper {
  url: string;
  height: number;
  width: number;
  type: Type;
}

export { Wallpaper, Type };
