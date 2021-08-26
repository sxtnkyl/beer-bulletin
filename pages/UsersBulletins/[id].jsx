import * as C from "@material-ui/core";
import SingleBulletin from "../../components/users-bulletins/single-bulletin";
import { absoluteUrl, getAppCookies } from "../../middleware/utils";

const SingleUsersBulletins = (props) => {
  const { apiData, query } = props;
  return (
    <C.Container>
      {query.type == "bulletin" ? <SingleBulletin {...props} /> : ""}
    </C.Container>
  );
};

export default SingleUsersBulletins;

export async function getServerSideProps(context) {
  const { query, req } = context;
  const { origin } = absoluteUrl(req);
  const { id, type } = query;

  const token = getAppCookies(req).token || "";
  const referer = req.headers.referer || "";
  const baseApiUrl = `${origin}/api`;

  let apiData = {};

  if (type == "bulletin") {
    const api = await fetch(`${baseApiUrl}/trades/with-offers/${id}`);
    apiData = await api.json();
  }
  if (type == "offer") {
    const api = await fetch(`${baseApiUrl}/offers/with-trades/${id}`);
    apiData = await api.json();
  }

  return {
    props: {
      origin,
      referer,
      token,
      baseApiUrl,
      apiData,
      query,
    },
  };
}
