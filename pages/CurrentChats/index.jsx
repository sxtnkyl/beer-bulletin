//use next's Link to pass chat id
// <Link href={`/CurrentChats/${id}}><Component /></Link>
import React from "react";
import * as C from "@material-ui/core";

import ChatCard from "../../components/Chat/chatCard";
import LoadingErrorMessage from "../../components/LoadingErrorMessage";
import { absoluteUrl, getAppCookies, verifyToken } from "../../middleware/utils";
  
const CurrentChats = ({offers}) => {

    const {status, data} = offers;
    console.log(data.offers_made);
     const offerList = data.offers_made.map((offer, i ) => (
        <ChatCard key={i} {...offer} />
     ));

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
        {status == "success" ? offerList : <LoadingErrorMessage />}
      </C.Container>
    );
}

export default CurrentChats;

export async function getServerSideProps(context) {
    const { query, req } = context;
    const { nextPage } = query;
    const { origin } = absoluteUrl(req);
  
    const token = getAppCookies(req).token || "";
    const referer = req.headers.referer || "";

    //If token doesn't exist, redirect to login,
    if(!token)
        return {
            redirect: {destination: '/Auth?form=login', permanent: false}
        }

    const baseApiUrl = `${origin}/api`;
    const reqToken = token && verifyToken(token.replace('Bearer ', '')); //Will return our UserID

    const api = await fetch(`${baseApiUrl}/users/with-offers/${reqToken.id}`, {
      headers: {
        authorization: token || "",
      },
    });

    const myOffers = await fetch (`${baseApiUrl}/users/with-trades/${reqToken.id}` , {
      headers: {
        authorization: token || "",
      },
    });

    const offers  = await api.json();
   
    return {
      props: {
        origin,
        referer,
        token,
        offers,
      },
    };
  }
