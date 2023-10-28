import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Banner from "../components/Banner.js";
import Row from "../components/Row.js";
import LargeRow from "../components/LargeRow.js";

import { MoviesRequests } from "../requests.js";
import { authActions } from "../app/auth/authSlice.js";
import "./HomeScreen.css";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const userData = localStorage.getItem("userInfo");

  if (userData) {
    const transformeData = JSON.parse(userData);
    const expirationDate = new Date(transformeData.expirationDate);

    if (
      expirationDate <= new Date() ||
      !transformeData.token ||
      !transformeData.userId
    ) {
      return;
    }

    const expirationTime = expirationDate.getTime() - new Date().getTime();

    dispatch(
      authActions.authentication({
        token: transformeData.token,
        userId: transformeData.userId,
        expirationTime,
        isAuthenticated: transformeData.isAuthenticated,
      })
    );
  }

  return (
    <div className="homeScreen">
      <Banner />
      {isAuthenticated && (
        <LargeRow title={MoviesRequests[0].name} url={MoviesRequests[0].url} />
      )}
      {MoviesRequests.map((item, idx) => {
        if (idx > 0) {
          return <Row key={item.id} title={item.name} url={item.url} />;
        }
        return null;
      })}
    </div>
  );
};

export default HomeScreen;
