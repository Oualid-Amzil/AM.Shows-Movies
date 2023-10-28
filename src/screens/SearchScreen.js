import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import instance from "../axios";

import Loader from "../components/UI/Loader";
import "./SearchScreen.css";

import ItemInfo from "../components/ItemInfo";
import PagesSlider from "../components/UI/PagesSlider";
import { searchActions } from "../app/searchItemsSlice";

const SearchScreen = () => {
  const dispatch = useDispatch();

  const [items, setItems] = useState([]);
  const [totalPages, setTotalPages] = useState();
  const searchWord = useSelector((state) => state.search.searchElements.name);
  const page = useSelector((state) => state.search.searchElements.page);
  const [inputText, setInputText] = useState("");

  const type = useSelector((state) => state.search.searchElements.type);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setErrorMessage(null);
      try {
        const response = await instance.get(
          `/search/${type}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${searchWord}&language=en-US&page=${page}&include_adult=false`
        );

        setItems(response.data.results);
        setTotalPages(response.data.total_pages);

        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setErrorMessage(err.message);
      }
    };

    fetchData();
  }, [page, type, searchWord, dispatch]);

  return (
    <div className="searchScreen">
      <div className="search__bar">
        <button
          className={type === "tv" ? "button search__active" : "button"}
          style={{
            fontFamily: "PT Serif",
          }}
          onClick={() =>
            dispatch(searchActions.addSearchElements({ type: "tv", page: "1" }))
          }
        >
          Serie
        </button>
        <button
          className={type === "movie" ? "button search__active" : "button"}
          style={{
            fontFamily: "PT Serif",
          }}
          onClick={() =>
            dispatch(
              searchActions.addSearchElements({ type: "movie", page: "1" })
            )
          }
        >
          Movie
        </button>
        <input
          style={{ fontFamily: "PT Serif" }}
          type="text"
          placeholder={searchWord || `Search for a ${type}`}
          onChange={(event) => setInputText(event.target.value)}
        />
        <button
          className="button"
          style={{ fontFamily: "PT Serif" }}
          onClick={() =>
            dispatch(searchActions.addSearchElements({ name: inputText }))
          }
        >
          Search
        </button>
      </div>

      {isLoading && (
        <div className="search__container">
          <Loader />
          <h2
            style={{
              fontFamily: "PT Serif",
              color: "rgba(139, 211, 218, 0.8)",
            }}
          >
            is Loading...
          </h2>
        </div>
      )}

      {!isLoading && errorMessage && (
        <div className="search__container">
          <h2
            style={{ fontFamily: "PT Serif", color: "rgba(248, 202, 20, 0.8)" }}
          >
            {errorMessage}
          </h2>
        </div>
      )}

      {!isLoading && !errorMessage && (
        <div className="searchScreen__contents">
          {items.map((item) => (
            <ItemInfo key={item.id} item={item} type={type} />
          ))}
        </div>
      )}

      {!isLoading && !errorMessage && items.length === 0 && (
        <div className="search__container">
          <h2
            style={{ fontFamily: "PT Serif", color: "rgba(248, 202, 20, 0.8)" }}
          >
            {`There is no ${
              type === "tv" ? "tv show" : "movie"
            } with that name.`}
          </h2>
        </div>
      )}

      <PagesSlider
        value={page}
        totalPages={totalPages}
        clickHandler={(number) =>
          dispatch(searchActions.addSearchElements({ page: number }))
        }
      />
    </div>
  );
};

export default SearchScreen;
