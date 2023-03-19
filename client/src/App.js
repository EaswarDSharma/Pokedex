import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import OtherPage from './OtherPage';
import Fib from './Fib';
import { Typography } from '@mui/material';


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
        <header className="App-header">
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
            Ya!....Ya!
          </a>
          <Link to="/">Home</Link>
          <Link to="/otherpage">Other Page</Link>
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
