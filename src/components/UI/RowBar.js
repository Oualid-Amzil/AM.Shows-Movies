import React, { memo } from "react";
import { Link } from "react-router-dom";
import "./RowBar.css";

const RowBar = ({ name, category, clickMovieHandler, clickTvHandler }) => {
  return (
    <div className="row__bar">
      <h2>
        <Link
          to={`/see_all/${category}/${name}`}
          style={{ fontFamily: "PT Serif" }}
        >
          {name} <span>....See All </span>
        </Link>{" "}
      </h2>

      <div className="row__buttons">
        <button
          style={{ borderRadius: "6px 0 0 6px" }}
          className={`row__button ${category === "movie" && "active__type"}`}
          onClick={clickMovieHandler}
        >
          <span style={{ fontFamily: "PT Serif" }}>Movies</span>
        </button>
        <button
          style={{ borderRadius: "0 6px 6px 0" }}
          className={`row__button ${category === "tv" && "active__type"}`}
          onClick={clickTvHandler}
        >
          <span style={{ fontFamily: "PT Serif" }}>Series</span>
        </button>
      </div>
    </div>
  );
};

export default memo(RowBar);
