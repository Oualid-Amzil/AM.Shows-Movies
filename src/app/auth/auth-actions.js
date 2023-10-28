import axios from "axios";

import { uiActions } from "../uiSlice";
import { authActions } from "./authSlice";

const PROJECT_KEY = process.env.REACT_APP_PROJECT_KEY;

let timer;

export const signUp = (email, password, navigate) => {
  return async (dispatch) => {
    dispatch(uiActions.error(null));
    dispatch(uiActions.isLoading(true));
    try {
      const response = await axios({
        method: "post",
        url: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${PROJECT_KEY}`,
        data: {
          email: email,
          password: password,
          returnSecureToken: true,
        },
      });

      dispatch(
        authActions.authentication({
          token: response.data.idToken,
          userId: response.data.localId,
          expirationTime: parseInt(response.data.expiresIn) * 1000,
          isAuthenticated: true,
        })
      );

      const expirationDate = new Date(
        new Date().getTime() + parseInt(response.data.expiresIn) * 1000
      );

      localStorage.setItem(
        "userInfo",
        JSON.stringify({
          token: response.data.idToken,
          userId: response.data.localId,
          expirationDate,
          isAuthenticated: true,
        })
      );

      timer = setTimeout(() => {
        localStorage.removeItem("userInfo");
        dispatch(authActions.logout());
      }, parseInt(response.data.expiresIn) * 1000);

      dispatch(uiActions.isLoading(false));
      navigate("/home");
    } catch (err) {
      console.log(err);
      const errorId = err.response.data.error.message;
      let message = "Something went wrong!";
      if (errorId === "EMAIL_EXISTS") {
        message = "The email address is already in use by another account.!";
      }
      dispatch(uiActions.error(message));
      dispatch(uiActions.isLoading(false));
    }
  };
};

export const signIn = (email, password, navigate) => {
  return async (dispatch) => {
    dispatch(uiActions.error(null));
    dispatch(uiActions.isLoading(true));
    try {
      const response = await axios({
        method: "post",
        url: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${PROJECT_KEY}`,
        data: {
          email: email,
          password: password,
          returnSecureToken: true,
        },
      });

      dispatch(
        authActions.authentication({
          token: response.data.idToken,
          userId: response.data.localId,
          expirationTime: parseInt(response.data.expiresIn) * 1000,
          isAuthenticated: true,
        })
      );

      const expirationDate = new Date(
        new Date().getTime() + parseInt(response.data.expiresIn) * 1000
      );

      localStorage.setItem(
        "userInfo",
        JSON.stringify({
          token: response.data.idToken,
          userId: response.data.localId,
          expirationDate,
          isAuthenticated: true,
        })
      );

      timer = setTimeout(() => {
        localStorage.removeItem("userInfo");
        dispatch(authActions.logout());
      }, parseInt(response.data.expiresIn) * 1000);

      dispatch(uiActions.isLoading(false));
      navigate("/home");
    } catch (err) {
      const errorId = err.response.data.error.message;
      let message = "Something went wrong!";
      if (errorId === "EMAIL_NOT_FOUND") {
        message = "This email could not be found!";
      } else if (errorId === "INVALID_PASSWORD") {
        message = "This password is not valid!";
      }
      dispatch(uiActions.error(message));
      dispatch(uiActions.isLoading(false));
    }
  };
};

export const Logout = (navigate) => {
  return async (dispatch) => {
    clearTimeout(timer);
    localStorage.removeItem("userInfo");
    dispatch(authActions.logout());
    navigate("/signin");
  };
};
