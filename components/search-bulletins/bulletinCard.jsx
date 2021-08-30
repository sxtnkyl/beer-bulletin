import React, { useState, useEffect } from "react";
import Link from "next/link";
import * as C from "@material-ui/core";
import { faBeer } from "@fortawesome/free-solid-svg-icons";
import GlassCard from "../glassCard";
import ScalableIcon from "../ScalableIcon";
import theme from "../../styles/theme";
import Image from "next/image";

const useStyles = C.makeStyles((theme) => ({
  card: {
    display: "flex",
  },
  stretch: {
    display: "flex",
    flex: "1 1 auto",
    alignItems: "stretch",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  bot: {
    // position: "absolute",
    // bottom: "0",
    flex: "1 1 auto",
    width: "100%",
  },
  seekOffer: {
    color: "#CCD500",
  },
}));

const BulletinCard = (props) => {
  const {
    id,
    user_id,
    title,
    content,
    offers,
    open,
    seeking,
    picture,
    loggedUser,
  } = props;
  const classes = useStyles();

  if (!loggedUser) loggedUser = { id: 0 };

  const [loggedUserHasOffer, setLoggedUserHasOffer] = useState(false);

  useEffect(() => {
    offers.forEach((offer) => {
      if (offer.participant.id === loggedUser.id) setLoggedUserHasOffer(true);
    });
  }, []);

  const infoBlock = (
    <Link passHref href={`/SearchBulletins/${id}`}>
      <C.CardActionArea className={classes.stretch}>
        <C.CardContent className={classes.content}>
          {picture && (
            <Image src={picture} alt={title} width={100} height={100} />
          )}
          <br />
          <C.Divider variant="fullWidth" />
          <C.Typography variant="body1">{content}</C.Typography>

          <C.Divider variant="fullWidth" />
        </C.CardContent>
      </C.CardActionArea>
    </Link>
  );

  const slider = (
    <C.CardActions className={classes.bot}>
      <Link passHref href={`/SearchBulletins/${id}`}>
        <C.Button
          color="secondary"
          variant="contained"
          startIcon={open && <ScalableIcon icon={faBeer} />}
          disabled={!open || user_id === loggedUser.id}
          style={{ width: "auto" }}
        >
          {user_id === loggedUser.id
            ? "Your Trade"
            : loggedUserHasOffer
            ? "Edit Offer"
            : open
            ? "Make Offer"
            : "Deal Pending"}
        </C.Button>
      </Link>
    </C.CardActions>
  );

  return (
    <GlassCard className={classes.card}>
      <C.CardHeader
        title={
          <>
            <C.Typography className={classes.seekOffer} variant="h5">
              {seeking ? "Seeking " : "Offering "}
            </C.Typography>{" "}
            <C.Typography variant="h4">{title}</C.Typography>
          </>
        }
        subheader={`Current Offers: ${offers.length}`}
        align="left"
      />
      {infoBlock}
      {slider}
    </GlassCard>
  );
};

export default BulletinCard;
