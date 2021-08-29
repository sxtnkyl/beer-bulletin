import React from "react";
import Link from "next/link";
import * as C from "@material-ui/core";
import { faBeer } from "@fortawesome/free-solid-svg-icons";
import GlassCard from "../glassCard";
import ScalableIcon from "../ScalableIcon";
import theme from "../../styles/theme";

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
}));

const BulletinCard = (props) => {
  const { id, user_id, title, content, current_offers, open, loggedUser } =
    props;
  const classes = useStyles();

  const infoBlock = (
    <Link passHref href={`/SearchBulletins/${id}`}>
      <C.CardActionArea className={classes.stretch}>
        <C.CardContent className={classes.content}>
          {title}
          <C.Divider variant="middle" />
          {content}
          <C.Divider variant="middle" />
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
          disabled={!open || !loggedUser || user_id === loggedUser.id}
          style={{ width: "auto" }}
        >
          {open ? "Make Offer" : "Deal Pending"}
        </C.Button>
      </Link>
    </C.CardActions>
  );

  return (
    <GlassCard className={classes.card}>
      {infoBlock}
      {slider}
    </GlassCard>
  );
};

export default BulletinCard;
