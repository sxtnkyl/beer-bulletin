import React, { useEffect } from "react";
import Link from "next/link";
import * as C from "@material-ui/core";

const Header = (props) => {
  const topbar = (
    <HideOnScroll {...props}>
      <C.AppBar>
        <C.Toolbar>
          <C.Typography variant="body1" align="left">
            You are not currently logged in!
          </C.Typography>
          <Link
            passHref
            href={{
              pathname: "/Auth",
              query: { form: "login" },
            }}
            // as="/Auth/login"
          >
            <C.Button variant="outlined" style={{ marginLeft: "15px" }}>
              Login
            </C.Button>
          </Link>
          <Link
            passHref
            href={{ pathname: `/Auth`, query: { form: "register" } }}
            as="/Auth/register"
          >
            <C.Button variant="outlined" style={{ marginLeft: "15px" }}>
              Register
            </C.Button>
          </Link>
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
