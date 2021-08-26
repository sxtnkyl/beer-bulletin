//dynamic route for an individual post
// domain.com/CurrentChats/:id

import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import AblyChatComponent from "../../components/ablyChat/AblyChatComponent";
import { absoluteUrl, getAppCookies } from "../../middleware/utils";
import BeerPongGame from "../../components/beerPong/BeerPongGame";
import CreatePostForm from "../../components/forms/CreatePostForm";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: "100%",
    height: "80vh",
  },
  headBG: {
    backgroundColor: "#e0e0e0",
  },
  borderRight500: {
    borderRight: "1px solid #e0e0e0",
  },
  messageArea: {
    height: "70vh",
    overflowY: "auto",
  },
  typeArea: {
    padding: "0px 10px",
  },
});

//Pass chat ID here??
const Chat = (pageProps) => {
  const style = useStyles();
  const [gameMode, setGameMode] = useState(false);
  return (
    <div>
      <AblyChatComponent {...pageProps} />
      <Button onClick={() => setGameMode(!gameMode)}>Beer Pong</Button>
      {gameMode ? <BeerPongGame /> : null}
      <CreatePostForm {...pageProps} />
    </div>
  );
};

/*const Chat = () => {
    return(
        <form className="message-form" onSubmit={handleSubmit}>
        <input
          className="message-input"
          placeholder="Send a message..."
          value={value}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
        <label htmlFor="upload-button">
          <span className="image-button">
            <PictureOutlined className="picture-icon" />
          </span>
        </label>
        <input
          type="file"
          multiple={false}
          id="upload-button"
          style={{ display: 'none' }}
          onChange={handleUpload.bind(this)}
        />
        <button type="submit" className="send-button">
          <SendOutlined className="send-icon" />
        </button>
      </form>
    )
}
*/

export default Chat;

export async function getServerSideProps(context) {
  const { req, query } = context;
  const { origin } = absoluteUrl(req);

  const referer = req.headers.referer || "";
  const baseApiUrl = `${origin}/api`;

  return {
    props: {
      origin,
      referer,
      baseApiUrl,
      query,
    },
  };
}
