import { useState } from "react";
import * as C from "@material-ui/core";
import GlassCard from "../glassCard";
import ScalableIcon from "../../components/ScalableIcon";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const useStyles = C.makeStyles((theme) => ({
  header: {
    display: "flex",
    justifyContent: "flex-end",
  },
  stretch: {
    display: "flex",
    flex: "1 1 auto",
    alignItems: "stretch",
  },
  content: {
    display: "flex",
  },
  contentCol: {
    flex: "1 1 50%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bot: {
    // position: "absolute",
    // bottom: "0",
    flex: "1 1 auto",
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  backButton: {
    position: "absolute",
    top: "2%",
    left: 0,
  },
}));

////UsersBulletins/:id?type=bulletin > list all offers for a user's bulletin
const SingleBulletin = ({ apiData, baseApiUrl, token }) => {
  const { title, content, seeking, offers } = apiData.data;
  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  //update offer resolved to true
  const handleAcceptOffer = async (id) => {
    setLoading(!loading);
    const acceptOffer = await fetch(`${baseApiUrl}/offers/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: token || "",
      },
      body: JSON.stringify({ resolved: true }),
    }).catch((error) => {
      console.error("Error:", error);
    });

    const api = await acceptOffer.json();
    setLoading(false);
  };

  //delete offer
  const handleRejectOffer = async (id) => {
    setLoading(!loading);
    const deleteOffer = await fetch(`${baseApiUrl}/offers/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: token || "",
      },
    }).catch((error) => {
      console.error("Error:", error);
    });

    const api = await deleteOffer.json();
    setLoading(false);
  };

  const SingleOffer = ({
    id,
    participant,
    offer_money,
    offer_beer,
    offer_other,
    endpoint,
  }) => (
    <GlassCard>
      <C.CardContent className={classes.content}>
        <div className={classes.contentCol}>
          <C.Avatar
            alt={participant.username}
            src={participant.profile_pic}
            style={{ height: "80px", width: "80px" }}
          />
          <C.Typography variant="h6">{participant.username}</C.Typography>
        </div>
        <div className={classes.contentCol}>
          <C.Typography variant="h6">Offers</C.Typography>
          <C.Divider style={{ width: "100%" }} />
          <C.Typography variant="body2">
            $ {offer_money ? offer_money : "0"}
          </C.Typography>
          <C.Typography variant="body2">{offer_beer}</C.Typography>
          <C.Typography variant="body2">{offer_other}</C.Typography>
        </div>
      </C.CardContent>

      <C.CardActions className={classes.bot}>
        <C.Button
          onClick={() => handleAcceptOffer(id)}
          size="small"
          variant="outlined"
          style={{ width: "auto" }}
        >
          Accept Offer
        </C.Button>
        <Link
          passHref
          href={{
            pathname: `/CurrentChats/[id]`,
            query: { id: endpoint, partUserName: participant.username },
          }}
          as={`/CurrentChats/${endpoint}`}
        >
          <C.Button size="small" variant="outlined" style={{ width: "auto" }}>
            Chat
          </C.Button>
        </Link>
        <C.Button
          onClick={() => {
            handleRejectOffer(id);
          }}
          size="small"
          variant="outlined"
          style={{ width: "auto" }}
        >
          Reject Offer
        </C.Button>
      </C.CardActions>
    </GlassCard>
  );

  return (
    <>
      <C.Button href="/UsersBulletins" className={classes.backButton}>
        <ScalableIcon icon={faArrowAltCircleLeft} color="primary" />
      </C.Button>
      <div className={classes.header}>
        <C.Typography variant="h2">{title}</C.Typography>
      </div>
      {offers.map((offer, i) => (
        <SingleOffer key={i} {...offer} />
      ))}
    </>
  );
};

export default SingleBulletin;
