import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SvgIcon } from "@material-ui/core";

const ScalableIcon = ({ icon }) => {
  return (
    // the className is required!!!
    <SvgIcon>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 20"
        preserveAspectRatio="xMidYMid meet"
      >
        <FontAwesomeIcon icon={icon} />
      </svg>
    </SvgIcon>
  );
};

export default ScalableIcon;
