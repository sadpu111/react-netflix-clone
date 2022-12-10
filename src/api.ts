const API_KEY = "833228a23373ddc804c04843b6c4434a";
const BASE_URL = "https://api.themoviedb.org/3/"


interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
};
export interface IGetMoviesResult {
  page: number;
  results: IGetMovieDetails[];
  total_pages: number;
  total_results: number;
};
export interface IGetMovieDetails {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null;
  budget: number;
  genres: [
    {
      id: number;
      name: string;
    }
  ];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: [
    {
      id: number;
      logo_path: string;
      name: string;
      origin_country: string;
    }
  ];
  production_countries: [
    {
      iso_3166_1: string;
      name: string;
    }
  ];
  release_date: string;
  revenue: number;
  runtime: number;
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export function getMovies(status: string) {
  return fetch(`${BASE_URL}/movie/${status}?api_key=${API_KEY}&language=en-US&page=1&region=kr`).then((response) => response.json());
};

export function getMovieDetails(movieId: string | undefined) {
  return fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US&page=1&region=kr`).then((response) => response.json());
};