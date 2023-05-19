import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import OtherPage from './OtherPage';
import Fib from './Fib';
import { Typography,IconButton,Button } from '@mui/material';
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Unstable_Grid2';
import { makeStyles } from '@mui/styles';
import pokemon from './pokemon.jpg';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link to="/">website</Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
function App() {
  const useStyles = makeStyles({
    root: {
      backgroundImage: `url(${pokemon})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      
    },
  });
  const classes = useStyles();
  return (<div className={classes.root}>

    <Router>
      <div className="App">
        <header >
        <Grid container  sx={{ flexGrow: 1 }}>
          <AppBar position="static"  style={{ background: 'transparent', boxShadow: 'none'}}>
            <Toolbar >
            <Grid xs={6} xsOffset={3} md={2} mdOffset={0}>
          <IconButton 
          color="secondary" 
          aria-label="add to shopping cart" 
          edge="start"
          
          href="/"
          >
          <ShoppingCartTwoToneIcon />
          </IconButton>
          </Grid>
          <div style={{ flexGrow: 1 }}></div>
          <Link to="/otherpage">Other Page</Link>
          </Toolbar>
          </AppBar>
          </Grid>
        </header>
        <div>
          <Route exact path="/" component={Fib} />
          <Route path="/otherpage" component={OtherPage} />
        </div>
        <Copyright/>

      </div>
    </Router>
    </div>
  );
}

export default App;
