import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  cssVariables: true,
  colorSchemes: {
    light: true,
  },
  palette: {
    primary: {
      main: "#224DFF",
      dark: "#1B3EC8",
      light: "#EFF4FF",
    },
    success: {
      main: "#00C853",
      light: "#ECFDF5",
      dark: "#12B76A",
    },
    warning: {
      main: "#F9A825",
      light: "#FEF0C7",
      dark: "#B54708",
    },
    background: {
      default: "#F5F7FB",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#101828",
      secondary: "#667085",
    },
    divider: "#EAECF0",
    grey: {
      50: "#F9FAFB",
      100: "#F3F3F3",
      200: "#EAECF0",
      300: "#D0D5DD",
      400: "#98A2B3",
      500: "#667085",
      600: "#475467",
      700: "#344054",
      800: "#1D2939",
      900: "#101828",
    },
  },

  typography: {
    fontFamily: "Inter, Arial, Helvetica, sans-serif",

    h5: {
      fontWeight: 600,
    },

    body1: {
      fontSize: "14px",
    },
  },

  shape: {
    borderRadius: 8,
  },
});

export default theme;