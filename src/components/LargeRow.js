import React, { useState, useEffect, memo } from "react";
import { Link } from "react-router-dom";

import Slider from "react-slick";
import instance from "../axios";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import RowBar from "./UI/RowBar";
import Loader from "./UI/Loader";
import "./LargeRow.css";

const LargeRow = ({ title, url }) => {
  const [items, setItems] = useState([]);
  const [imageIndex, setImageIndex] = useState(0);
  const [type, setType] = useState("movie");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setErrorMessage(null);
      try {
        const response = await instance.get(`/discover/${type}?${url}`);
        setItems(response.data.results);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setErrorMessage(err.message);
      }
    };

    fetchData();
  }, [type, url]);

  const base_url = "https://image.tmdb.org/t/p/original";

  const arrowStyle = {
    background: "rgba(251, 36, 16, 0.9)",
    width: "25px",
    height: "25px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, ...arrowStyle }}
        onClick={onClick}
      >
        <FaAngleLeft />
      </div>
    );
  };

  const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          ...arrowStyle,
        }}
        onClick={onClick}
      >
        <FaAngleRight />
      </div>
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,

    slidesToShow: 7,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: 0,
    beforeChange: (currentIndex, nextIndex) => setImageIndex(nextIndex),
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: 0,
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
    <div className="largeRow__slider">
      <RowBar
        name={title}
        category={type}
        clickMovieHandler={() => setType("movie")}
        clickTvHandler={() => setType("tv")}
      />

      {isLoading && (
        <div className="sub__container">
          <Loader />
        </div>
      )}
      {!isLoading && errorMessage && (
        <div className="sub__container">
          <h2
            style={{ fontFamily: "PT Serif", color: "rgba(248, 202, 20, 0.8)" }}
          >
            {errorMessage}
          </h2>
        </div>
      )}
      {!isLoading && !errorMessage && (
        <Slider {...settings}>
          {items?.map((item, idx) => (
            <Link to={`/${type}_details/${item?.id}`} key={item?.id}>
              <img
                className={
                  idx === imageIndex
                    ? "largeRow__poster active__poster"
                    : "largeRow__poster"
                }
                src={`${base_url}${item?.poster_path}`}
                alt={item?.name}
              />
            </Link>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default memo(LargeRow);
