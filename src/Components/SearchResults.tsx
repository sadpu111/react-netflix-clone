import styled from "styled-components";
import { AnimatePresence, motion, useScroll, } from "framer-motion";
import { useQuery } from "react-query";
import { getSearchResult, IGetSearchResult, IGetMovieDetails, getMovieDetails, IGetMovieCredit, getMovieCredit, IGetTvShowDetails } from "../api";
import { Thumbnail, Thumbnails, ThumbTitle, thumbTitleVariants, BigCover, BigTitle, BigMovieDetails, BigOverview, thumbnailVariants, Overlay, Year, Genres, Genre, Runtime, Stars, BigMovie, Actors, Cast } from "./Slider";
import { makeImagePath } from "../utils";
import { useMatch, useNavigate } from "react-router-dom";
import { Ratings } from "./Ratings"

const Type = styled.h1`
  font-size: 24px;
  font-weight: 800;
  margin-bottom: 20px;
  margin-left: 10px;
  color: ${(props) => props.theme.white.lighter};
  text-transform: uppercase;
`;

export function MovieSearchResults({ keyword }: { keyword: string }) {
  const bigMovieMatch = useMatch(`/search/movie/:movieId`);
  const { data } = useQuery<IGetSearchResult>(["search", keyword], () => getSearchResult(keyword));
  const { data: detailData, } = useQuery<IGetMovieDetails>(["tvShowDetails", bigMovieMatch?.params.movieId], () => getMovieDetails(bigMovieMatch?.params.movieId));
  const { data: creditData, } = useQuery<IGetMovieCredit>(["tvShowCredit", bigMovieMatch?.params.movieId], () => getMovieCredit(bigMovieMatch?.params.movieId));
  const movieResults = data?.results.filter(result => result.media_type === "movie");
  const navigate = useNavigate();
  const onBoxClicked = (type: string, movieId: number) => {
    navigate(`/search/${type}/${movieId}?keyword=${keyword}`);
  };
  const onOverlayClick = () => {
    navigate(-1);
  };
  const clickedMovie = bigMovieMatch?.params.movieId && data?.results.find((movie) => movie.id + "" === bigMovieMatch?.params.movieId);
  const { scrollY } = useScroll();
  const runtimeCalculator = (runtime: number | undefined) => {
    if (runtime) {
      let hour = Math.floor(runtime / 60);
      let min = Math.floor(runtime % 60);
      let hourValue = hour > 0 ? hour + "h" : "";
      let minValue = min > 0 ? min + "m" : "";

      return hourValue + " " + minValue;
    }
  };
  return (
    <>
      <Type>
        Movie Contents
      </Type>
      <Thumbnails          >
        {movieResults?.map((movie) => (
          <Thumbnail
            layoutId={movie.id + ""}
            onClick={() => onBoxClicked(movie.media_type, movie.id)}
            variants={thumbnailVariants}
            initial="normal"
            whileHover="hover"
            transition={{ type: "tween" }}
            key={movie.id}
            bgPhoto={makeImagePath(movie.backdrop_path + "", "w500")}
          >
            <ThumbTitle variants={thumbTitleVariants}>
              <h4>{movie.title}</h4>
            </ThumbTitle>
          </Thumbnail>
        ))}
      </Thumbnails>
      <AnimatePresence>
        {bigMovieMatch ? (
          <>
            <Overlay
              onClick={onOverlayClick}
              animate={{ opacity: 0.7, transition: { duration: 0.3 } }}
              exit={{ opacity: 0 }}>
            </Overlay>
            <BigMovie
              layoutId={bigMovieMatch.params.movieId + ""}
              style={{
                top: scrollY.get() + 100,
              }}
            >
              {clickedMovie &&
                <>
                  <BigCover style={{ backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(clickedMovie.backdrop_path+"",)})` }}>
                  </BigCover>
                  <BigTitle>
                    {clickedMovie.title}
                  </BigTitle>
                  <BigMovieDetails>
                    <Year>
                      {new Date(detailData?.release_date as string).getFullYear()}
                    </Year>
                    <Stars>
                      <Ratings rating={detailData?.vote_average as number} />
                    </Stars>
                    <Runtime>
                      Running time: {runtimeCalculator(detailData?.runtime)}
                    </Runtime>
                    <Genres>
                      Genres: {detailData?.genres.map((data) => (
                        <Genre> {data.name} </Genre>
                      ))}
                    </Genres>
                    <Cast>
                      Cast: {creditData?.cast.splice(0, 3).map((prop) => (
                        <Actors>{prop.name}</Actors>
                      ))}
                    </Cast>
                    <BigOverview>
                      {clickedMovie.overview}
                    </BigOverview>
                  </BigMovieDetails>
                </>}
            </BigMovie>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
};

export function TvShowSearchResults({ keyword }: { keyword: string }) {
  const { data } = useQuery<IGetSearchResult>(["search", keyword], () => getSearchResult(keyword));
  const tvResults = data?.results.filter(result => result.media_type === "tv")
  return (
    <>
      <Type>
        TV Show Contents
      </Type>

    </>
  );
};