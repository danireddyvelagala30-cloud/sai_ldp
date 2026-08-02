import { Container, CssBaseline, ThemeProvider } from "@mui/material";

import CandidateAccordion from "./components/organisms/CandidateAccordion";
import theme from "./theme/theme";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container
        maxWidth="lg"
        sx={(theme) => ({
          mt: 4,
          bgcolor: theme.palette.background.default,
          minHeight: "100vh",
          py: 4,
        })}
      >
        <CandidateAccordion />
      </Container>
    </ThemeProvider>
  );
};

export default App;