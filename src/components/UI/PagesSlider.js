import React, { memo } from "react";
import Slider from "react-slick";
import { pages } from "../../requests";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import "./PagesSlider.css";

const PagesSlider = ({ clickHandler, value, totalPages }) => {
  const arrowStyle = {
    width: "90px",
    height: "30px",
    borderRadius: "10px",
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
    slidesToShow: 10,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <SamplePrevArrow />,
    prevArrow: <SampleNextArrow />,
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 8,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 6,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <div className="pages">
      <Slider {...settings}>
        {pages.map((item) => {
          if (item.id < totalPages && totalPages !== 1) {
            return (
              <button
                key={item.id}
                className={`page__button ${value === item.number && "active"}`}
                onClick={() => clickHandler(item.number)}
              >
                <span style={{ fontFamily: "PT Serif", fontWeight: "700" }}>
                  {item.number}
                </span>
              </button>
            );
          }
          return null;
        })}
      </Slider>
    </div>
  );
};

export default memo(PagesSlider);
