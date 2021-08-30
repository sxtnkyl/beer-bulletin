//a single bulletin opened
import * as C from "@material-ui/core";
import OfferForm from "../../components/forms/OfferForm";
import SingleBulletin from "../../components/search-bulletins/singleBulletin";
import { absoluteUrl, getAppCookies } from "../../middleware/utils";
import { fetchSingleBulletin, fetchSingleUser } from "../../util/fetchers";
import { useBulletinDetails, useGetSingleUser } from "../../util/hooks/useSWRs";

const BulletinDetails = (props) => {
  const { userHost, user, baseApiUrl, query, token, bulletin } = props;

  const { bulletinData, isLoading, isError } = useBulletinDetails(
    baseApiUrl,
    query.id,
    token,
    fetchSingleBulletin,
    { initialData: bulletin }
  );

  const { userData } = useGetSingleUser(
    baseApiUrl,
    bulletin.data.user_id,
    token,
    fetchSingleUser,
    { initialData: userHost }
  );

  return (
    <C.Container>
      <SingleBulletin bulletin={bulletinData} userHost={userData} />
      {userHost.data.id === user.id ? null : <OfferForm {...props} />}
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

  const bulletin = await fetchSingleBulletin(baseApiUrl, query.id, token);

  const userHost = await fetchSingleUser(
    baseApiUrl,
    bulletin.data.user_id,
    token
  );

  return {
    props: {
      query,
      origin,
      referer,
      token,
      bulletin,
      userHost,
      baseApiUrl,
    },
  };
}
