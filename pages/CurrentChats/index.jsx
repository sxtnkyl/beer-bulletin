//use next's Link to pass chat id
// <Link href={`/CurrentChats/${id}}><Component /></Link>
import React, { useState } from "react";
import * as C from "@material-ui/core";

import ChatCard from "../../components/Chat/chatCard";
import LoadingErrorMessage from "../../components/LoadingErrorMessage";
import {
  absoluteUrl,
  getAppCookies,
  verifyToken,
} from "../../middleware/utils";

const CurrentChats = ({ offers, myOffers }) => {
  const [isHost, setIsHost] = useState(false);

  //USER AS PARTICIPANT
  const { status, data } = offers;
  const offerList = data.offers_made.map((offer, i) => (
    <ChatCard key={i} isMine={false} {...offer} />
  ));

  //USER AS HOST
  const { status: myOfferStatus, data: myOfferData } = myOffers;
  const myOfferList = myOfferData.user_trades.map((trade) =>
    trade.offers.map((offer, i) => (
      <ChatCard key={i} host={offer.participant} isMine={true} {...offer} />
    ))
  );

  async function loadMoreClick(e) {
    await Router.push({
      pathname: "/offers",
      query: {
        nextPage: offers.nextPage ? offers.nextPage : 5,
      },
    });
  }

  return (
    <C.Container>
      <br />
      <C.Typography variant="h3" align="center">
        Chats for My Offers
      </C.Typography>
      <C.Divider variant="middle" />

      {status == "success" ? offerList : <LoadingErrorMessage />}
      <br />
      <br />
      <C.Typography variant="h3" align="center">
        Chats for My Bulletins
      </C.Typography>
      <C.Divider variant="middle" />

      {myOfferStatus == "success" ? myOfferList : <LoadingErrorMessage />}
    </C.Container>
  );
};

export default CurrentChats;

export async function getServerSideProps(context) {
  const { query, req } = context;
  const { nextPage } = query;
  const { origin } = absoluteUrl(req);
  const token = getAppCookies(req).token || "";

  //If token doesn't exist, redirect to login,
  if (!token)
    return {
      redirect: { destination: "/Auth?form=login", permanent: false },
    };

  const baseApiUrl = `${origin}/api`;
  const reqToken = token && verifyToken(token.replace("Bearer ", "")); //Will return our UserID

  const api = await fetch(`${baseApiUrl}/users/with-offers/${reqToken.id}`, {
    headers: {
      authorization: token || "",
    },
  });

  const myOffersApi = await fetch(
    `${baseApiUrl}/users/with-trades/${reqToken.id}`,
    {
      headers: {
        authorization: token || "",
      },
    }
  );

  const offers = await api.json();
  const myOffers = await myOffersApi.json();

  return {
    props: {
      origin,
      token,
      offers,
      myOffers,
    },
  };
}
