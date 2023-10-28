import React, { memo } from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import "./ItemInfo.css";

const ItemInfo = ({ item, type }) => {
  const base_url = "https://image.tmdb.org/t/p/original";

  return (
    <Link to={`/${type}_details/${item?.id}`}>
      <div className="itemInfo__container">
        <div className="contents__image">
          {item?.poster_path ? (
            <img src={`${base_url}${item.poster_path}`} alt={item.name} />
          ) : (
            <img
              style={{ height: "300px", objectFit: "cover" }}
              src="https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"
              alt="no poster"
            />
          )}
          <div className="contents__rate">
            <h4 style={{ fontFamily: "PT Serif" }}>
              {item?.vote_average.toFixed(1)}
            </h4>
            <FaStar className="star" />
          </div>
          <div className="contents__language">
            <h4 style={{ fontFamily: "PT Serif" }}>
              {item?.original_language?.toUpperCase()}
            </h4>
          </div>
        </div>
        <h3 style={{ fontFamily: "Opens Sans" }}>
          {item?.name || item?.title || item?.original_name}
        </h3>
      </div>
    </Link>
  );
};

export default memo(ItemInfo);
