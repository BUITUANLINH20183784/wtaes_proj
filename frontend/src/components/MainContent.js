import { makeStyles } from "@material-ui/core";
import React from "react";
import { PostBar } from "./PostBar";
import PostList from "./PostList";
import TopicList from "./TopicList";

const style = {
  alignSelf: "center",
  // backgroundColor: "grey",
  margin: "20px 10%",
  // boxShadow: "0 10px 10px rgba(0, 0, 0, 0.2)",
  // borderRadius: "12px",
  display: "flex",
};

const useStyles = makeStyles((theme) => ({
  root: {
    alignSelf: "center",
    margin: "20px 10%",
		display: "flex",
		justifyContent: "space-around",
		// marginTop: "2rem",
		marginTop: theme.spacing(2),
  },
  postSection: {
		flex: "3",
		maxWidth: "100ch",
		// marginRight: "2rem"
		marginRight: theme.spacing(10),
	},
	topicList: {
		flex: "1",
	}
}));

export const MainContent = () => {
  const classes = useStyles();

  return (
    <>
      <div
        style={{ backgroundColor: "grey", width: "100%", height: "10rem" }}
      />
      <div className={classes.root}>
				<div className={classes.postSection}>
					<PostBar />
					<PostList />
				</div>
				<div style={{ flex: "1" }}>
					<TopicList />
				</div>
      </div>
    </>
  );
};
