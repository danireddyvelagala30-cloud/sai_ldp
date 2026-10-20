import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    chip?: {
      clear: { bg: string; text: string };
      consider: { bg: string; text: string };
      engaged: { bg: string; text: string; border: string };
    };
  }
  interface PaletteOptions {
    chip?: {
      clear: { bg: string; text: string };
      consider: { bg: string; text: string };
      engaged: { bg: string; text: string; border: string };
    };
  }
}

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
    chip: {
      clear: {
        bg: "#ECFDF5",
        text: "#12B76A",
      },
      consider: {
        bg: "#FEF0C7",
        text: "#B54708",
      },
      engaged: {
        bg: "#ECFDF5",
        text: "#12B76A",
        border: "#A6F4C5",
      },
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
    button: {
      fontWeight: 600,
      textTransform: "none",
    },
  },

  shape: {
    borderRadius: 8,
  },

  components: {
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          borderRadius: 4,
        },
        colorSuccess: ({ theme }) => ({
          backgroundColor: theme.palette.chip?.clear.bg ?? theme.palette.success.light,
          color: theme.palette.chip?.clear.text ?? theme.palette.success.dark,
        }),
        colorWarning: ({ theme }) => ({
          backgroundColor: theme.palette.chip?.consider.bg ?? theme.palette.warning.light,
          color: theme.palette.chip?.consider.text ?? theme.palette.warning.dark,
        }),
      },
    },
  },
});

export default theme;