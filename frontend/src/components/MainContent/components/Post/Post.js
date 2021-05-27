import React, { useContext, useState } from "react";
import styles from "./Post.module.css";
import { Link, withRouter } from "react-router-dom";
import { GlobalContext } from "../../../../context/GlobalState";

const Post = ({ match }) => {
  const { posts, current_user, addComment, communities, users, comments } = useContext(GlobalContext)
  const post = posts.find(post => post._id == match.params.id)
  const community = post ? communities.find(community => community._id === post.communityID) : null
  const author = post ? users.find(user => user._id === post.authorID) : null
  const commentList = !post ? null : post.commentID.map(id => comments.find(comment => comment._id === id))

  return (
    <div className={styles.threadContainer}>
      <MainPost post={post} community={community} author={author} user={current_user.user}/>
      <div className={styles.threadSeparator}></div>
      {!current_user.user ? null : <UserComment user={current_user.user} addComment={addComment} post={post}/>}
      <hr className={styles.commentSeparator}></hr>
      <CommentList post={post} comments={commentList} users={users}/>
    </div>
  );
};

export default withRouter(Post)

const MainPost = ({ post, community, author, user }) => {
  const VoteRegion = () => (
    <div className={styles.vote}>
      <div className={styles.voteGroup}>
        <button className={styles.voteButton}>
          <span className={styles.buttonSpan}>
            <i className={styles.iconUpvote}></i>
          </span>
        </button>
        <div className={styles.voteCount}>{post ? post.voteCount : 0}</div>
        <button className={styles.voteButton}>
          <span className={styles.buttonSpan}>
            <i className={styles.iconDownvote}></i>
          </span>
        </button>
      </div>
    </div>
  );

  const ContentMeta = () => (
    <div className={styles.contentMeta}>
      <div className={styles.communityIcon}>
        <a>
          <img
            alt="Subreddit Icon"
            src="https://b.thumbs.redditmedia.com/XIv6AipVy7QRJeVzevFxYwhCwD-0GxmkismT3tTyAZI.png"
          />
        </a>
      </div>
      <div className={styles.infor}>
        <div>
          <div className={styles.name}>
            <a href="/r/something/" className={styles.community}>
              r/{community ? community.name : null}
            </a>
          </div>
          <span className={styles.separator}>•</span>
          <span className={styles.misc}>Posted by</span>
          <div className={styles.name}>
            <a href="/user/ilovecatswastaken/" className={styles.user}>
              u/{author ? author.username : null}
            </a>
          </div>
          <a className={styles.time}>{post ? new Date(post.dateCreated).toLocaleDateString("en-US") : null}</a>
        </div>
      </div>
      {!user ? null : !user.joinedCommunityID ? null : !user.joinedCommunityID.find(id => id === community._id) ? null : <button className={styles.buttonJoin}>
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
  )

  return (
    <div className={styles.postContainer}>
      <div>
        <div className={styles.post}>
          <VoteRegion />
          <div className={styles.content}>
            <ContentMeta />
            <div className={styles.contentTitle}>
              <div>
                <a>
                  <div>
                    {!post ? null : post.title}
                  </div>
                </a>
              </div>
            </div>
            <div className={styles.contentText}>
              <div>
                <div>
                  <p>
                    {!post ? null : post.content}
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.contentAction}>
              <div>
                <a href="/r/NintendoSwitch/comments/nhr2pe/what_games_have_really_long_gameplay_value/">
                  <i></i>
                  <span>{!post ? null : !post.commentID ? null : post.commentID.length} comments</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const UserComment = ({ user, addComment, post }) => {
  const [content, setContent] = useState("")
  const onChange = (e) => {
    setContent(e.target.value)
  }
  const onSubmit = () => {
    setContent("")
    addComment({
      postID: post._id,
      content,
    })
  }

  return (
    <div className={styles.userCommentRegion}>
      <div className={styles.commentAs}>
        Comment As <Link className={styles.commentAsLink}>{!user ? null : user.username}</Link>
      </div>
      <textarea className={styles.userCommentBox} value={content} onChange={onChange}>
      </textarea>
      <button className={styles.commentButton} onClick={onSubmit}>Comment</button>
    </div>
  )
}

const CommentList = ({ comments, users }) => {
  const commentList = !comments ? null : comments.map(comment => ({
    comment,
    author: !users ? null : users.find(user => user._id === comment.authorID)
  }))

  const CommentAvatar = () => (
    <Link className={styles.commentAvatarLink}>
      <img alt="User avatar" className={styles.commentAvatar} src="https://www.redditstatic.com/avatars/avatar_default_03_A06A42.png"></img>
    </Link>
  )

  const CommentDetail = ({ data }) => (
    <div className={styles.commentDetailContainer}>
      <div className={styles.commentMeta}>
        <Link className={styles.commentAuthorLink} to={`/u/${!data.author ? null : data.author._id}`}>{!data.author ? null : data.author.username}</Link>
        <Link className={styles.commentMetaTime}>{!data.comment ? null : new Date(data.comment.dateCreated).toLocaleDateString("en-US")}</Link>
      </div>
      <div className={styles.commentContent}>
        <p>{!data.comment ? null : data.comment.content}</p>
      </div>
      <div className={styles.commentAction}>
        <div className={styles.commentVoteRegion}>
          <button className={styles.buttonUpvote}><i/></button>
          <div className={styles.commentVoteCount}>{!data.comment ? null : data.comment.voteCount}</div>
          <button className={styles.buttonDownvote}><i/></button>
        </div>
      </div>
    </div>
  )

  return (
    <div className={styles.commentListContainer}>
      {!commentList ? null : commentList.map(comment => <div className={styles.comment}>
        <CommentAvatar data={comment} />
        <CommentDetail data={comment} />
      </div>)}
    </div>
  )
}