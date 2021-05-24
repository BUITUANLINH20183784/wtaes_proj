import React from "react";
import styles from "./Submit.module.css";

const ChooseCommunity = () => {
  return (
    <div className={styles.chooseCommunityArea}>
      <div className={styles.chooseCommunityContainer}>
        <img
          alt="Subreddit Icon"
          src="https://styles.redditmedia.com/t5_2qhva/styles/communityIcon_ilf7iae3i9941.png?width=256&amp;s=31ae75c0e4958e9612f52d941accf19d24990c44"
          className={styles.chooseCommunityIcon}
        />
        <input className={styles.chooseCommunityInput} placeholder="Choose a community" spellcheck="false" value="r/hacking"></input>
        <svg className={styles.chooseCommunityDrop} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M14.17,9.35,10,13.53,5.83,9.35a.5.5,0,0,1,.35-.85h7.64a.5.5,0,0,1,.35.85"></path></svg>
      </div>
    </div>
  );
};

const CreateArea = () => {
  const Title = () => (
    <textarea
      maxlength="300"
      placeholder="Title"
      className={styles.createTitle}
      rows="1"
    ></textarea>
  );

  const CreateContent = () => (
    <textarea
      className={styles.createContent}
      placeholder="Text (optional)"
    ></textarea>
  );

  const ThemeButton = ({ text }) => (
    <button className={styles.themeButton}>{text}</button>
  );

  return (
    <div className={styles.createAreaContainer}>
      <div className={styles.createArea}>
        <Title />
        <CreateContent />
        <ThemeButton text="Post" />
      </div>
    </div>
  );
};

export default () => {
  return (
    <div>
      <ChooseCommunity />
      <CreateArea />
    </div>
  );
};
