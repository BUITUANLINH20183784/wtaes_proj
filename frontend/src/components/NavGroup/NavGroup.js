import React from "react";
import "./NavGroup.css";

export default () => {
  return (
    <div class="wrapper">
      <div class="nav-group">
        <div class="buttons">
          <a
            role="button"
            tabIndex="0"
            href="https://www.reddit.com/login/?dest=https%3A%2F%2Fwww.reddit.com%2F"
            className="button-login button"
          >
            Log In
          </a>
          <a
            role="button"
            tabIndex="0"
            href="https://www.reddit.com/register/?dest=https%3A%2F%2Fwww.reddit.com%2F"
            className="button-signup button"
          >
            Sign Up
          </a>
        </div>
        <div
          id="email-verification-tooltip-id"
          className="XZK-LTFT5CgGo9MvPQQsy U3FRqDA_Qhr4icbaNXSuf"
        >
          <div
            id="change-username-tooltip-id"
            class="XZK-LTFT5CgGo9MvPQQsy _20HfCAFz3ot1MW1o29ZoGZ"
          ></div>
          <div class="header-user-dropdown">
            <button
              aria-expanded="false"
              aria-haspopup="true"
              id="USER_DROPDOWN_ID"
              class="_10K5i7NW6qcm-UoCtpB3aK _1pA8z73SZ1olP5KMKFN4_Z _18X7KoiaLuKbuLqg4zE8BH "
            >
              <span class="DFKWwVItcycZV1bKUOyay">
                <span class="_3KfbpxpA8Esu_3UHTmIvfw _22SL37yETIW414yUiZj27w">
                  <svg
                    viewBox="0 0 250 250"
                    xmlns="http://www.w3.org/2000/svg"
                    class="VIlSggfRUkuuHTKa_h8jp"
                  >
                    <g fill="inherit">
                      <path d="M146.8 142.6h-37.6c-31.1 0-56.5 25.3-56.5 56.5 0 5.2 4.2 9.4 9.4 9.4h131.8c5.2 0 9.4-4.2 9.4-9.4 0-31.2-25.3-56.5-56.5-56.5zM128 130.7c20.1 0 36.4-16.3 36.4-36.4v-9.4c0-20.1-16.3-36.4-36.4-36.4S91.6 64.8 91.6 84.9v9.4c0 20.1 16.3 36.4 36.4 36.4z"></path>
                    </g>
                  </svg>
                </span>
                <svg
                  class="XHbKeEqnW58ib9mTN6jnS u_kypUXmB-k1A5TcC8MI9 _50RxI-5rW1xzwoC42vhzM"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M14.17,9.35,10,13.53,5.83,9.35a.5.5,0,0,1,.35-.85h7.64a.5.5,0,0,1,.35.85"></path>
                </svg>
              </span>
              <span class="_1RIl585IYPW6cmNXwgRz0J">User account menu</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
