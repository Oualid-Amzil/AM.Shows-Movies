import React, { useState, useEffect, memo } from "react";

import Slider from "react-slick";
import instance from "../axios";
import Loader from "./UI/Loader";
import "./VideosRow.css";
import ReactPlayer from "react-player/youtube";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const VideosRow = ({ title, url }) => {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setErrorMessage(null);
      try {
        const response = await instance.get(url);
        setVideos(response.data.results);

        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setErrorMessage(err.message);
      }
    };

    fetchData();
  }, [url]);

  const truncate = (string, n) => {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  };

  const arrowStyle = {
    width: "90px",
    height: "36px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const SamplePrevArrow = (props) => {
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
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 710,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="videos__slider">
      <h2>{title}</h2>

      {isLoading && (
        <div className="row__relative">
          <Loader />
        </div>
      )}
      {!isLoading && errorMessage && (
        <div className="row__relative">
          <h2
            style={{ fontFamily: "PT Serif", color: "rgba(248, 202, 20, 0.8)" }}
          >
            {errorMessage}
          </h2>
        </div>
      )}

      {!isLoading && !errorMessage && (
        <Slider {...settings}>
          {videos.map((video) => (
            <div className="video__poster" key={video?.id}>
              <ReactPlayer
                width="100%"
                height="100%"
                style={{
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
                url={`https://www.youtube.com/watch?v=${video?.key}`}
              />

              <h3>{truncate(video?.name, 50)}</h3>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default memo(VideosRow);
