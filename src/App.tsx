import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Customerlist from "./components/Customerlist";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

function App() {
  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">PersonalTrainer</Typography>
        </Toolbar>
      </AppBar>
      <Container style={{ maxWidth: 1300, width: "100%"}}>
        <Customerlist />
      </Container>
    </>
  );
}

export default App;
