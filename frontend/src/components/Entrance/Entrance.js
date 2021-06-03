import React, { useContext, useEffect, useState } from "react";
import styles from "./Entrance.module.css";
import { GlobalContext } from "../../context/GlobalState";
import { Link, Redirect } from "react-router-dom";

export default (props) => {
  const { register, current_user, login } = useContext(GlobalContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onChangeU = (e) => {
    setUsername(e.target.value);
  };
  const onChangeP = (e) => {
    setPassword(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (props.context === "login") {
      login({ username, password });
    } else if (props.context === "signup") {
      register({ username, password });
    }
  };

  return (
    <div className={styles.step}>
      {current_user.isAuthenticated ? <Redirect to="/"/> : null}
      <div className={styles.art}></div>
      <div className={styles.content}>
        <h1>
          {props.context === "login"
            ? "Login"
            : props.context === "signup"
            ? "Signup"
            : ""}
        </h1>
        <p>
          By continuing, you agree to our <a>User Agreement</a> and{" "}
          <a>Privacy Policy</a>.
        </p>
        <form className={styles.animatedForm}>
          <fieldset>
            <input
              type="text"
              required
              placeholder="Username"
              spellCheck="false"
              value={username}
              onChange={onChangeU}
            />
          </fieldset>
          <fieldset>
            <input
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={onChangeP}
            />
          </fieldset>
          <fieldset>
            <button onClick={onSubmit}>
              {props.context === "login"
                ? "Log In"
                : props.context === "signup"
                ? "Sign Up"
                : ""}
            </button>
          </fieldset>
          {props.context === "login" ? (
            <>
              <div className={styles.bottomText}>
                Forgot your <a>username</a> or <a>password</a>
                &nbsp;?
              </div>
              <div className={styles.bottomText}>
                New to Reddit?{" "}
                <a className={styles.bottomLink}>
                  <Link to="/signup" className={styles.reactLink}>
                    Sign up
                  </Link>
                </a>
              </div>
            </>
          ) : props.context === "signup" ? (
            <>
              <div className={styles.bottomText}></div>
              <div className={styles.bottomText}>
                Already a redditor?{" "}
                <a className={styles.bottomLink}>
                  <Link to="/login" className={styles.reactLink}>
                    Log in
                  </Link>
                </a>
              </div>
            </>
          ) : null}
        </form>
      </div>
    </div>
  );
};
