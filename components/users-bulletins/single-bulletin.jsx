import React from "react";
import * as C from "@material-ui/core";
import GlassCard from "../glassCard";

const useStyles = C.makeStyles((theme) => ({
  header: {
    display: "flex",
    flexDirection: "column",
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
}));

const SingleBulletin = ({ data }) => {
  const { title, content, offers } = data;
  const classes = useStyles();

  const SingleOffer = ({ participant }) => (
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
          <C.Typography variant="body2">Cash</C.Typography>
          <C.Typography variant="body2">Beer</C.Typography>
          <C.Typography variant="body2">Other</C.Typography>
        </div>
      </C.CardContent>

      <C.CardActions className={classes.bot}>
        <C.Button size="small" variant="outlined" style={{ width: "auto" }}>
          Accept Offer
        </C.Button>
        <C.Button size="small" variant="outlined" style={{ width: "auto" }}>
          Reject Offer
        </C.Button>
      </C.CardActions>
    </GlassCard>
  );

  return (
    <>
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
