import { useEffect, useState } from "react";
import { getMovieBySearch } from "./api/api";
import type { AxiosResponse } from "axios";

interface Movie {
  name: string | undefined;
}

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
      {list.map((movie: Movie) => (
        <div>{movie?.name}</div>
      ))}
    </>
  );
}

export default App;
