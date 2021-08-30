import React, { useEffect, useState, useRef } from "react";
import { useChannel } from "../../util/hooks/AblyReactEffect";
import styles from "./AblyChatComponent.module.css";
import { Typography } from "@material-ui/core";

const AblyChatComponent = (props) => {
  let inputBox = useRef();
  let messageEnd = useRef();

  const [messageText, setMessageText] = useState("");
  const [receivedMessages, setMessages] = useState([]);
  const messageTextIsEmpty = messageText.trim().length === 0;

  const [msgLoading, setMsgLoading] = useState(true);
  // info for message history entries retrieved from props
  const channelName = "channel" + props.asPath.slice(14).split("?")[0];
  const userID = props.user.id;

  const [channel, ably] = useChannel(channelName, (message) => {
    // console.log("MESSAGE", message);
    const history = receivedMessages;
    setMessages([...history, message]);
  });

  const sendChatMessage = (messageText) => {
    channel.publish({ name: "chat-message", data: messageText });
    setMessageText("");
    inputBox.current.focus();

    postData({
      data: messageText,
      channel: channelName,
      senderID: userID,
    });
  };

  const handleFormSubmission = (event) => {
    event.preventDefault();
    sendChatMessage(messageText);
  };

  const handleKeyPress = (event) => {
    if (event.charCode !== 13 || messageTextIsEmpty) {
      return;
    }
    sendChatMessage(messageText);
    event.preventDefault();
  };

  let author;
  const messages = receivedMessages.map((message, index) => {
    if (message.connectionId) {
      author = message.connectionId === ably.connection.id ? "me" : "other";
    } else {
      author = message.senderID === userID ? "me" : "other";
    }
    return (
      <span key={index} className={styles.message} data-author={author}>
        {message.data}
      </span>
    );
  });

  // API calls for message history
  const getData = async () => {
    const res = await fetch(`/api/messages/${channelName}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    // Throw error with status code in case Fetch API req failed
    if (!res.ok) {
      throw new Error(res.status);
    }
    return res.json();
  };
  const postData = async (msgData) => {
    const res = await fetch("/api/messages", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(msgData),
    });

    // Throw error with status code in case Fetch API req failed
    if (!res.ok) {
      throw new Error(res.status);
    }
  };

  useEffect(() => {
    messageEnd.current.scrollIntoView({ behaviour: "smooth" });
  });

  useEffect(() => {
    async function getMsgHistory() {
      let msgHistory = await getData();
      setMessages(msgHistory.data);
      setMsgLoading(false);
    }
    getMsgHistory();
  }, []);

  return (
    <>
      <br />
      <Typography variant="h3" align="center">
        Chat with {props.query.partUserName}
      </Typography>
      <div className={styles.chatHolder}>
        <div className={styles.chatText}>
          {msgLoading ? <h4>Messages Loading</h4> : messages}
          <div ref={messageEnd}></div>
        </div>
        <form onSubmit={handleFormSubmission} className={styles.form}>
          <textarea
            ref={inputBox}
            value={messageText}
            placeholder="Type a message..."
            onChange={(e) => setMessageText(e.target.value)}
            onKeyPress={handleKeyPress}
            className={styles.textarea}
          ></textarea>
          <button
            type="submit"
            className={styles.button}
            disabled={messageTextIsEmpty}
          >
            Send
          </button>
        </form>
      </div>
    </>
  );
};

export default AblyChatComponent;
