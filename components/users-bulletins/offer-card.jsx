import React from "react";
import Link from "next/link";
import * as C from "@material-ui/core";
import { faBeer } from "@fortawesome/free-solid-svg-icons";
import GlassCard from "../glassCard";
import ScalableIcon from "../ScalableIcon";
import theme from "../../styles/theme";

const useStyles = C.makeStyles((theme) => ({
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
    display: "flex",
    justifyContent: "center",
  },
}));

const OfferCard = (props) => {
  const { toggleOffers, host, trade, resolved } = props;
  const { title, content } = trade;
  const classes = useStyles();

  const handleToggle = () => {};

  const infoBlock = (
    <Link
      passHref
      href={{
        pathname: `/UsersBulletins/${trade.id}`,
        query: { type: toggleOffers ? "offer" : "bulletin" },
      }}
    >
      <C.CardActionArea className={classes.stretch}>
        <C.CardContent className={classes.content}>
          <C.Typography variant="h6">{content}</C.Typography>
          <C.Typography variant="body2">{host.username}</C.Typography>
        </C.CardContent>
      </C.CardActionArea>
    </Link>
  );

  const slider = (
    <C.CardActions className={classes.bot}>
      <Link
        passHref
        href={{
          pathname: `/SearchBulletins/${trade.id}`,
          query: { type: toggleOffers ? "offer" : "bulletin" },
        }}
      >
        <C.Button size="small" variant="outlined" style={{ width: "auto" }}>
          View Bulletin
        </C.Button>
      </Link>
      <C.Button size="small" variant="outlined" style={{ width: "auto" }}>
        Delete Offer
      </C.Button>
    </C.CardActions>
  );

  return (
    <GlassCard>
      <C.CardHeader title={title} align="right" />
      <C.Divider variant="middle" />
      {infoBlock}
      {slider}
    </GlassCard>
  );
};

export default OfferCard;
