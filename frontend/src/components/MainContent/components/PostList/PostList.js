import React from "react";
import styles from "./PostList.module.css";

export default () => {
  return (
    <div className={styles.container}>
      <div className={styles.post}>
        <div className={styles.vote}>
          <div className={styles.voteGroup} id="vote-arrows">
            <button
              aria-label="upvote"
              aria-pressed="false"
              className={styles.voteButton}
            >
              <span className={styles.buttonSpan}>
                <i className={styles.iconUpvote}></i>
              </span>
            </button>
            <div className={styles.voteCount}>28.2k</div>
            <button
              aria-label="downvote"
              aria-pressed="false"
              className={styles.voteButton}
            >
              <span className={styles.buttonSpan}>
                <i className={styles.iconDownvote}></i>
              </span>
            </button>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.contentMeta}>
            <div className={styles.communityIcon}>
              <a href="/r/something/">
                <img
                  alt="Subreddit Icon"
                  role="presentation"
                  src="https://b.thumbs.redditmedia.com/XIv6AipVy7QRJeVzevFxYwhCwD-0GxmkismT3tTyAZI.png"
                />
              </a>
            </div>
            <div className={styles.infor}>
              <div>
                <div className={styles.name}>
                  <a href="/r/something/" className={styles.community}>
                    r/TwoXChromosomes
                  </a>
                </div>
                <span className={styles.separator}>•</span>
                <span className={styles.misc}>Posted by</span>
                <div className={styles.name}>
                  <a href="/user/ilovecatswastaken/" className={styles.user}>
                    u/ilovecatswastaken
                  </a>
                </div>
                <a className={styles.time}>17 hours ago</a>
              </div>
            </div>
            <button className={styles.buttonJoin}>
              <svg viewBox="0 0 20 20" version="1.1">
                <g stroke="none">
                  <g
                    transform="translate(-34.000000, -136.000000)"
                    fill="inherit"
                  >
                    <path d="M45.2,147.2 L48.8,147.2 C49.46272,147.2 50,146.66272 50,146 C50,145.33728 49.46272,144.8 48.8,144.8 L45.2,144.8 L45.2,141.2 C45.2,140.53728 44.66272,140 44,140 C43.33728,140 42.8,140.53728 42.8,141.2 L42.8,144.8 L39.2,144.8 C38.53728,144.8 38,145.33728 38,146 C38,146.66272 38.53728,147.2 39.2,147.2 L42.8,147.2 L42.8,150.8 C42.8,151.46272 43.33728,152 44,152 C44.66272,152 45.2,151.46272 45.2,150.8 L45.2,147.2 Z"></path>
                  </g>
                </g>
              </svg>
              <span>Join</span>
            </button>
          </div>
          <div className={styles.contentTitle}>
            <div>
              <a href="/">
                <div>
                  You get to go into any fictional universe for 30 days.
                  Anything you buy, skills acquired, etc will be transferred to
                  the real world, with zero reprecussions. Where do you go?
                </div>
              </a>
            </div>
          </div>
          <div className={styles.contentText}>
            <div>
              <div>
                <p>
                  Abortions banned after 6 weeks with extremely rare exceptions.
                  We're looking at lawsuits and ladies, nothing about the men
                  here, except they can sue us for this as well; I guess telling
                  us what to do with our bodies isn't enough! Texas is even
                  pushing for bills that go as far as to give a woman the death
                  penalty for an illegal abortion, but this has not passed
                </p>
              </div>
            </div>
          </div>
          <div className={styles.contentAction}>
            <div>
              <a href="/r/NintendoSwitch/comments/nhr2pe/what_games_have_really_long_gameplay_value/">
                <i></i>
                <span>4.4k comments</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
