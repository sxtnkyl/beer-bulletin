import React, { useEffect } from "react";
import Link from "next/link";
import { signIn } from "next-auth/client";
import * as C from "@material-ui/core";

const Header = (props) => {
  const topbar = (
    <HideOnScroll {...props}>
      <C.AppBar>
        <C.Toolbar>
          <C.Typography variant="h6">
            You are not currently logged in!
          </C.Typography>
          <C.Button
            href={`/api/auth/signin`}
            onClick={(e) => {
              e.preventDefault();
              signIn();
            }}
          >
            Login
          </C.Button>
        </C.Toolbar>
      </C.AppBar>
    </HideOnScroll>
  );

  return <header>{topbar}</header>;
};

export default Header;

function HideOnScroll(props) {
  const { children } = props;

  return (
    <C.Slide appear={false} direction="down" in={!props.scroll}>
      {children}
    </C.Slide>
  );
}
