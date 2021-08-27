import React, { useLayoutEffect, useRef, useState } from "react";

// LOOK INTO USING WEB WORKER TO RUN GAME IN SEPARATE THREAD

const BeerPongGame = ({
  chatHost,
  chatPart,
  loggedUser,
  baseApiUrl,
  asPath,
}) => {
  const channelName = "channel" + asPath.slice(14).split("?")[0];
  const ablyURL = baseApiUrl + "/createTokenRequest";

  const playerOne = loggedUser == chatHost ? true : false;
  return (
    <div
      className="beer-pong"
      style={{ display: "flex", justifyContent: "center" }}
    >
      <iframe
        title="bpGame"
        src={`/beerPong/beerPong.html?isPlayerOne=${playerOne}&ablyURL=${ablyURL}&channel=${channelName}`}
        width="80%"
        height="600px"
      ></iframe>
    </div>
  );
};

export default BeerPongGame;
