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
        },
      },
    },
    MuiBottomNavigation: {
      root: { zIndex: 100, width: "100%", position: "fixed", bottom: 0 },
    },
    MuiContainer: {
      root: {
        height: "100%",
        background: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      },
    },
  },
});

//https://material-ui.com/customization/typography/#responsive-font-sizes
theme = responsiveFontSizes(theme);

export default theme;
