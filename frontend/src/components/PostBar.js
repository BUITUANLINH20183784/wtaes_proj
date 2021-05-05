import { Button, Icon, makeStyles, TextField } from "@material-ui/core";
import React from "react";
import SendIcon from '@material-ui/icons/Send';

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
		marginRight: theme.spacing(1)
	},
	button: {
    // margin: theme.spacing(1),
  },
}));

export const PostBar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TextField label="Create a post" variant="outlined" className={classes.textInput} size="small"/>
			<Button
        variant="contained"
        color="primary"
        className={classes.button}
        endIcon={<SendIcon />}
      >
        Post
      </Button>
    </div>
  );
};
