//dynamic route for an individual post
// domain.com/CurrentChats/:id

import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import AblyChatComponent from "../../components/ablyChat/AblyChatComponent";
import { absoluteUrl, getAppCookies } from "../../middleware/utils";
import BeerPongGame from "../../components/beerPong/BeerPongGame";

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
    </div>
  );
};

export default Chat;