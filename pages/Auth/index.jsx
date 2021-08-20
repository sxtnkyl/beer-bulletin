import React, { useState, useEffect } from "react";
import * as C from "@material-ui/core";
import Link from "next/link";
import { useRouter } from "next/router";
import LoginForm from "../../components/forms/LoginForm";
import RegisterForm from "../../components/forms/RegisterForm";
import { absoluteUrl } from "../../middleware/utils";
import GlassCard from "../../components/glassCard";

const useStyles = C.makeStyles(() => ({
  header: { display: "flex", justifyContent: "space-between" },
}));

const Auth = (props) => {
  const { query, origin, referer, baseApiUrl } = props;
  const router = useRouter();
  const classes = useStyles();

  //false = login; true = register
  //use referer to set state
  const [method, setMethod] = useState(query.form == "register" ? true : false);
  useEffect(() => {
    router.push(
      { pathname: "/Auth", query: { form: method ? "register" : "login" } },
      undefined,
      {
        shallow: true,
      }
    );
  }, [method]);

  function handleChange() {
    setMethod(!method);
  }

  return (
    <C.Container>
      <div className={classes.header}>
        <C.Typography variant="h2">
          {method ? "Register" : "Login"}
        </C.Typography>
        <C.FormControlLabel
          control={
            <C.Switch
              color="secondary"
              checked={method}
              onChange={handleChange}
            />
          }
          label={method ? "Register" : "Login"}
          labelPlacement="top"
        />
      </div>
      <GlassCard>
        <C.CardHeader
          title={
            <Link
              href={{
                pathname: "/",
              }}
            >
              <C.Button variant="text">Back</C.Button>
            </Link>
          }
        />
        <C.Divider variant="middle" />
        <C.CardContent>
          {method ? <RegisterForm {...props} /> : <LoginForm {...props} />}
        </C.CardContent>
      </GlassCard>
    </C.Container>
  );
};

export default Auth;

export async function getServerSideProps(context) {
  const { req, query } = context;
  const { origin } = absoluteUrl(req);

  const referer = req.headers.referer || "";
  const baseApiUrl = `${origin}/api`;

  return {
    props: {
      origin,
      referer,
      baseApiUrl,
      query,
    },
  };
}
