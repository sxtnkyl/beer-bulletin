import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import React, { useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../styles/theme";
import Layout from "../components/Layout";

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
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default MyApp;
