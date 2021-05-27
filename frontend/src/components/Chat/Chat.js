import React, { useContext, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import styles from "./Chat.module.css";
import { GlobalContext } from "../../context/GlobalState";

const Chat = () => {
  const { users, current_user, sendMessage } = useContext(GlobalContext)
  const [index, setIndex] = useState(0)
  if (!users) return null
  if (!current_user.isAuthenticated) return <Redirect to="/login" />

  return (
    <div className={styles.container}>
      <div className={styles.conversationContainer}>
        <div className={styles.conversationHeader}>Chat</div>
        <ConversationList index={index} setIndex={setIndex} users={users} conversations={!current_user.user ? null : current_user.user.conversation} />
      </div>
      <div className={styles.messageRegionContainer}>
        <nav className={styles.messageRegionHeaderContainer}>
          <span className={styles.messageRegionHeader}>{!current_user.user ? null : current_user.user.username}</span>
        </nav>
        <MessageRegion messages={null} />
        <div className={styles.paddingSeparator}></div>
        <MessageInput sendMessage={sendMessage} />
      </div>
    </div>
  );
};

export default Chat;

const ConversationList = ({ conversations, users, index, setIndex }) => {
  const [counter, setCounter] = useState(-1)

  return (
    <div className={styles.conversationListContainer}>
      {conversations.map(conversation => <Link className={styles.conversationItem} key={function() {
        setCounter(counter + 1);
        return counter;
      }()} style={counter === index ? {background: "rgb(237 239 241"}: null} onClick={setIndex(key)}>
        <span className={styles.userAvatar}>
          <i/>
        </span>
        <div className={styles.userPeak}>
          <h4>{users.find(user => user._id === conversation.userID).username}</h4>
          <div>{conversation.message[0].content}</div>
        </div>
      </Link>)}
    </div>
  );
}

const MessageRegion = () => {
  const UserMeta = () => (
    <Link className={styles.userMeta}>
      <img
        className={styles.messageUserAvatar}
        src="https://www.redditstatic.com/avatars/avatar_default_08_545452.png"
      ></img>
      <span className={styles.messageUserName}>Okay</span>
      <time
        className={styles.messageTime}
        datetime="2021-05-25T11:24:34.603Z"
        title="5/25/2021, 6:24:34 PM"
      >
        06:24 PM
      </time>
    </Link>
  );

  const Message = () => (
    <div className={styles.messageContainer}>
      <div className={styles.message}>Hospknfasknpaf</div>
    </div>
  );

  return (
    <div className={styles.messageRegion}>
      <div className={styles.messageList}>
        <UserMeta />
        <Message />
      </div>
    </div>
  );
};

const MessageInput = ({ sendMessage }) => {
  const [message, setMessage] = useState("")

  return (
    <div className={styles.messageInputContainer}>
      <div className={styles.messageTextContainer}>
        <textarea
          rows="1"
          autocorrect="off"
          autocomplete="off"
          placeholder="Message"
          className={styles.messageTextInput}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
      </div>
      <button className={styles.sendButton} onClick={() => {
        sendMessage(message);
        setMessage("");
      }}>
        <svg viewBox="0 0 24 24">
          <path d="M22.6559 10.8L2.39994 0.65995C2.15389 0.529239 1.87278 0.47974 1.59687 0.518539C1.32096 0.557338 1.06441 0.682447 0.863944 0.87595C0.656797 1.06381 0.51403 1.3121 0.455877 1.58564C0.397725 1.85917 0.427136 2.14407 0.539944 2.39995L4.58394 12L0.539944 21.6C0.429918 21.8544 0.401998 22.1368 0.460075 22.4078C0.518153 22.6788 0.659334 22.925 0.863944 23.112C1.10992 23.3469 1.43582 23.4798 1.77594 23.484C1.99315 23.4934 2.20883 23.4436 2.39994 23.34L22.6559 13.2C22.8781 13.0879 23.0648 12.9164 23.1952 12.7045C23.3256 12.4927 23.3947 12.2487 23.3947 12C23.3947 11.7512 23.3256 11.5072 23.1952 11.2954C23.0648 11.0835 22.8781 10.912 22.6559 10.8Z"></path>
        </svg>
      </button>
    </div>
  );
}
