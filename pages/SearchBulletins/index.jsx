//populate with posts
import React, { useEffect } from "react";
import * as C from "@material-ui/core";

import BulletinCard from "../../components/search-bulletins/bulletinCard";
import LoadingErrorMessage from "../../components/LoadingErrorMessage";
import { absoluteUrl, getAppCookies } from "../../middleware/utils";

import { useBulletins } from "../../util/hooks/useSWRs";
import { fetchBulletins } from "../../util/fetchers";

const SearchBulletins = ({ trades, user, baseApiUrl }) => {
  const { bulletins, isLoading, isError } = useBulletins(
    baseApiUrl,
    fetchBulletins,
    { initialData: trades }
  );
  const makeTradesList = bulletins.data.map((trade, i) => (
    <BulletinCard key={i} loggedUser={user} {...trade} />
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
      {isLoading ? (
        "Put Mui Skeleton here..."
      ) : isError ? (
        <LoadingErrorMessage err={isError} />
      ) : (
        makeTradesList
      )}
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
  // const api = await fetch(`${baseApiUrl}/trades`);
  const trades = await fetchBulletins(baseApiUrl);

  return {
    props: {
      origin,
      referer,
      token,
      baseApiUrl,
      trades,
    },
  };
}
