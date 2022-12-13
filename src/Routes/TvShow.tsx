import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { getTvShows, IGetTvShowsResult } from "../api";
import { searchState } from "../Atoms";
import { TvShowSlider } from "../Components/Slider";
import { makeImagePath, TvShowStatus, } from "../utils";


const Wraper = styled.div`
  overflow: hidden;
  background-color: black;
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
  font-size: 25px;
  width: 50%;
`;

function TvShow() {
  const { data, isLoading } = useQuery<IGetTvShowsResult>(["tvs", "popular"], () => getTvShows(TvShowStatus.top_rated));
  const [randomIndex, setRandomIndex] = useState(0);
  const setSearchOpen = useSetRecoilState(searchState);
  useEffect(() => {
    setRandomIndex(() => Math.floor(Math.random() * 20))
  }, []);
  const onBannerClick = () => {
    setSearchOpen(false);
  };
  return (
    <Wraper>
      {isLoading ?
        <Loader>now loading...</Loader> :
        <>
          <Banner
            onClick={onBannerClick}
            bgPhoto={makeImagePath(data?.results[randomIndex].backdrop_path || "")}>
            {/* fallback(|| "")를 추가하여, 어떤 이유로 data가 정의되지 않을 때 ""를 출력하도록 한다 */}
            <Title>{data?.results[randomIndex].name}</Title>
            <Overview>{data?.results[randomIndex].overview}</Overview>
          </Banner>
          <TvShowSlider status={TvShowStatus.on_the_air}/>
          <TvShowSlider status={TvShowStatus.top_rated}/>
          <TvShowSlider status={TvShowStatus.popular}/>
        </>
      }
    </Wraper>
  );
}


export default TvShow;