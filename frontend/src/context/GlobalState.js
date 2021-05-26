import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";

// Initial state
const initialState = {
  posts: [],
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

  // Actions
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
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/posts", post, config);
      dispatch({
        type: "ADD_POST",
        payload: res.data.data,
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
  const loadUser = () => {
    const token = state.current_user.token;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (token) {
      config.headers["x-auth-token"] = token;
    }
    axios.get("api/auth/user", config)
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

  return (
    <GlobalContext.Provider
      value={{
        posts: state.posts,
        error: state.error,
        current_user: state.current_user,
        getPosts,
        addPost,
        // deletePost,
        loadUser,
        register,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const withGlobal = (Component) => () => (<GlobalProvider><Component/></GlobalProvider>)