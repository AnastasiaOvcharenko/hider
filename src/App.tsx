import { useEffect, useState } from "react";
import { getMovieBySearch } from "./api/api";
import type { AxiosResponse } from "axios";

function App() {
  const [list, setList] = useState([]);

  useEffect(() => {
    getMovieBySearch("haha")
      .then((response: AxiosResponse) => {
        console.log(response.data.docs);
        setList(response.data.docs);
      })
      .catch(() => console.log("err"));
  }, []);
  return (
    <>
      {list.map((movie) => (
        <div>{movie?.name}</div>
      ))}
    </>
  );
}

export default App;
