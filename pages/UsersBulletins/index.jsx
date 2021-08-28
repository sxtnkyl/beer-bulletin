import React, { useState, useEffect } from "react";
import * as C from "@material-ui/core";
import {
  absoluteUrl,
  getAppCookies,
  verifyToken,
} from "../../middleware/utils";
import BulletinCard from "../../components/users-bulletins/bulletin-card";
import OfferCard from "../../components/users-bulletins/offer-card";
import ScalableIcon from "../../components/ScalableIcon";
import { faAddressBook } from "@fortawesome/free-solid-svg-icons";

const useStyles = C.makeStyles(() => ({
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

const UsersBulletins = ({ bulletins, offers, user, baseApiUrl, token }) => {
  const { user_trades } = bulletins.data;
  const { offers_made } = offers.data;
  const classes = useStyles();

  const [toggleOffers, setToggle] = useState(false);
  const toggleOffs = () => {
    setToggle(!toggleOffers);
  };

  const makeBulletinList = user_trades.map((trade) => (
    <BulletinCard
      key={trade.id}
      {...trade}
      {...toggleOffers}
      baseApiUrl={baseApiUrl}
      user={user}
      token={token}
    />
  ));

  const makeOffersList = offers_made.map((offer) => (
    <OfferCard
      key={offer.id}
      {...offer}
      {...toggleOffers}
      baseApiUrl={baseApiUrl}
      user={user}
      token={token}
    />
  ));
  const header = `${bulletins.data.username}'s ${
    toggleOffers ? "Offers" : "Bulletins"
  }`;
  const opentrades = `Currently Open Trades: ${
    user_trades.filter((trade) => trade.open).length
  }`;
  const openoffers = `Currently Open Offers: ${
    offers_made.filter((offer) => !offer.resolved).length
  }`;

  return (
    <C.Container>
      <div className={classes.header}>
        <C.Typography variant="h2">{header}</C.Typography>
        <C.Button onClick={toggleOffs}>
          <ScalableIcon icon={faAddressBook} color={toggleOffers && "white"} />
        </C.Button>
      </div>

      <C.Typography variant="body1" style={{ textAlign: "center" }}>
        {toggleOffers ? openoffers : opentrades}
      </C.Typography>
      {toggleOffers ? makeOffersList : makeBulletinList}
    </C.Container>
  );
};

export default UsersBulletins;

export async function getServerSideProps(context) {
  const { req } = context;
  const { origin } = absoluteUrl(req);

  const token = getAppCookies(req).token || "";
  const referer = req.headers.referer || "";

  //if no auth, redirect
  if (!token) {
    return {
      redirect: {
        destination: "/Auth?form=login",
        permanent: false,
      },
    };
  }

  // const nextPageUrl = !isNaN(nextPage) ? `?nextPage=${nextPage}` : '';
  const baseApiUrl = `${origin}/api`;

  // const tradesApi = await fetch(`${baseApiUrl}/trades${nextPageUrl}`
  // });

  const { id } = token && verifyToken(token.replace("Bearer ", ""));
  const userBulletins = await fetch(`${baseApiUrl}/users/with-trades/${id}`, {
    headers: {
      authorization: token || "",
    },
  });
  const userOffers = await fetch(`${baseApiUrl}/users/with-offers/${id}`, {
    headers: {
      authorization: token || "",
    },
  });

  const bulletins = await userBulletins.json();
  const offers = await userOffers.json();

  return {
    props: {
      origin,
      referer,
      token,
      bulletins,
      offers,
      baseApiUrl,
    },
  };
}
