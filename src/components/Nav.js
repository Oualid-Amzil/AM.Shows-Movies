import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { Logout } from "../app/auth/auth-actions";
import { FaSearch } from "react-icons/fa";
import "./Nav.css";

const Nav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [show, handleShow] = useState(false);

  const transitionNavBar = () => {
    if (window.scrollY > 100) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", transitionNavBar);
    return () => window.removeEventListener("scroll", transitionNavBar);
  }, []);

  return (
    <div className={!show ? "nav" : "nav nav__black"}>
      <div className="nav__contents">
        <div className="nav__logo">
          <h1 style={{ fontFamily: "PT Serif" }}>A.M</h1>
        </div>
        <div className="nav__list">
          <ul>
            <li>
              <NavLink
                to="/home"
                style={{ fontFamily: "PT Serif" }}
                className={(navData) =>
                  navData.isActive ? "active__navlink" : ""
                }
              >
                Home
              </NavLink>
            </li>
            {!isAuthenticated && (
              <li>
                <NavLink
                  to="/signin"
                  style={{ fontFamily: "PT Serif" }}
                  className={(navData) =>
                    navData.isActive ? "active__navlink" : ""
                  }
                >
                  Sign In
                </NavLink>
              </li>
            )}
            {isAuthenticated && (
              <li>
                <NavLink
                  to="/search"
                  style={{ fontFamily: "PT Serif" }}
                  className={(navData) =>
                    navData.isActive ? "active__navlink" : ""
                  }
                >
                  <FaSearch />
                </NavLink>
              </li>
            )}
          </ul>
          {isAuthenticated && (
            <button
              style={{ fontFamily: "PT Serif" }}
              className="nav__button"
              onClick={() => dispatch(Logout(navigate))}
            >
              Log Out
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nav;
