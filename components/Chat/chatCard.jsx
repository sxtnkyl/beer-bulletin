import React from "react";
import Link from "next/link";
import * as C from "@material-ui/core";
import { faBeer } from "@fortawesome/free-solid-svg-icons";
import GlassCard from "../glassCard";
import ScalableIcon from "../ScalableIcon";
import theme from "../../styles/theme";

/*
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
      flex: "1 1 auto",
      width: "100%",
    },
  }));

*/
  const ChatCard = (props) => {
      const {id} = props;
      //const classes = useStyles();
      return (<div> My name is {id}</div>);
  }


export default ChatCard;