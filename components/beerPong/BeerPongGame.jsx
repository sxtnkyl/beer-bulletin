import React, { useLayoutEffect, useRef, useState } from "react";

const BeerPongGame = () => {
  return (
    <div
      className="beer-pong"
      style={{ display: "flex", justifyContent: "center" }}
    >
      <iframe
        title="bpGame"
        src="/beerPong/beerPong.html?isPlayerOne=true"
        width="80%"
        height="600px"
      ></iframe>
    </div>
  );
};

export default BeerPongGame;
