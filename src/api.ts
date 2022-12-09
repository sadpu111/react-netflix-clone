const API_KEY = "833228a23373ddc804c04843b6c4434a";
const BASE_URL = "https://api.themoviedb.org/3/"


interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
}
export interface IGetMoviesResult {
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export function getMovies(status: string) {
  return fetch(`${BASE_URL}/movie/${status}?api_key=${API_KEY}&language=en-US&page=1&region=kr`).then((response) => response.json());
};
export default getMovies;