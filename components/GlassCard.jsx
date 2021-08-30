import React, { forwardRef } from "react";
import * as C from "@material-ui/core";

const useStyles = C.makeStyles(() => ({
  glass: {
    backdropFilter: "blur(16px) saturate(180%)",
    // webkitBackdropFilter: "blur(16px) saturate(180%)",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: "12px",
    border: "1px solid rgba(209, 213, 219, 0.3)",
    minHeight: "200px",
    margin: "15px 0px",
    display: "flex",
    flexDirection: "column",
  },
}));

const GlassCard = ({ props, children }) => {
  const classes = useStyles();

  return (
    <C.Card className={classes.glass} {...props}>
      {children}
    </C.Card>
  );
};

export default GlassCard;
