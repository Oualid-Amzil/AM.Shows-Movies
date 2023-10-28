import React, { useState, useEffect, memo } from "react";
import { Link } from "react-router-dom";

import { FaStar } from "react-icons/fa";
import Slider from "react-slick";
import instance from "../axios";
import Loader from "./UI/Loader";
import RowBar from "./UI/RowBar";
import "./Row.css";

const Row = ({ title, url }) => {
  const [items, setItems] = useState([]);
  const [type, setType] = useState("movie");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  let URL;

  if (title === "Trending") {
    URL = `/trending/${type}${url}`;
  } else if (title === "Top Rated") {
    URL = `/${type}/top_rated?${url}`;
  } else {
    URL = `/discover/${type}?${url}`;
  }
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const response = await instance.get(URL);
        setItems(response.data.results);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setErrorMessage(err.message);
      }
    };

    fetchData();
  }, [URL]);

  const base_url = "https://image.tmdb.org/t/p/original";

  const settings = {
    arrows: false,
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 2,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 790,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="row__slider">
      <RowBar
        name={title}
        category={type}
        clickMovieHandler={() => setType("movie")}
        clickTvHandler={() => setType("tv")}
      />
      {isLoading && (
        <div className="sub__row">
          <Loader />
        </div>
      )}
      {!isLoading && errorMessage && (
        <div className="sub__row">
          <h2
            style={{ fontFamily: "PT Serif", color: "rgba(248, 202, 20, 0.8)" }}
          >
            {errorMessage}
          </h2>
        </div>
      )}

      {!isLoading && !errorMessage && (
        <Slider {...settings}>
          {items.map((item) => (
            <div className="row__poster" key={item.id}>
              <Link to={`/${type}_details/${item.id}`}>
                {item?.backdrop_path ? (
                  <img
                    className="image"
                    src={`${base_url}${item?.backdrop_path}`}
                    alt={item?.name}
                  />
                ) : (
                  <img
                    style={{ height: "100.69px", width: "100%" }}
                    src="https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"
                    alt="no poster"
                  />
                )}

                <div className="row__content">
                  <h4>{item?.vote_average.toFixed(1)}</h4>
                  <FaStar className="row__star" />
                </div>
              </Link>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default memo(Row);
