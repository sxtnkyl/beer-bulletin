import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import React, { useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../styles/theme";

//_app only has access to React DOM tree
//_document can access entire DOM
//If using useContext, wrap here
function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // MUI: Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>My page</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </React.Fragment>
  );
}

export default MyApp;
