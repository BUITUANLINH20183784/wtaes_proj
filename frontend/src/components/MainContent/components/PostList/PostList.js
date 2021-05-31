import React, { useContext } from "react";
import styles from "./PostList.module.css";
import { GlobalContext } from "../../../../context/GlobalState";
import { Link, withRouter } from "react-router-dom";

const PostList = ({ context, match }) => {
  const { posts, communities, users, current_user, updateMember } = useContext(GlobalContext);

  if (!posts || !communities || !users) return null;
  
  var list = posts;
  switch (context) {
    case "community":
      list = posts.filter(post => post.communityID === match.params.id)
      break;
    case "user":
      list = posts.filter(post => post.authorID === match.params.id)
      break;
    default:
      list = posts;
      break;
  }

  const Post = ({ data }) => {
    const community = communities.find(community => community._id == data.communityID)
    const author = users.find(user => user._id == data.authorID)

    if (!community || !author) return null

    return (
      <div className={styles.post}>
        <div className={styles.vote}>
          <div className={styles.voteGroup} id="vote-arrows">
            <button
              aria-label="upvote"
              aria-pressed="false"
              className={styles.voteButton}
            >
              <span className={styles.buttonSpan}>
                <i className={styles.iconUpvote}></i>
              </span>
            </button>
            <div className={styles.voteCount}>{data.voteCount}</div>
            <button
              aria-label="downvote"
              aria-pressed="false"
              className={styles.voteButton}
            >
              <span className={styles.buttonSpan}>
                <i className={styles.iconDownvote}></i>
              </span>
            </button>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.contentMeta}>
            <div className={styles.communityIcon}>
              <a>
                <img
                  alt="Subreddit Icon"
                  role="presentation"
                  src="https://b.thumbs.redditmedia.com/XIv6AipVy7QRJeVzevFxYwhCwD-0GxmkismT3tTyAZI.png"
                />
              </a>
            </div>
            <div className={styles.infor}>
              <div>
                <div className={styles.name}>
                  <Link className={styles.communityName} to={`/r/${community._id}`}>
                    r/{community ? community.name : null}
                  </Link>
                </div>
                <span className={styles.separator}>•</span>
                <span className={styles.misc}>Posted by</span>
                <div className={styles.name}>
                  <Link to={`/u/${data.authorID}`} className={styles.user}>
                    u/{author ? author.username : null}
                  </Link>
                </div>
                <a className={styles.time}>{new Date(data.dateCreated).toLocaleDateString("en-US")}</a>
              </div>
            </div>
            {current_user.user?.joinedCommunityID.find(id => id === data.communityID) || !current_user.user ? null : <button className={styles.buttonJoin} onClick={() => {
              updateMember({
                status: "join",
                communityID: data.communityID
              })
            }}>
              <svg viewBox="0 0 20 20" version="1.1">
                <g stroke="none">
                  <g
                    transform="translate(-34.000000, -136.000000)"
                    fill="inherit"
                  >
                    <path d="M45.2,147.2 L48.8,147.2 C49.46272,147.2 50,146.66272 50,146 C50,145.33728 49.46272,144.8 48.8,144.8 L45.2,144.8 L45.2,141.2 C45.2,140.53728 44.66272,140 44,140 C43.33728,140 42.8,140.53728 42.8,141.2 L42.8,144.8 L39.2,144.8 C38.53728,144.8 38,145.33728 38,146 C38,146.66272 38.53728,147.2 39.2,147.2 L42.8,147.2 L42.8,150.8 C42.8,151.46272 43.33728,152 44,152 C44.66272,152 45.2,151.46272 45.2,150.8 L45.2,147.2 Z"></path>
                  </g>
                </g>
              </svg>
              <span>Join</span>
            </button>}
          </div>
          <div className={styles.contentTitle}>
            <div>
              <Link to={`/p/${data._id}`}>
                <div>
                  {data.title}
                </div>
              </Link>
            </div>
          </div>
          <div className={styles.contentText}>
            <div>
              <div>
                <p>
                  {data.content}
                </p>
              </div>
            </div>
          </div>
          <div className={styles.contentAction}>
            <div>
              <a href="/r/NintendoSwitch/comments/nhr2pe/what_games_have_really_long_gameplay_value/">
                <i></i>
                <span>{data.commentID.length} comments</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      {list.map(post => <Post key={post._id} data={post}/>)}
    </div>
  );
};

export default withRouter(PostList)