import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";

// Initial state
const initialState = {
  posts: [],
  error: null,
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

  return (
    <GlobalContext.Provider
      value={{
        posts: state.posts,
        error: state.error,
        getPosts,
        addPost,
        deletePost,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
