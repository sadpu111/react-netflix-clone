export function makeImagePath(id: string, format?:string) {
  return `https://image.tmdb.org/t/p/${format? format : "original"}/${id}`
};
// 여기서 id는 api에서의 backdrop_path!

export enum MovieStatus {
  "now_playing" = "now_playing",
  "top_rated" = "top_rated",
  "upcoming" = "upcoming",
  "popular" = "popular",
};

export enum TvStatus {
  "on_the_air" = "on_the_air",
  "popular" = "popular",
  "top_rated" = "top_rated",
};
