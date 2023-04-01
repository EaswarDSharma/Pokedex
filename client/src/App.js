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
  return (<>
    <Router>
      <div className="App">
        <header >
        <Grid container  sx={{ flexGrow: 1 }}>
          <AppBar position="static" elevation={0}>
            <Toolbar>
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
    </>
  );
}

export default App;
