import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Loader from "./components/UI/Loader";
import "./App.css";

const SeeAllScreen = lazy(() => import("./screens/SeeAllScreen"));
const AuthenticationScreen = lazy(() =>
  import("./screens/AuthenticationScreen")
);
const SearchScreen = lazy(() => import("./screens/SearchScreen"));
const TvDetailsScreen = lazy(() => import("./screens/TvDetailsScreen"));
const MovieDetailsScreen = lazy(() => import("./screens/MovieDetailsScreen"));
const NotFound = lazy(() => import("./screens/NotFound"));

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Suspense
          fallback={
            <div className="centered">
              <Loader />
            </div>
          }
        >
          <Nav />
          <Routes>
            <Route path="/" element={<Navigate to="/home" />}></Route>
            <Route path="/home" element={<HomeScreen />}></Route>
            <Route
              path="/see_all/:type/:title"
              element={<SeeAllScreen />}
            ></Route>
            <Route
              path="/movie_details/:id"
              element={<MovieDetailsScreen />}
            ></Route>
            <Route path="/tv_details/:id" element={<TvDetailsScreen />}></Route>
            <Route path="/search" element={<SearchScreen />}></Route>
            <Route path="/signin" element={<AuthenticationScreen />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
          <Footer />
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default App;
