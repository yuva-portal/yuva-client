import React from "react";
import { Link } from "react-router-dom";

// My css
import loginCss from "../../css/common/login-form.module.css";
// ! Disable login button when loading by creating isLoading state, so user cannot press it again and again

import { validation } from "../../utilities/constants";

export const LoginForm = (props) => {
  const handleChange = (e) => {
    props.onChange(e); // Need to pass the whole event, passing updatedField just gives the last entered character of the input
  };

  const handleLogInClick = () => {
    props.onClick();
  };

  return (
    <div className={loginCss.outerDiv}>
      <p className={loginCss.heading}>Login</p>
      <input
        className={loginCss.input}
        type="text"
        placeholder={props.role === "user" ? "User Id" : "Admin Id"}
        name={props.role === "user" ? "userId" : "adminId"}
        value={props.role === "user" ? props.userId : props.adminId}
        onChange={handleChange}
        maxLength={validation.authForm.userId.maxLen}
        autoComplete="off"
      />
      <input
        className={loginCss.input}
        type="password"
        placeholder="Password"
        name="password"
        value={props.password}
        onChange={handleChange}
        maxLength={validation.authForm.password.maxLen}
        autoComplete="off"
      />
      <button
        className={loginCss.btn}
        onClick={handleLogInClick}
        disabled={props.isBtnDisabled}
      >
        {props.isBtnDisabled ? "Logging in ..." : "Login"}
      </button>
      {props.role === "user" ? (
        <>
          <p className={loginCss.forgotPassText}>Don't have an account ?</p>
          <Link className={loginCss.forgotPassText} to="/user/register">
            Register
          </Link>
        </>
      ) : null}
    </div>
  );
};
