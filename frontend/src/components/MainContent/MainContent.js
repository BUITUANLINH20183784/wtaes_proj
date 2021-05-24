import React from "react";
import { CardList } from "./components/CardList/";
import { Post } from "./components/Post/";
import { PostList } from "./components/PostList/";
import { Submit } from "./components/Submit/";
import styles from "./MainContent.module.css";

export default ({ context }) => {
  return (
    <div className={styles.paddingTop}>
      <div className={styles.display}>
        <div className={styles.zIndex}>
          <div className={styles.wrapper}>
            <div className={styles.postList}>
              {
                context === "post" ? <Post /> :
                context === "submit" ? <Submit /> :
                <PostList context={context}/>
              }
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
