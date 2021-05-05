import { Button, makeStyles, TextField } from "@material-ui/core";
import React, { useState, useContext } from "react";
import SendIcon from '@material-ui/icons/Send';

import { GlobalContext } from '../context/GlobalState';

const style = {
  marginTop: "2rem",
};

const useStyles = makeStyles((theme) => ({
  root: {
    // marginTop: "2rem",
		display: "flex",
		marginBottom: theme.spacing(2),
  },
	textInput: {
		// flex: "2",
		// height: "1em",
		width: "100%",
		marginRight: theme.spacing(1),
    boxShadow: "0 4px 3px -3px rgba(0, 0, 0, 0.2)",
	},
	button: {
    // margin: theme.spacing(1),
  },
}));

export const PostBar = () => {
  const classes = useStyles();
	const { addPost } = useContext(GlobalContext);

	const [text, setText] = useState("");

	const onChange = (e) => {
		setText(e.target.value);
	}

	const onClick = (e) => {
		addPost({
			content: text,
			author: "unknown",
		});
		setText("");
	}

  return (
    <div className={classes.root}>
      <TextField label="Create a post" variant="outlined" className={classes.textInput} size="small" value={text} onChange={onChange}/>
			<Button
        variant="contained"
        color="primary"
        className={classes.button}
        endIcon={<SendIcon />}
				onClick={onClick}
      >
        Post
      </Button>
    </div>
  );
};
