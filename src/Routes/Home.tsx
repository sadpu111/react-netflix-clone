import { motion, AnimatePresence, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { useQueries, useQuery } from "react-query";
import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getMovies, IGetMoviesResult } from "../api";
import { MovieSlider } from "../Components/Slider";
import { makeImagePath, MovieStatus } from "../utils";


const Wraper = styled.div`
  overflow: hidden;
  background-color: black;
  padding-bottom: 200px;
  align-items: center;
`;
const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20vh;
`;
const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  padding: 60px;
  justify-content: center;
  flex-direction: column;
  background-image: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,1)), url(${(props) => props.bgPhoto});
  background-size: cover;
`;
const Title = styled.h2`
  font-size: 60px;
  font-weight: bold;
  margin-bottom: 10px;
`;
const Overview = styled.p`
  font-size: 20px;
  width: 50%;
`;


function Home() {

  const { data, isLoading } = useQuery<IGetMoviesResult>(["movies", "nowPlayng"], () => getMovies(MovieStatus.now_playing));
  const [randomIndex, setRandomIndex] = useState(0);
  useEffect(() => {
    setRandomIndex(() => Math.floor(Math.random() * 20))
  }, [])
  return (
    <Wraper>
      {isLoading ?
        <Loader>now loading...</Loader> :
        <>
          <Banner
            bgPhoto={makeImagePath(data?.results[randomIndex].backdrop_path || "")}>
            {/* fallback(|| "")를 추가하여, 어떤 이유로 data가 정의되지 않을 때 ""를 출력하도록 한다 */}
            <Title>{data?.results[randomIndex].title}</Title>
            <Overview>{data?.results[randomIndex].overview}</Overview>
          </Banner>
        <MovieSlider status={MovieStatus.now_playing}/>
        <MovieSlider status={MovieStatus.top_rated}/>
        <MovieSlider status={MovieStatus.popular}/>
        </>
      }
    </Wraper>
  );
}


export default Home;