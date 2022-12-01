import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useQueries, useQuery } from "react-query";
import styled from "styled-components";
import { getMovies, IGetMoviesResult } from "../api";
import { makeImagePath } from "../utils";

const Wraper = styled.div`
  background-color: black;
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
  gap: 10px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute; 
  width: 100%;
`;
const Box = styled(motion.div)`
  background-color: white;
  height: 200px;
  color: red;
  font-size: 66px;
`;
const rowVariants = {
  hidden: {
    x: window.innerWidth + 10,  // 사용자 윈도우 너비
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.innerWidth -10, // -10은 1과 6이 붙어있는 것을 막기 위해
  },
};

function Home() {
  const { data, isLoading } = useQuery<IGetMoviesResult>(["movies", "nowPlayng"], getMovies);
  const [index, setIndex] = useState(0);
  const increseIndex = () => setIndex((prev) => prev + 1);
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
            <AnimatePresence>
              <Row
                key={index}
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{type: "tween", duration: 0.7}} // linear transition
                /* increaseIndex로 key의 index 값이 증가할 때마다, react.js는 새로운 row가 추가되는 것으로 인식하고, 이에 따라 기존의 row는 exit로 사라진다(AnimationPresence를 통해) */
                >
                  {[1,2,3,4,5,6].map((i) => <Box key={i}>{i}</Box>)}
              </Row>
            </AnimatePresence>
          </Slider>
        </>
      }
    </Wraper>
  );
}


export default Home;