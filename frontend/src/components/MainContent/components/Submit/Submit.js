import React, { useEffect } from "react";
import { useContext, useState } from "react";
import { Redirect, withRouter } from "react-router";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../../../context/GlobalState";
import styles from "./Submit.module.css";

const Submit = ({ match, history }) => {
  const { current_user, communities, addPost } = useContext(GlobalContext)
  // const [community, setCommunity] = useState(null)
  const community = communities?.find(community => community._id === match.params.id)

  const [name, setName] = useState("");
  const onChange = (e) => {
    setName(e.target.value)
    // setCommunity(communities.find(community => community.name === name))
  }

  useEffect(() => {
    setName(community?.name)
  }, [community])
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const onChangeTitle = (e) => setTitle(e.target.value)
  const onChangeContent = (e) => setContent(e.target.value)

  // const [submitted, setSubmitted] = useState(false)
  const [drop, setDrop] = useState(false);
  
  if (!current_user.isAuthenticated) return <Redirect to="/login"/>
  if (!current_user || !communities) return null;

  const onSubmit = () => {
    if (community) {
      addPost({
        title,
        content,
        communityID: community._id
      })
      history.push(`/r/${community._id}`)
      // setSubmitted(true)
    }
  }

  return (
    <div className={styles.mainContainer}>
      {/* {submitted ? <Redirect to={`/r/${community._id}`}/> : null} */}
      <div className={styles.chooseCommunityArea}>
        <div className={styles.chooseCommunityContainer}>
          <i
            alt="Subreddit Icon"
            className={styles.chooseCommunityI}
          />
          <input onFocus={() => setDrop(true)} onBlur={() => setDrop(false)} onChange={onChange} value={name} className={styles.chooseCommunityInput} placeholder="Choose a community" spellcheck="false"></input>
          <svg className={styles.chooseCommunityDrop} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M14.17,9.35,10,13.53,5.83,9.35a.5.5,0,0,1,.35-.85h7.64a.5.5,0,0,1,.35.85"></path></svg>
        </div>
      </div>
      {drop ? <Dropdown text={name} close={() => setDrop(false)} /> : null}
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

const Dropdown = ({ text, close }) => {
  const { communities } = useContext(GlobalContext)

  return (
    <div className={styles.dropdown}>
      {communities?.filter(community => community.name.indexOf(text) >= 0).map(community => (
        <Link className={styles.suggestion} to={`/s/${community._id}`} onMouseDown={e => e.preventDefault()} onClick={close}>
          <i className={styles.suggestionIcon} />
          <div className={styles.suggestionDetail}>
            <div className={styles.title}>r/{community.name}</div>
            <div>
              <div className={styles.members}>{community.memberCount} members</div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default withRouter(Submit)