import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import OtherPage from "./OtherPage";
import Fib from "./Fib";
import { Typography, IconButton, Button, Paper } from "@mui/material";
import CatchingPokemonTwoToneIcon from "@mui/icons-material/CatchingPokemonTwoTone";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Unstable_Grid2";
import { makeStyles } from "@mui/styles";
import pokemon from "./pokemon.jpg";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link to="/">website</Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
function App() {
  const useStyles = makeStyles({
    root: {
      background: `url(${pokemon}) no-repeat center center fixed`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundAttachment: "fixed",
      width: "100vw",
      minHeight: "100vh",
    },
  });
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Router>
        <div className="App">
          <header>
            <Grid container sx={{ flexGrow: 1 }}>
              <AppBar
                position="fixed"
                style={{
                  background: "transparent",
                  boxShadow: "none",
                }}
              >
                <Toolbar>
                  <IconButton
                    aria-label="add to shopping cart"
                    edge="start"
                    href="/"
                    style={{
                      backgroundColor: "white",
                      borderRadius: "50%",
                      width: "36px",
                      height: "36px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <CatchingPokemonTwoToneIcon
                      fontSize="large"
                      htmlColor="#E3242B"
                    />
                  </IconButton>
                  <div style={{ flexGrow: 1 }}></div>
                  <IconButton
                    aria-label="add to shopping cart"
                    edge="start"
                    href="/otherpage"
                    style={{
                      backgroundColor: "white",
                      borderRadius: "50%",
                      width: "36px",
                      height: "36px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <InfoOutlinedIcon fontSize="large" htmlColor="#E3242B" />
                  </IconButton>
                </Toolbar>
              </AppBar>
            </Grid>
          </header>
          <div>
            <Route exact path="/" component={Fib} />
            <Route path="/otherpage" component={OtherPage} />
          </div>
          <Copyright />
        </div>
      </Router>
    </div>
  );
}

export default App;