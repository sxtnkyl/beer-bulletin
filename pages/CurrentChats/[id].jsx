//dynamic route for an individual post
// domain.com/CurrentChats/:id

import React, { useState, useEffect } from "react";
import { Button, Typography } from "@material-ui/core";
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
  const [tradeID, hostUser, partUser] = pageProps.query.id.split("b");
  const style = useStyles();
  const [gameMode, setGameMode] = useState(false);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <AblyChatComponent {...pageProps} />
      <br />
      <Button
        color="secondary"
        variant="contained"
        style={{ width: "50%", margin: "auto" }}
        onClick={() => setGameMode(!gameMode)}
      >
        <Typography variant="h4">Beer Pong</Typography>
      </Button>
      {gameMode ? (
        <BeerPongGame
          chatHost={hostUser}
          chatPart={partUser}
          loggedUser={pageProps.user.id}
          baseApiUrl={pageProps.baseApiUrl}
          asPath={pageProps.asPath}
          userPic={pageProps.user.profPic}
        />
      ) : null}
    </div>
  );
};

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
