import React, { useLayoutEffect, useRef, useState } from "react";

const BeerPongGame = ({ chatHost, chatPart, loggedUser, baseApiUrl }) => {
  console.log("GAME", baseApiUrl);
  const playerOne = loggedUser == chatHost ? true : false;
  return (
    <div
      className="beer-pong"
      style={{ display: "flex", justifyContent: "center" }}
    >
      <iframe
        title="bpGame"
        src={`/beerPong/beerPong.html?isPlayerOne=${playerOne}`}
        width="80%"
        height="600px"
      ></iframe>
    </div>
  );
};

export default BeerPongGame;
