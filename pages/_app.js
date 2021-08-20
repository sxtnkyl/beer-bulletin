import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import React, { useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../styles/theme";
import Layout from "../components/Layout";
import { getAppCookies, verifyToken } from "../middleware/utils";

//_app only has access to React DOM tree
//_document can access entire DOM
//If using useContext, wrap here
function MyApp({ Component, pageProps }) {
  console.log(pageProps);
  useEffect(() => {
    // MUI: Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout {...pageProps.user}>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </React.Fragment>
  );
}

//https://nextjs.org/docs/advanced-features/custom-app
//runs only on initial load
//check auth status- pass to pages in pageProps
MyApp.getInitialProps = async ({ Component, ctx }) => {
  const {
    store,
    isServer,
    req,
    query: { amp },
    asPath,
  } = ctx;

  const { token } = getAppCookies(req);
  const user = token && verifyToken(token.replace("Bearer ", ""));

  let pageProps = { user, asPath };
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps({ ctx });
  }

  return { pageProps };
};

export default MyApp;
