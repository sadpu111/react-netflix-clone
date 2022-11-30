export function makeImagePath(id: string, format?:string) {
  return `https://image.tmdb.org/t/p/${format? format : "original"}/${id}`
};
// 여기서 id는 api에서의 backdrop_path!