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
      align: "center",
      justifyContent: "space-around",
    },
    bot: {
      flex: "1 1 auto",
      width: "100%",
    },
  }));

  const ChatCard = (props) => {
    const {id, offer_money, offer_beer, offer_other, host, trade } = props;
    const classes = useStyles();
    
  const chatBlock = (
    
    <Link passHref href={`/CurrentChats/${id}`}>
    <C.CardActionArea className={classes.stretch}>
      <C.CardContent className={classes.content}>
        <h2>Username: {host.username}</h2>
        <C.Divider variant="middle" />
        {trade.title} <br />
        {trade.content}
        <C.Divider variant="middle" />
      </C.CardContent>
    </C.CardActionArea>
    </Link>
  )
    return (
    <GlassCard className={classes.card}>
      {chatBlock}
    </GlassCard>
    );
  }

export default ChatCard;