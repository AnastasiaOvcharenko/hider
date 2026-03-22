import axios, { type AxiosPromise } from "axios";

export const getMovieBySearch = async function (query: string): AxiosPromise {
  const proxyUrl = `/.netlify/functions/movie-proxy`;

  return axios.get(proxyUrl, {
    params: {
      path: "/v1.4/movie/search",
      query: query,
      limit: 50,
    },
  });
};
