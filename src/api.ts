const API_KEY = "833228a23373ddc804c04843b6c4434a";
const BASE_URL = "https://api.themoviedb.org/3/"

export function getMovies() {
  return fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`).then((response) => response.json());
};
export default getMovies;