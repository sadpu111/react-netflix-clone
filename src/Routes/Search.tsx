import { useLocation } from "react-router-dom";

function Search() {
  const location = useLocation();
  console.log(location)
  return <div>Search page</div>;
}


export default Search;