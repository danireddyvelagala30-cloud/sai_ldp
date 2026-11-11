import { Container, CssBaseline, ThemeProvider } from "@mui/material";

import CandidateAccordion from "./components/organisms/CandidateAccordion";
import theme from "./theme/theme";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main className="app-container">
        <Container maxWidth="lg">
          <CandidateAccordion />
        </Container>
      </main>
    </ThemeProvider>
  );
};

export default App;