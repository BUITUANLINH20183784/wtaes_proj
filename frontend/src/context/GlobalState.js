import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
// import axios from "axios"
import axios from '../utils/axios'
import config from '../config/config'

// Initial state
const initialState = {
  posts: [],
  communities: [],
  comments: [],
  users: [],
  error: null,
  current_user: {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    user: null
  },
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Posts
  const getPosts = async () => {
    try {
      const res = await axios.get(`${config.SERVER_URL}api/posts`);
      // const res = await (await fetch(`${config.SERVER_URL}api/posts`, {
      //   method: "GET",
      // })).json()
      dispatch({
        type: "GET_POSTS",
        payload: res.data.data,
        // payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: "POST_ERROR",
        payload: error.response.data.error,
      });
    }
  };

  const addPost = async (post) => {
    try {
      const res = await axios.post(`${config.SERVER_URL}api/posts`, post, tokenConfig());
      dispatch({
        type: "ADD_POST",
        payload: res.data.data,
      });
      dispatch({
        type: "UPDATE_COMMUNITY",
        payload: res.data.community,
      });
      dispatch({
        type: "USER_UPDATED",
        payload: res.data.user,
      });
    } catch (error) {
      dispatch({
        type: "POST_ERROR",
        payload: error.response.data.error,
      });
    }
  };

  const votePost = async vote => {
    try {
      const res = await axios.post(`${config.SERVER_URL}api/posts/vote`, vote, tokenConfig());
      dispatch({
        type: "UPDATE_POST",
        payload: res.data.post
      })
    } catch (error) {
      dispatch({
        type: "POST_ERROR",
        payload: error.response.data.error,
      });
    }
  }

  const deletePost = async (id) => {
    try {
      await axios.delete(`${config.SERVER_URL}api/posts/${id}`);
      dispatch({
        type: "DELETE_POST",
        payload: id,
      });
    } catch (error) {
      dispatch({
        type: "POST_ERROR",
        payload: error.response.data.error,
      });
    }
  };

  // Auth
  const tokenConfig = () => {
    const token = state.current_user.token;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (token) {
      config.headers["x-auth-token"] = token;
    }
    return config;
  }

  const loadUser = () => {
    axios.get(`${config.SERVER_URL}api/auth/user`, tokenConfig())
      .then(res => {
        dispatch({
          type: "USER_LOADED",
          payload: res.data
        })
        // console.log(`res.data`, res.data)
        // console.log(`tokenConfig()`, tokenConfig())
      })
      .catch(error => {
        dispatch({
          type: "AUTH_ERROR",
        })
      })
  }

  const register = (body) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    // const body = JSON.stringify({ username, password });
    axios.post(`${config.SERVER_URL}api/users`, body, config)
      .then(res => dispatch({
        type: "REGISTER_SUCCESS",
        payload: res.data
      }))
      .catch(error => {
        dispatch({
          type: "REGISTER_FAIL",
        })
      })
  }

  const logout = () => {
    dispatch({
      type: "LOGOUT_SUCCESS",
    });
  }

  const login = (body) => {
    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // };
    // const body = JSON.stringify({ username, password });
    axios.post(`${config.SERVER_URL}api/auth`, body, tokenConfig())
      .then(res => {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: res.data
        })
        console.log(`res.data`, res.data)
      })
      .catch(error => {
        dispatch({
          type: "LOGIN_FAIL",
        })
      })
  }

  // Communities
  const getCommunities = async () => {
    try {
      const res = await axios.get(`${config.SERVER_URL}api/communities`);
      // console.log(`res`, res)
      dispatch({
        type: "GET_COMMUNITIES",
        payload: res.data.data,
      });
    } catch (error) {
      dispatch({
        type: "COMMUNITY_ERROR",
        payload: error.response.data.error,
      });
    }
  };

  const addCommunity = async (community) => {
    try {
      const res = await axios.post(`${config.SERVER_URL}api/communities`, community, tokenConfig());
      dispatch({
        type: "ADD_COMMUNITY",
        payload: res.data.data,
      });
      dispatch({
        type: "USER_UPDATED",
        payload: res.data.user,
      });
    } catch (error) {
      dispatch({
        type: "COMMUNITY_ERROR",
        payload: error.response.data.error,
      });
    }
  };

  const updateMember = async membership => {
    try {
      const res = await axios.post(`${config.SERVER_URL}api/communities/member`, membership, tokenConfig());
      dispatch({
        type: "UPDATE_COMMUNITY",
        payload: res.data.community,
      })
      dispatch({
        type: "USER_UPDATED",
        payload: res.data.user,
      })
    } catch (error) {
      dispatch({
        type: "COMMUNITY_ERROR",
        payload: error.response.data.error,
      });
    }
  } 

  // Comments
  const getComments = async () => {
    try {
      const res = await axios.get(`${config.SERVER_URL}api/comments`);
      dispatch({
        type: "GET_COMMENTS",
        payload: res.data.data,
      });
    } catch (error) {
      dispatch({
        type: "COMMENT_ERROR",
        payload: error.response.data.error,
      });
    }
  };

  const addComment = async (comment) => {
    try {
      const res = await axios.post(`${config.SERVER_URL}api/comments`, comment, tokenConfig());
      dispatch({
        type: "ADD_COMMENT",
        payload: res.data.data,
      });
      dispatch({
        type: "UPDATE_POST",
        payload: res.data.post,
      });
      dispatch({
        type: "USER_UPDATED",
        payload: res.data.user,
      });
    } catch (error) {
      dispatch({
        type: "COMMENT_ERROR",
        payload: error.response.data.error,
      });
    }
  };

  const voteComment = async vote => {
    try {
      const res = await axios.post(`${config.SERVER_URL}api/comments/vote`, vote, tokenConfig());
      dispatch({
        type: "UPDATE_COMMENT",
        payload: res.data.comment
      })
    } catch (error) {
      dispatch({
        type: "COMMENT_ERROR",
        payload: error.response.data.error,
      });
    }
  }

  // Users
  const getUsers = async () => {
    try {
      const res = await axios.get(`${config.SERVER_URL}api/users`);
      dispatch({
        type: "GET_USERS",
        payload: res.data.data,
      });
    } catch (error) {
      dispatch({
        type: "USER_ERROR",
        payload: error.response.data.error,
      });
    }
  };
  const sendMessage = async (message) => {
    try {
      const res = await axios.post(`${config.SERVER_URL}api/messages`, message, tokenConfig());
      dispatch({
        type: "UPDATE_USER",
        payload: res.data.receiver,
      })
      dispatch({
        type: "USER_UPDATED",
        payload: res.data.sender,
      })
    } catch (error) {
      dispatch({
        type: "USER_ERROR",
        payload: error.response.data.error,
      });
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        posts: state.posts,
        communities: state.communities,
        comments: state.comments,
        users: state.users,
        error: state.error,
        current_user: state.current_user,
        getPosts,
        addPost,
        votePost,
        // deletePost,
        getCommunities,
        addCommunity,
        updateMember,
        getComments,
        addComment,
        voteComment,
        getUsers,
        sendMessage,
        loadUser,
        register,
        logout,
        login,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const withGlobal = (Component) => () => (<GlobalProvider><Component/></GlobalProvider>)