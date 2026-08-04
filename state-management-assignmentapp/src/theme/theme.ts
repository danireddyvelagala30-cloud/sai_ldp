import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#224DFF",
    },
    success: {
      main: "#00C853",
    },
    warning: {
      main: "#F9A825",
    },
    background: {
      default: "#F5F7FB",
    },
  },

  typography: {
    fontFamily: "Inter",

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