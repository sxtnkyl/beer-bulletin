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
    // display: "flex",
    // flex: "1 1 auto",
    // alignItems: "stretch",
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

const ChatCard = (props) => {
  const {
    id,
    offer_money,
    offer_beer,
    offer_other,
    host,
    trade,
    endpoint,
    isMine,
  } = props;
  const classes = useStyles();

  const chatBlock = (
    <Link
      passHref
      href={{
        pathname: `/CurrentChats/[id]`,
        query: { id: endpoint, partUserName: host.username },
      }}
      as={`/CurrentChats/${endpoint}`}
    >
      <C.CardActionArea className={classes.stretch}>
        <C.CardContent className={classes.content}>
          <div className={classes.header}>
            <C.Typography variant="h2">{host.username}</C.Typography>
            <br />
            <C.Avatar
              alt={host.username}
              src={host.profile_pic}
              style={{
                height: "80px",
                width: "80px",
                alignSelf: "flex-start",
                b: "30px",
              }}
            />
          </div>
          <C.Typography variant="h6">
            {isMine ? "responding to " : "is "}
            {trade.seeking ? "seeking: " : "offering: "}
          </C.Typography>

          <C.Typography variant="h4">{trade.title}</C.Typography>
          <br />
          <C.Divider variant="fullWidth" />
          <br />
          <C.Typography variant="h6">{trade.content}</C.Typography>
          <C.Divider variant="fullWidth" />
        </C.CardContent>
      </C.CardActionArea>
    </Link>
  );

  //
  return <GlassCard className={classes.card}>{chatBlock}</GlassCard>;
};
export default ChatCard;
