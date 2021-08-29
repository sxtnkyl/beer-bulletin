import React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import * as C from "@material-ui/core";

const useStyles = C.makeStyles((theme) => ({
  exampleContainer: {},

  box: {
    background: "white",
    borderRadius: "30px",
    width: "150px",
    height: "150px",
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  progressIcon: {
    width: "80%",
    height: "80%",
  },
}));

export default function SliderBtn() {
  const classes = useStyles();

  const x = useMotionValue(0);
  const xInput = [-100, 0, 100];
  const background = useTransform(x, xInput, [
    "linear-gradient(180deg, #ff008c 0%, rgb(211, 9, 225) 100%)",
    "linear-gradient(180deg, #7700ff 0%, rgb(68, 0, 255) 100%)",
    "linear-gradient(180deg, rgb(230, 255, 0) 0%, rgb(3, 209, 0) 100%)",
  ]);
  const color = useTransform(x, xInput, [
    "rgb(211, 9, 225)",
    "rgb(68, 0, 255)",
    "rgb(3, 209, 0)",
  ]);
  const tickPath = useTransform(x, [10, 100], [0, 1]);
  const crossPathA = useTransform(x, [-10, -55], [0, 1]);
  const crossPathB = useTransform(x, [-50, -100], [0, 1]);

  return (
    <motion.div
      className={classes.box}
      style={{ x }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
    >
      <svg className={classes.progressIcon} viewBox="0 0 50 50">
        <motion.path
          fill="none"
          strokeWidth="2"
          stroke={color}
          d="M 0, 20 a 20, 20 0 1,0 40,0 a 20, 20 0 1,0 -40,0"
          style={{ translateX: 5, translateY: 5 }}
        />
        <motion.path
          fill="none"
          strokeWidth="2"
          stroke={color}
          d="M14,26 L 22,33 L 35,16"
          strokeDasharray="0 1"
          style={{ pathLength: tickPath }}
        />
        <motion.path
          fill="none"
          strokeWidth="2"
          stroke={color}
          d="M17,17 L33,33"
          strokeDasharray="0 1"
          style={{ pathLength: crossPathA }}
        />
        <motion.path
          fill="none"
          strokeWidth="2"
          stroke={color}
          d="M33,17 L17,33"
          strokeDasharray="0 1"
          style={{ pathLength: crossPathB }}
        />
      </svg>
    </motion.div>
  );
}
