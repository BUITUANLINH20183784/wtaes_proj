import React from "react";
import styles from "./Entrance.module.css";

export default (props) => {
  return (
    <div className={styles.step}>
      <div className={styles.art}></div>
      <div className={styles.content}>
        <h1>
          {props.context === "login"
            ? "Login"
            : props.content === "signup"
            ? "Signup"
            : ""}
        </h1>
        <p>
          By continuing, you agree to our <a>User Agreement</a> and{" "}
          <a>Privacy Policy</a>.
        </p>
        <form className={styles.animatedForm} action="/login" method="post">
          <fieldset>
            <input
              id="loginUsername"
              type="text"
              name="username"
              required=""
              placeholder="Username"
            />
          </fieldset>
          <fieldset>
            <input
              id="loginPassword"
              type="text"
              name="password"
              required=""
              placeholder="Password"
            />
          </fieldset>
          <fieldset>
            <button type="submit">
              {props.context === "login"
                ? "Log In"
                : props.context === "signup"
                ? "Sign Up"
                : ""}
            </button>
          </fieldset>
          <div className={styles.bottomText}>
            Forgot your <a>username</a> or <a>password</a>
            &nbsp;?
          </div>
          <div className={styles.bottomText}>
            New to Reddit? <a className={styles.bottomLink}>Sign up</a>
          </div>
        </form>
      </div>
    </div>
  );
};
