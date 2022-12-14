import styled from "styled-components";
import { useQuery } from "react-query";


const Category = styled.h1`
  font-size: 24px;
  font-weight: 800;
  margin-bottom: 20px;
  margin-left: 10px;
  color: ${(props) => props.theme.white.lighter};
  text-transform: uppercase;
`;



export function MovieSearchResults() {
  return (
    <>
    <Category>
      Movie Contents
    </Category>
    <Category>
      TV show Contents
    </Category>
    </>
  );
};

export function TvShowSearchResults () {
  return <div>tvShow search results</div>
};