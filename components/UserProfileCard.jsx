import React from "react";
import * as C from "@material-ui/core";
import GlassCard from "../components/glassCard";
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
  bot: {
    flex: "1 1 auto",
    width: "100%",
  },
}));

const UserProfileCard = ({ user }) => {
  const { username, email, first_name, last_name, profile_pic, num_trades } =
    user.data;
  const classes = useStyles();

  const userBlock = (
    <C.CardContent className={classes.content}>
      <C.Avatar
        alt={username}
        src={profile_pic}
        style={{ height: "80px", width: "80px", alignSelf: "flex-start", b: '30px'}}
      />
      <C.Typography variant="h6"></C.Typography>
      <C.Typography variant="body2">
        Number of completed trades: {num_trades}
      </C.Typography>
    </C.CardContent>
  );

  const infoBlock = (
    <C.CardContent className={classes.content}>
      <C.Typography variant="h6">
       Name: {first_name} {last_name}
      </C.Typography>
      <C.Typography variant="body2">{email}</C.Typography>
    </C.CardContent>
  );

  return (
    <GlassCard>
      <C.CardHeader title={`${username}`} align="left" />
      <C.Divider variant="middle" />
      {userBlock}
      <C.Divider variant="middle" />
      {infoBlock}
    </GlassCard>
  );
};

export default UserProfileCard;
