import React, { useState, useEffect, memo } from "react";
import instance from "../axios";
import { MoviesRequests } from "../requests";
import Loader from "./UI/Loader";
import "./Banner.css";

const Banner = () => {
  const [movie, setMovie] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setErrorMessage(null);
      try {
        const response = await instance.get(
          `/discover/movie?${MoviesRequests[0].url}`
        );

        setMovie(
          response.data.results[
            Math.floor(Math.random() * response.data.results.length - 1)
          ]
        );
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setErrorMessage(err.message);
      }
    };

    fetchData();
  }, []);

  const truncate = (string, n) => {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  };

  return (
    <>
      {isLoading && (
        <div className="sub__header">
          <Loader />
        </div>
      )}
      {!isLoading && errorMessage && (
        <div className="sub__header">
          <h2
            style={{ fontFamily: "PT Serif", color: "rgba(248, 202, 20, 0.8)" }}
          >
            {errorMessage}
          </h2>
        </div>
      )}
      {!isLoading && !errorMessage && (
        <header
          className="banner"
          style={{
            backgroundSize: "cover",
            backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
            backgroundPosition: "center center",
          }}
        >
          <div className="banner__contents">
            <h1 style={{ fontFamily: "PT Serif" }} className="banner__title">
              {movie?.name || movie?.title || movie?.original_name}
            </h1>
            <div className="banner__buttons">
              <button className="banner__button">Play</button>
              <button className="banner__button">My List</button>
            </div>
            <h1
              style={{ fontFamily: "PT Serif" }}
              className="banner__description"
            >
              {truncate(movie?.overview, 150)}
            </h1>
          </div>

          <div className="banner--fadeBottom" />
        </header>
      )}
    </>
  );
};

export default memo(Banner);
