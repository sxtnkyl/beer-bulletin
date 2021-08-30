import React, { useLayoutEffect, useRef, useState } from "react";

// LOOK INTO USING WEB WORKER TO RUN GAME IN SEPARATE THREAD

const BeerPongGame = ({
  chatHost,
  chatPart,
  loggedUser,
  baseApiUrl,
  asPath,
  userPic,
}) => {
  const channelName = "channel" + asPath.slice(14).split("?")[0];
  const ablyURL = baseApiUrl + "/createTokenRequest";

  const playerOne = loggedUser == chatHost ? true : false;
  const gamePic =
    userPic ||
    "https://res.cloudinary.com/beerbulliten/image/upload/v1630302088/sszk88k8rurwkasssr7h.jpg";
  return (
    <div
      className="beer-pong"
      style={{ display: "flex", justifyContent: "center" }}
    >
      <iframe
        title="bpGame"
        src={`/beerPong/beerPong.html?isPlayerOne=${playerOne}&ablyURL=${ablyURL}&channel=${channelName}&gamePic=${gamePic}`}
        width="80%"
        height="800px"
      ></iframe>
    </div>
  );
};

export default BeerPongGame;
