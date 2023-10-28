import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import instance from "../axios";
import VideosRow from "../components/VideosRow";
import Loader from "../components/UI/Loader";
import "./MovieDetailsScreen.css";

const TvDetailsScreen = () => {
  const [serieDetails, setSerieDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const params = useParams();

  useEffect(() => {
    const getSerieDetails = async () => {
      setIsLoading(true);
      setErrorMessage(null);
      try {
        const response = await instance.get(
          `/tv/${params?.id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
        );

        setSerieDetails(response.data);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setErrorMessage(err.message);
      }
    };

    getSerieDetails();
  }, [params?.id]);

  return (
    <>
      {isLoading && (
        <div className="container">
          <Loader />
          <h2
            style={{
              fontFamily: "PT Serif",
              color: "#3498db",
            }}
          >
            is Loading...
          </h2>
        </div>
      )}

      {!isLoading && errorMessage && (
        <div className="container">
          <h2
            style={{ fontFamily: "PT Serif", color: "rgba(248, 202, 20, 0.8)" }}
          >
            {errorMessage}
          </h2>
        </div>
      )}

      {!isLoading && !errorMessage && (
        <div
          className="movieDetails"
          style={{
            backgroundSize: "cover",
            backgroundImage: `url("https://image.tmdb.org/t/p/original${serieDetails?.backdrop_path}")`,
            backgroundPosition: "center center",
          }}
        >
          <div className="moviDetails__gradient" />
          <div className="movieDetails__info">
            <div className="movie__image">
              <img
                src={`https://image.tmdb.org/t/p/original${serieDetails?.poster_path}`}
                alt="moviePoster"
              />
            </div>

            <div className="movie__details">
              <div className="movie__category">
                <h4 style={{ fontFamily: "PT Serif" }}>Movie |</h4>{" "}
                {serieDetails?.genres?.map((item, idx) => (
                  <span style={{ fontFamily: "PT Serif" }} key={idx}>
                    .{item.name}
                  </span>
                ))}
              </div>

              <h1 style={{ fontFamily: "PT Serif" }}>
                {serieDetails?.name ||
                  serieDetails?.title ||
                  serieDetails?.original_name}
              </h1>

              <div className="movie__creators">
                <h4 style={{ fontFamily: "PT Serif" }}>
                  Release Date: <span>{serieDetails?.first_air_date}</span>
                </h4>

                <h4 style={{ fontFamily: "PT Serif" }}>
                  Seasons: <span>{serieDetails?.number_of_seasons} </span>
                </h4>

                <h4 style={{ fontFamily: "PT Serif" }}>
                  Episodes: <span>{serieDetails?.number_of_episodes} </span>
                </h4>
              </div>

              <div className="movie__description">
                <p style={{ fontFamily: "Opens Sans" }}>
                  {serieDetails?.overview}
                </p>
              </div>

              <h4 style={{ fontFamily: "PT Serif" }}>
                Directed By:{" "}
                <div className="movie__awards">
                  {serieDetails?.created_by?.map((item) => (
                    <span style={{ fontFamily: "PT Serif", fontSize: "14px" }}>
                      .{item?.name}
                    </span>
                  )) || "anonymous"}
                </div>
              </h4>

              <div className="movie__rate">
                <span style={{ fontFamily: "PT Serif" }}>
                  {serieDetails?.vote_average?.toFixed(1)}
                </span>
                <div className="voters">
                  <span style={{ fontFamily: "PT Serif" }}>/10</span>
                  <span style={{ fontFamily: "PT Serif" }}>
                    {serieDetails?.vote_count}{" "}
                    <span style={{ fontSize: "12px" }}>voters</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          {isAuthenticated && (
            <div className="movieDetails__trailers">
              <VideosRow
                title="TRAILERS"
                url={`https://api.themoviedb.org/3/tv/${params?.id}/videos?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default TvDetailsScreen;
