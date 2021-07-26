import { createTheme, responsiveFontSizes } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

let theme = createTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "brown",
    },
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "html, body": {
          height: "100%",
        },
        "#__next": {
          height: "100%",
          display: "flex",
          flexDirection: "column",
        },
      },
    },
    MuiBottomNavigation: {
      root: {
        zIndex: 100,
        width: "100%",
        flex: "0 0 10%",
        position: "relative",
      },
    },
    MuiContainer: {
      root: {
        overflowY: "auto",
        flexGrow: "1",
        background: "white",
      },
    },
  },
});

//https://material-ui.com/customization/typography/#responsive-font-sizes
theme = responsiveFontSizes(theme);

export default theme;
