import React from "react";
import * as C from "@material-ui/core";
import GlassCard from "../components/GlassCard";
import theme from "../styles/theme";

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
  contentCenter: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",

    alignItems: "center",
  },
  bot: {
    flex: "1 1 auto",
    width: "100%",
  },
}));

const UserProfileCard = ({ data }) => {
  const { username, email, first_name, last_name, profile_pic, num_trades } =
    data;
  const classes = useStyles();

  const userBlock = (
    <C.CardContent className={classes.contentCenter}>
      <C.Avatar
        alt={username}
        src={profile_pic}
        align="center"
        style={{
          height: "80px",
          width: "80px",
          b: "30px",
        }}
      />
      <br />
      <C.Typography variant="subtitle2">
        Trades Posted: {num_trades}
      </C.Typography>
    </C.CardContent>
  );

  const infoBlock = (
    <C.CardContent className={classes.content}>
      <C.Typography variant="h6">
        Name: {first_name} {last_name}
      </C.Typography>
      <C.Typography variant="subtitle2">{email}</C.Typography>
    </C.CardContent>
  );

  return (
    <GlassCard>
      <C.Typography variant="h4" style={{ margin: "10px" }} align="left">
        {username}
      </C.Typography>
      <C.Divider variant="middle" />
      {userBlock}
      <C.Divider variant="middle" />
      {infoBlock}
    </GlassCard>
  );
};

export default UserProfileCard;
