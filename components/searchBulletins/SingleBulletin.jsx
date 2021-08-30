import React from "react";
import * as C from "@material-ui/core";
import GlassCard from "../GlassCard";
import theme from "../../styles/theme";
import Image from "next/image";

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
  header: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

const SingleBulletin = ({ bulletin, userHost }) => {
  const { id, content, open, title, picture } = bulletin.data;
  const { num_trades, profile_pic, username } = userHost.data;
  const classes = useStyles();

  const infoBlock = (
    <C.CardContent className={classes.content}>
      {picture && <Image src={picture} alt={title} width={100} height={100} />}
      <C.Typography variant="h6">{title}</C.Typography>
      <C.Typography variant="body1">{content}</C.Typography>
    </C.CardContent>
  );

  const userBlock = (
    <C.CardContent className={classes.content}>
      <div className={classes.header}>
        <div>
          <C.Typography variant="h6">{username}</C.Typography>
          <C.Typography variant="body2">
            Number of completed trades: {num_trades}
          </C.Typography>
        </div>
        <br />
        <C.Avatar
          alt={username}
          src={profile_pic}
          style={{ height: "80px", width: "80px", alignSelf: "flex-end" }}
        />
      </div>

      {/* <C.Divider variant="middle" style={{ marginBottom: "15px" }} /> */}
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
