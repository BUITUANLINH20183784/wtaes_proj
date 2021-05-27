import React from "react";
import { useContext, useState } from "react";
import { Redirect, withRouter } from "react-router";
import { GlobalContext } from "../../../../context/GlobalState";
import styles from "./Submit.module.css";

const ChooseCommunity = ({ communities, community, setCommunity }) => {
  const [name, setName] = useState("");
  const onChange = (e) => {
    setName(e.target.value)
    setCommunity(communities.find(community => community.name === name))
  }

  return (
    <div className={styles.chooseCommunityArea}>
      <div className={styles.chooseCommunityContainer}>
        <i
          alt="Subreddit Icon"
          className={styles.chooseCommunityI}
        />
        <input onChange={onChange} value={name} className={styles.chooseCommunityInput} placeholder="Choose a community" spellcheck="false"></input>
        <svg className={styles.chooseCommunityDrop} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M14.17,9.35,10,13.53,5.83,9.35a.5.5,0,0,1,.35-.85h7.64a.5.5,0,0,1,.35.85"></path></svg>
      </div>
    </div>
  );
};

const CreateArea = ({ community, addPost }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const onChangeTitle = (e) => setTitle(e.target.value)
  const onChangeContent = (e) => setContent(e.target.value)

  // const Title = () => (
  //   <textarea
  //     maxlength="300"
  //     placeholder="Title"
  //     className={styles.createTitle}
  //     rows="1"
  //     value={title}
  //     onChange={onChangeTitle}
  //   ></textarea>
  // );

  // const CreateContent = () => (
  //   <textarea
  //     className={styles.createContent}
  //     placeholder="Text (optional)"
  //     value={content}
  //     onChange={onChangeContent}
  //     ></textarea>
  // );

  // const ThemeButton = ({ text }) => (
  //   <button className={styles.themeButton}>{text}</button>
  // );

  return (
    <div className={styles.createAreaContainer}>
      <div className={styles.createArea}>
        <textarea
          maxlength="300"
          placeholder="Title"
          className={styles.createTitle}
          rows="1"
          value={title}
          onChange={onChangeTitle}
        ></textarea>
        <textarea
          className={styles.createContent}
          placeholder="Text (optional)"
          value={content}
          onChange={onChangeContent}
        ></textarea>
        <button onClick={addPost} className={styles.themeButton} style={community ? {} : {background: "grey"}}>Post</button>
      </div>
    </div>
  );
};

const Submit = () => {
  const { current_user, communities, addPost } = useContext(GlobalContext)
  const [community, setCommunity] = useState(null)

  const [name, setName] = useState("");
  const onChange = (e) => {
    setName(e.target.value)
    setCommunity(communities.find(community => community.name === name))
  }
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const onChangeTitle = (e) => setTitle(e.target.value)
  const onChangeContent = (e) => setContent(e.target.value)

  const [submitted, setSubmitted] = useState(false)
  
  if (!current_user.isAuthenticated) return <Redirect to="/login"/>
  if (!current_user || !communities) return null;

  const onSubmit = () => {
    if (community) {
      addPost({
        title,
        content,
        communityID: community._id
      })
      setSubmitted(true)
    }
  }

  return (
    <div>
      {submitted ? <Redirect to={`/r/${community._id}`}/> : null}
      {/* <ChooseCommunity communities={communities} community={community} setCommunity={setCommunity} /> */}
      <div className={styles.chooseCommunityArea}>
        <div className={styles.chooseCommunityContainer}>
          <i
            alt="Subreddit Icon"
            className={styles.chooseCommunityI}
          />
          <input onChange={onChange} value={name} className={styles.chooseCommunityInput} placeholder="Choose a community" spellcheck="false"></input>
          <svg className={styles.chooseCommunityDrop} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M14.17,9.35,10,13.53,5.83,9.35a.5.5,0,0,1,.35-.85h7.64a.5.5,0,0,1,.35.85"></path></svg>
        </div>
      </div>
      {/* <CreateArea community={community} addPost={onSubmit} /> */}
      <div className={styles.createAreaContainer}>
        <div className={styles.createArea}>
          <textarea
            maxLength="300"
            placeholder="Title"
            className={styles.createTitle}
            rows="1"
            value={title}
            onChange={onChangeTitle}
          ></textarea>
          <textarea
            className={styles.createContent}
            placeholder="Text (optional)"
            value={content}
            onChange={onChangeContent}
          ></textarea>
          <button onClick={onSubmit} className={styles.themeButton} style={community ? {} : {background: "grey"}}>Post</button>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Submit)