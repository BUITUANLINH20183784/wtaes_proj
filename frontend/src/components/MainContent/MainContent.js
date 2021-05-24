import React from "react";
import { CardList } from "./components/CardList/";
import { PostList } from "./components/PostList/";
import styles from "./MainContent.module.css";

export default ({ context }) => {
  return (
    <div className={styles.paddingTop}>
      <div className={styles.display}>
        <div className={styles.zIndex}>
          <div className={styles.wrapper}>
            <div className={styles.postList}>
              <PostList />
            </div>
            <div className={styles.communities}>
              <CardList context={context}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
