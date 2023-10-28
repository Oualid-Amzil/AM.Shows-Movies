import React, { useReducer, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isEmpty, isEmail } from "validator";
import { signIn, signUp } from "../../app/auth/auth-actions";
import "animate.css";
import Loader from "../UI/Loader";
import "./SignUpIn.css";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      return {
        ...state,
        value: action.value,
        valid: action.valid,
      };

    case "INPUT_BLUR":
      return {
        ...state,
        touched: action.value,
      };

    default:
      return state;
  }
};

const SignUpIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [signin, setSignin] = useState(true);
  const isLoading = useSelector((state) => state.ui.isLoading);
  const errorMessage = useSelector((state) => state.ui.message);

  const [emailState, emailDispatch] = useReducer(inputReducer, {
    value: "",
    valid: false,
    touched: false,
  });
  const [passwordState, passwordDispatch] = useReducer(inputReducer, {
    value: "",
    valid: false,
    touched: false,
  });
  const [cmPasswordState, cmPasswordDispatch] = useReducer(inputReducer, {
    value: "",
    valid: false,
    touched: false,
  });

  const emailChangeHandler = (text) => {
    let isValid = true;
    if (isEmpty(text) || !isEmail(text)) {
      isValid = false;
    }
    emailDispatch({ type: "INPUT_CHANGE", value: text, valid: isValid });
  };

  const passwordChangeHandler = (text) => {
    let isValid = true;
    if (isEmpty(text) || text.length < 7) {
      isValid = false;
    }
    passwordDispatch({ type: "INPUT_CHANGE", value: text, valid: isValid });
  };

  const cmPasswordChangeHandler = (text) => {
    let isValid = true;
    if (isEmpty(text) || text.length < 7 || text !== passwordState.value) {
      isValid = false;
    }

    cmPasswordDispatch({ type: "INPUT_CHANGE", value: text, valid: isValid });
  };

  const clearOutInputs = () => {
    emailDispatch({ type: "INPUT_CHANGE", value: "", valid: false });
    emailDispatch({ type: "INPUT_BLUR", touched: false });
    passwordDispatch({ type: "INPUT_CHANGE", value: "", valid: false });
    passwordDispatch({ type: "INPUT_BLUR", touched: false });
    if (!signin) {
      cmPasswordDispatch({ type: "INPUT_CHANGE", value: "", valid: false });
      cmPasswordDispatch({ type: "INPUT_BLUR", touched: false });
    }
  };

  const signupHandler = () => {
    if (emailState.valid && passwordState.valid && cmPasswordState.valid) {
      clearOutInputs();
      dispatch(signUp(emailState.value, passwordState.value, navigate));
    } else {
      alert("An Error Occurred! Please check your inputs.");
    }
  };

  const signinHandler = () => {
    if (emailState.valid && passwordState.valid) {
      clearOutInputs();
      dispatch(signIn(emailState.value, passwordState.value, navigate));
    } else {
      alert("An Error Occurred! Please check your inputs.");
    }
  };

  const emailError = !emailState.valid && emailState.touched;
  const passwordError = !passwordState.valid && passwordState.touched;
  const cmPasswordError = !cmPasswordState.valid && cmPasswordState.touched;

  return (
    <div className="animate__animated animate__zoomIn auth__sub">
      <h1 style={{ fontFamily: "PT Serif" }}>
        {!signin ? "Sign Up" : "Sign In"}
      </h1>
      <div className="input__element">
        <h4 style={{ fontFamily: "PT Serif" }}>Email</h4>
        <input
          value={emailState.value}
          placeholder="Email"
          type="email"
          onChange={(e) => emailChangeHandler(e.target.value)}
          onBlur={() => emailDispatch({ type: "INPUT_BLUR", value: true })}
        />
        {emailError && (
          <span style={{ fontFamily: "PT Sans" }}>
            Please provide a valid email.
          </span>
        )}
      </div>
      <div className="input__element">
        <h4 style={{ fontFamily: "PT Serif" }}>Password</h4>
        <input
          value={passwordState.value}
          placeholder="Password"
          type="password"
          onChange={(e) => passwordChangeHandler(e.target.value)}
          onBlur={() => passwordDispatch({ type: "INPUT_BLUR", value: true })}
        />
        {passwordError && (
          <span style={{ fontFamily: "PT Sans" }}>
            Please provide a valid password.
          </span>
        )}
      </div>
      {!signin && (
        <div className="input__element">
          <h4 style={{ fontFamily: "PT Serif" }}>Confirm Password</h4>
          <input
            value={cmPasswordState.value}
            placeholder="Confirm Password"
            type="password"
            onChange={(e) => cmPasswordChangeHandler(e.target.value)}
            onBlur={() =>
              cmPasswordDispatch({ type: "INPUT_BLUR", value: true })
            }
          />
          {cmPasswordError && (
            <span style={{ fontFamily: "PT Sans" }}>
              Please provide a valid confirm password.
            </span>
          )}
        </div>
      )}
      {errorMessage && (
        <span
          style={{ fontFamily: "PT Sans", color: "red", fontWeight: "600" }}
        >
          {errorMessage}
        </span>
      )}
      {!isLoading ? (
        <button onClick={signin ? signinHandler : signupHandler}>
          {!signin ? "Sign Up" : "Sign In"}
        </button>
      ) : (
        <Loader />
      )}

      {signin && (
        <h4>
          <span className="auth__gray">New to A.M?</span>{" "}
          <button className="auth__link" onClick={() => setSignin(false)}>
            Sign up Now.
          </button>
        </h4>
      )}

      {!signin && (
        <h4>
          <span className="auth__gray">I already have an account?</span>
          <button className="auth__link" onClick={() => setSignin(true)}>
            Sign In.
          </button>
        </h4>
      )}
    </div>
  );
};

export default SignUpIn;
