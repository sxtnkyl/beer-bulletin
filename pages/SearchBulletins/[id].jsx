//a single bulletin opened
import * as C from "@material-ui/core";
import OfferForm from "../../components/forms/OfferForm";
import SingleBulletin from "../../components/search-bulletins/singleBulletin";
import { absoluteUrl, getAppCookies } from "../../middleware/utils";

const BulletinDetails = (props) => {
  return (
    <C.Container>
      <SingleBulletin {...props} />
      <OfferForm {...props} />
    </C.Container>
  );
};

export default BulletinDetails;

export async function getServerSideProps(context) {
  const { query, req } = context;
  const { origin } = absoluteUrl(req);

  const token = getAppCookies(req).token || "";
  const referer = req.headers.referer || "";
  const baseApiUrl = `${origin}/api`;

  if (!token) {
    return {
      redirect: {
        destination: "/Auth?form=login",
        permanent: false,
      },
    };
  }

  let bulletin = {};
  let userHost = {};

  const tradeData = await fetch(`${baseApiUrl}/trades/${query.id}`, {
    headers: {
      authorization: token || "",
    },
  });
  bulletin = await tradeData.json();

  const userData = await fetch(`${baseApiUrl}/users/${bulletin.data.user_id}`, {
    headers: {
      authorization: token || "",
    },
  });
  userHost = await userData.json();

  return {
    props: {
      origin,
      referer,
      token,
      bulletin,
      userHost,
      baseApiUrl,
    },
  };
}
