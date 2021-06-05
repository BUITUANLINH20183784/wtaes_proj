import React, { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalState";
import "./SearchBar.css";
import avatar from '../../utils/avatar'

export default () => {
  const [dropdown, setDropdown] = useState(false);
  const [text, setText] = useState("")
  // const suggestions = useRef(null)
  // const search = useRef(null)

  // useEffect(() => {
  //   document.addEventListener("click", (e) => {

  //     suggestions
  //   })
  //   return () => {
  //     cleanup
  //   }
  // }, [input])

  return (
    <div className="wrapper" onBlur={() => setDropdown(false)}>
      <div className="searchbar">
        <label className="search-icon">
          <svg
            className="search-icon-svg"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M15.59,13.91l2.78,2.69a1.25,1.25,0,1,1-1.74,1.8l-2.82-2.73a8,8,0,1,1,1.78-1.76ZM14.64,9.2A5.45,5.45,0,1,0,9.2,14.64,5.45,5.45,0,0,0,14.64,9.2Z"></path>
          </svg>
        </label>
        {/* <form action="/" autoComplete="off" method="get"> */}
        <input
          type="search"
          placeholder="Search"
          className="search-input"
          onFocus={() => setDropdown(true)}
          // onBlur={(e) => {
          //   if (suggestions?.current.contains(e.target)) return;
            // setDropdown(false);
          // }}
          // ref={search}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        {/* </form> */}
        {true ? <Suggestions text={text} close={() => setDropdown(false)}/> : null}
      </div>
    </div>
  );
};

const Suggestions = ({ text, close }) => {
  const { users, communities } = useContext(GlobalContext);

  return (
    <div className="suggestions">
      {communities.filter(community => community.name.indexOf(text) >= 0).map(community => <SuggestionItem key={community._id} community={community} close={close}/>)}
      {users.filter(user => user.username.indexOf(text) >= 0).map(user => <SuggestionItem key={user._id} user={user} close={close}/>)}
    </div>
  );
};

const SuggestionItem = ({ user, community, close }) => {
  if (community) return (
    <Link className="suggestion" to={`/r/${community._id}`} onMouseDown={e => e.preventDefault()} onClick={close}>
      <i className="suggestionIcon" />
      <div className="suggestionDetail">
        <div className="title">r/{community.name}</div>
        <div>
          <div className="members">{community.memberCount} members</div>
        </div>
      </div>
    </Link>
  );
  if (user) return (
    <Link className="suggestion" to={`/u/${user._id}`} onMouseDown={e => e.preventDefault()} onClick={close}>
      <i className="suggestionIcon userIcon" style={{content: `url(${avatar(user._id)})`}}/>
      <div className="suggestionDetail">
        <div className="title">u/{user.username}</div>
        {/* <div>
          <div className="members">{" "}</div>
        </div> */}
      </div>
    </Link>
  );
};
