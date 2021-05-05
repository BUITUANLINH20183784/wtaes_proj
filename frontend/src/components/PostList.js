import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import { GlobalContext } from '../context/GlobalState';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '100ch',
    backgroundColor: theme.palette.background.paper,
    boxShadow: "0 10px 10px rgba(0, 0, 0, 0.2)",
    // boxShadow: theme.shadows,
    borderRadius: "12px",
  },
  inline: {
    display: 'inline',
  },
}));

export default function PostList() {
  const classes = useStyles();
  const { posts, getPosts, deletePost } = useContext(GlobalContext);
  // getPosts();
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <List className={classes.root}>
      {posts.map((post, index) => (
        <>
          {(() => {
            if (index > 0)
              return (<Divider variant="inset" component="li" />)
          })()}
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt={post.author} src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary={post.author}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {post.dateCreated}
                  </Typography>
                  {" — " + post.content}
                </React.Fragment>
              }
            />
            <IconButton aria-label="delete" className={classes.margin} onClick={(e) => {
              deletePost(post._id)
            }}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </ListItem>
        </>
      ))}
    </List>
  );
}
