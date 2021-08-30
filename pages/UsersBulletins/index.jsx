import React, { useState } from "react";
import * as C from "@material-ui/core";
import {
  absoluteUrl,
  getAppCookies,
  verifyToken,
} from "../../middleware/utils";
import BulletinCard from "../../components/users-bulletins/BulletinCard";
import OfferCard from "../../components/users-bulletins/OfferCard";
import ScalableIcon from "../../components/ScalableIcon";
import { faAddressBook } from "@fortawesome/free-solid-svg-icons";
import {
  fetchUserWithOffers,
  fetchUserWithBulletins,
} from "../../util/fetchers";
import {
  useGetUserBulletins,
  useGetUserOffers,
} from "../../util/hooks/useSWRs";

const useStyles = C.makeStyles(() => ({
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

const UsersBulletins = ({ bulletins, offers, user, baseApiUrl, token }) => {
  const classes = useStyles();

  const { userBulletins } = useGetUserBulletins(
    baseApiUrl,
    user.id,
    token,
    "ub",
    fetchUserWithBulletins,
    { initialData: bulletins }
  );
  const { userOffers, isError } = useGetUserOffers(
    baseApiUrl,
    user.id,
    token,
    "uo",
    fetchUserWithOffers,
    { initialData: offers }
  );

  const [toggleOffers, setToggle] = useState(false);
  const toggleOffs = () => {
    setToggle(!toggleOffers);
  };

  console.log("BASE DATA: ", userBulletins, userOffers);

  const makeBulletinList = userBulletins.data.user_trades.map((trade) => (
    <BulletinCard
      key={trade.id}
      {...trade}
      {...toggleOffers}
      baseApiUrl={baseApiUrl}
      user={user}
      token={token}
    />
  ));

  const makeOffersList = userOffers.data.offers_made.map((offer) => (
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
    userBulletins.data.user_trades.filter((trade) => trade.open).length
  }`;
  const openoffers = `Currently Open Offers: ${
    userOffers.data.offers_made.filter((offer) => !offer.resolved).length
  }`;

  return (
    <C.Container>
      <div className={classes.header}>
        <C.Typography variant="h2">{header}</C.Typography>
        <C.Button onClick={toggleOffs}>
          <ScalableIcon icon={faAddressBook} color={toggleOffers && "white"} />
        </C.Button>
      </div>

      <C.Typography variant="h5" style={{ textAlign: "center" }}>
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

  const bulletins = await fetchUserWithBulletins(baseApiUrl, id, token);
  const offers = await fetchUserWithOffers(baseApiUrl, id, token);

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
