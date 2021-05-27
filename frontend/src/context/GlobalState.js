import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";

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
      const res = await axios.get("/api/posts");
      dispatch({
        type: "GET_POSTS",
        payload: res.data.data,
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
      const res = await axios.post("/api/posts", post, tokenConfig());
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

  const deletePost = async (id) => {
    try {
      await axios.delete(`/api/posts/${id}`);
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
    axios.get("api/auth/user", tokenConfig())
      .then(res => dispatch({
        type: "USER_LOADED",
        payload: res.data
      }))
      .catch(error => {
        dispatch({
          type: "AUTH_ERROR",
        })
      })
  }

  const register = ({ username, password }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ username, password });
    axios.post("api/users", body, config)
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

  const login = ({ username, password }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ username, password });
    axios.post("api/auth", body, config)
      .then(res => dispatch({
        type: "LOGIN_SUCCESS",
        payload: res.data
      }))
      .catch(error => {
        dispatch({
          type: "LOGIN_FAIL",
        })
      })
  }

  // Communities
  const getCommunities = async () => {
    try {
      const res = await axios.get("/api/communities");
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
      const res = await axios.post("/api/communities", community, tokenConfig());
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

  // Comments
  const getComments = async () => {
    try {
      const res = await axios.get("/api/comments");
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
      const res = await axios.post("/api/comments", comment, tokenConfig());
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

  // Users
  const getUsers = async () => {
    try {
      const res = await axios.get("/api/users");
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
        // deletePost,
        getCommunities,
        addCommunity,
        getComments,
        addComment,
        getUsers,
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