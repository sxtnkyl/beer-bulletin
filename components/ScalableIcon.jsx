import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SvgIcon } from "@material-ui/core";
import theme from "../styles/theme";

const ScalableIcon = ({
  icon,
  height = "24",
  width = "24",
  pad = "0",
  color = theme.palette.primary.dark,
}) => {
  const vb = `0 0 ${width} ${height}`;
  return (
    <SvgIcon
      viewBox={vb}
      style={{ width, height, margin: `${pad}px 0px`, color }}
    >
      <svg width={width} height={height} preserveAspectRatio="xMidYMid meet">
        <FontAwesomeIcon icon={icon} />
      </svg>
    </SvgIcon>
  );
};

export default ScalableIcon;
