//populate with posts
import React, { useEffect } from "react";
import * as C from "@material-ui/core";

import BulletinCard from "../../components/search-bulletins/bulletinCard";
import LoadingErrorMessage from "../../components/LoadingErrorMessage";
import { absoluteUrl, getAppCookies } from "../../middleware/utils";

const SearchBulletins = ({ trades }) => {
  const { status, data, total } = trades;

  const makeTradesList = data.map((trade, i) => (
    <BulletinCard key={i} {...trade} />
  ));

  async function loadMoreClick(e) {
    await Router.push({
      pathname: "/trades",
      query: {
        nextPage: trades.nextPage ? trades.nextPage : 5,
      },
    });
  }

  return (
    <C.Container>
      {status == "success" ? makeTradesList : <LoadingErrorMessage />}
    </C.Container>
  );
};

export default SearchBulletins;

export async function getServerSideProps(context) {
  const { query, req } = context;
  const { nextPage } = query;
  const { origin } = absoluteUrl(req);

  const token = getAppCookies(req).token || "";
  const referer = req.headers.referer || "";

  // const nextPageUrl = !isNaN(nextPage) ? `?nextPage=${nextPage}` : '';
  const baseApiUrl = `${origin}/api`;

  // const tradesApi = await fetch(`${baseApiUrl}/trades${nextPageUrl}`
  // });
  const api = await fetch(`${baseApiUrl}/trades`);

  const trades = await api.json();

  return {
    props: {
      origin,
      referer,
      token,
      trades,
    },
  };
}
