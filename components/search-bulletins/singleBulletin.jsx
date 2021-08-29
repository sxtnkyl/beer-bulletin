import React from "react";
import * as C from "@material-ui/core";
import GlassCard from "../glassCard";
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
    flex: "1 1 auto",
    width: "100%",
  },
}));

const SingleBulletin = ({ bulletin, userHost }) => {
  const { id, content, open, title } = bulletin.data;
  const { num_trades, profile_pic, username } = userHost.data;
  const classes = useStyles();

  const infoBlock = (
    <C.CardContent className={classes.content}>
      <C.Typography variant="h6">{title}</C.Typography>
      <C.Typography variant="body1">{content}</C.Typography>
    </C.CardContent>
  );

  const userBlock = (
    <C.CardContent className={classes.content}>
      <C.Avatar
        alt={username}
        src={profile_pic}
        style={{ height: "80px", width: "80px", alignSelf: "flex-end" }}
      />
      <C.Typography variant="h6">{username}</C.Typography>
      <C.Typography variant="body2">
        Number of completed trades: {num_trades}
      </C.Typography>
    </C.CardContent>
  );

  return (
    <>
      <GlassCard>
        <C.CardHeader title={`Bulletin No. ${id}`} align="right" />
        <C.Divider variant="middle" />
        {userBlock}
        <C.Divider variant="middle" />
        {infoBlock}
      </GlassCard>
    </>
  );
};

export default SingleBulletin;
