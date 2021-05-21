import React from "react";
import { PostList } from "./components/PostList/";
import styles from "./MainContent.module.css";

export default () => {
  return (
    <div className={styles.paddingTop}>
      <div className={styles.display}>
        <div className={styles.zIndex}>
          <div className={styles.wrapper}>
            <div className={styles.postList}>
              <PostList />
            </div>
            <div className={styles.communities}></div>
          </div>
        </div>
      </div>
    </div>
  );
};
