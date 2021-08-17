import { createTheme, responsiveFontSizes } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

let theme = createTheme({
  palette: {
    primary: {
      main: "#06baec",
      dark: "#1e3156",
      contrastText: "#fafafa",
    },
    secondary: {
      main: "#f1da00",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#06baec",
      paper: "#06baec",
    },
    text: {
      primary: "#1e3156",
    },
    type: "light",
  },
  typography: {
    h2: {
      fontSize: "2.5rem",
      fontWeight: 500,
      lineHeight: "1.5",
      padding: "30px 0px",
    },
    body1: {},
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "html, body": {
          minHeight: "100vh",
        },
        "#__next": {
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        },
        iframe: {
          margin: "30px 0px",
        },
      },
    },
    MuiButton: {
      contained: { width: "75%" },
    },
    MuiBottomNavigation: {
      root: {
        zIndex: 100,
        width: "100%",
        flex: "0 0 10%",
        position: "fixed",
        bottom: 0,
      },
    },
    MuiBottomNavigationAction: {
      label: { color: "#fafafa" },
      root: { "&$selected": { color: "#fafafa" } },
    },
    MuiContainer: {
      root: {
        // height: "1000px",
        // overflowY: "auto",
        flexGrow: "1",
        background: "none",
        //padding bottom needs to be height of bottom nav
        paddingBottom: "56px",
      },
    },
  },
});

//https://material-ui.com/customization/typography/#responsive-font-sizes
theme = responsiveFontSizes(theme);

export default theme;
