import { motion, AnimatePresence, useScroll } from "framer-motion";
import { useState } from "react";
import { useQueries, useQuery } from "react-query";
import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getMovies, IGetMoviesResult } from "../api";
import { makeImagePath } from "../utils";

const Wraper = styled.div`
  background-color: black;
  padding-bottom: 200px;
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
const Slider = styled(motion.div)`
  position: relative;
  top: -100px;
`;
const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute; 
  width: 100%;
`;
const Box = styled(motion.div) <{ bgPhoto: string }>`
  background-color: white;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  height: 150px;
  font-size: 66px;
  cursor: pointer;
  &:first-child {
    transform-origin: left;
  }
  &:last-child {
    transform-origin: right;
  }
  `;
const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;
const BigMovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  background-color: gray;
  border-radius: 10px;
  opacity: 0.5;
  left: 0;
  right: 0;
  margin: 0 auto;
`;
const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 1);
  opacity: 0;
`;
const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -50,
    transition: {
      delay: 0.5,
      duration: 0.3,
      type: "tween"
    },
  },
};
const rowVariants = {
  hidden: {
    x: window.innerWidth + 5,  // 사용자 윈도우 너비
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.innerWidth - 5, // -10은 1과 6이 붙어있는 것을 막기 위해
  },
};
const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
}
const offset = 6;

function Home() {
  const { scrollY } = useScroll();
  const bigMovieMatch = useMatch("/movies/:movieId");
  const navigate = useNavigate(); // url 이동을 위한 hook
  const onOverlayClick = () => {
    navigate(-1);
  };
  const { data, isLoading } = useQuery<IGetMoviesResult>(["movies", "nowPlayng"], getMovies);
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const onBoxClicked = (movieId: number) => {
    navigate(`/movies/${movieId}`);
  }
  const increseIndex = () => {
    if (data) { // data
      if (leaving) return;
      toggleLeaving(); // setLeaving(true)는 항상 true가 되서 다른 동작이 되지 않음
      const totalMovies = data?.results.length - 1; // if (data)를 통해 maybe undefined 오류 방지. 배너 영화 한 개를 제외한 총 개수
      const maxIndex = Math.floor(totalMovies / offset) - 1; // 1개 row당 보여지는 영화의 개수(offset=6)으로 나눠 index 상한 설정
      setIndex((prev) => prev === maxIndex ? 0 : prev + 1);
    }
  };
  return (
    <Wraper>
      {isLoading ?
        <Loader>now loading...</Loader> :
        <>
          <Banner
            onClick={increseIndex}
            bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}>
            {/* fallback(|| "")를 추가하여, 어떤 이유로 data가 정의되지 않을 때 ""를 출력하도록 한다 */}
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          <Slider>
            <AnimatePresence onExitComplete={toggleLeaving} initial={false}>
              {/* onExitComplete => exit이 완료되면 실행되는 함수
            initial={false} => 화면 새로고침 시 애니메이션이 작동하지 않는다 */}
              <Row
                key={index}
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween", duration: 0.7 }} // linear transition
              /* increaseIndex로 key의 index 값이 증가할 때마다, react.js는 새로운 row가 추가되는 것으로 인식하고, 이에 따라 기존의 row는 exit로 사라진다(AnimationPresence를 통해) */
              >
                {data?.results.slice(1) // 배너 영화 1개를 제외한 영화 목록
                  .slice(offset * index, offset * index + offset).map((movie) => (
                    <Box
                      layoutId={movie.id + ""}
                      onClick={() => onBoxClicked(movie.id)}
                      /* onBoxClicked에 movie.id라는 전달인자를 넘겨주기 위해 () => 익명함수를 사용 */
                      variants={boxVariants}
                      initial="normal"
                      whileHover="hover"
                      key={movie.id}
                      bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
                    >
                      <Info
                        variants={infoVariants}
                      >
                        <h4>
                          {movie.title}
                        </h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
          </Slider>
          <AnimatePresence>
            {bigMovieMatch ? (
              <>
                <Overlay
                  onClick={onOverlayClick}
                  animate={{ opacity: 0.3 }}
                  exit={{ opacity: 0 }} />
                <BigMovie
                  layoutId={bigMovieMatch.params.movieId}
                  style={{
                    top: scrollY.get() + 70,
                  }}
                >
                  hello
                </BigMovie>
              </>
            ) : null}
          </AnimatePresence>
        </>
      }
    </Wraper>
  );
}


export default Home;