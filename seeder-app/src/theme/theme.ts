import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121118',
      paper: '#1E1C26',
    },
    primary: {
      main: '#6C5DD3',
      light: '#8A84FF',
      dark: '#5B4CBF',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#282536',
      light: '#322F43',
      dark: '#171520',
      contrastText: '#A5A2B8',
    },
    text: {
      primary: '#E8E7F0',
      secondary: '#A5A2B8',
    },
    divider: '#2B2836',
  },
  typography: {
    fontFamily: ['"Inter"', '"Roboto"', '"Helvetica"', '"Arial"', 'sans-serif'].join(','),
    h1: {
      fontSize: '28px',
      fontWeight: 700,
      color: '#E8E7F0',
    },
    h2: {
      fontSize: '24px',
      fontWeight: 600,
      color: '#E8E7F0',
    },
    h3: {
      fontSize: '20px',
      fontWeight: 600,
      color: '#E8E7F0',
    },
    body1: {
      fontSize: '16px',
      color: '#E8E7F0',
    },
    body2: {
      fontSize: '14px',
      color: '#A5A2B8',
    },
    caption: {
      fontSize: '12px',
      color: '#727080',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          textTransform: 'none',
          fontWeight: 600,
          padding: '12px 20px',
        },
        contained: {
          backgroundColor: '#6C5DD3',
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: '#5B4CBF',
          },
          '&.Mui-disabled': {
            backgroundColor: '#3E3867',
            color: '#7A74A5',
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: '#727080',
          borderRadius: '6px',
          '&.Mui-checked': {
            color: '#6C5DD3',
          },
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          color: '#8A84FF',
          height: 8,
        },
        rail: {
          backgroundColor: '#2A2738',
          opacity: 1,
        },
        track: {
          backgroundColor: '#8A84FF',
          border: 'none',
        },
        thumb: {
          width: 20,
          height: 20,
          backgroundColor: '#8A84FF',
          '&:hover, &.Mui-focusVisible, &.Mui-active': {
            boxShadow: '0 0 0 8px rgba(138, 132, 255, 0.16)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#1E1C26',
          borderRadius: '16px',
          border: '1px solid #2B2836',
        },
      },
    },
  },
});
