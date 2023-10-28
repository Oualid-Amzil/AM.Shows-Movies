import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import instance from "../axios";
import "./SeeAllScreen.css";

import ItemInfo from "../components/ItemInfo";
import Loader from "../components/UI/Loader";
import PagesSlider from "../components/UI/PagesSlider";
import { searchActions } from "../app/searchItemsSlice";

import { MoviesRequests } from "../requests";

const SeeAllScreen = () => {
  const dispatch = useDispatch();

  const [items, setItems] = useState([]);
  const page = useSelector((state) => state.search.seeAllPage);
  const [totalPages, setTotalPages] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const params = useParams();

  let URL;

  if (params?.title === "Trending") {
    URL = `/trending/${params?.type}${MoviesRequests[1].url}`;
  } else if (params?.title === "Top Rated") {
    URL = `/${params?.type}/top_rated?${MoviesRequests[2].url}`;
  } else {
    URL = `/discover/${params?.type}?${
      MoviesRequests.find((element) => element.name === params?.title).url
    }`;
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setErrorMessage(null);
      try {
        const response = await instance.get(`${URL}&page=${page}`);

        setItems(response.data.results);
        setTotalPages(response.data.total_pages);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setErrorMessage(err.message);
      }
    };

    fetchData();
  }, [URL, page]);

  return (
    <div className="seeAllScreen">
      <h1 style={{ fontFamily: "PT Serif" }}>{params?.title.toUpperCase()}</h1>
      {isLoading && (
        <div className="loading__container">
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
        <div className="loading__container">
          <h2
            style={{ fontFamily: "PT Serif", color: "rgba(248, 202, 20, 0.8)" }}
          >
            {errorMessage}
          </h2>
        </div>
      )}
      {!isLoading && !errorMessage && (
        <div className="seeAllScreen__contents">
          {items.map((item) => (
            <ItemInfo key={item.id} item={item} type={params?.type} />
          ))}
        </div>
      )}
      {isAuthenticated && (
        <PagesSlider
          value={page}
          totalPages={totalPages}
          clickHandler={(number) =>
            dispatch(searchActions.addSeeAllPage(number))
          }
        />
      )}
    </div>
  );
};

export default SeeAllScreen;
