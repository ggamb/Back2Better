import React from 'react';
import { BrowserRouter as Router, Route, Routes, useRoutes } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import Nav from './components/Nav';
import Home from './components/Home';
import Green from './components/Green';
import Yellow from './components/Yellow';
import Red from './components/Red';
import Blue from './components/Blue';
import Orange from './components/Orange';
import Silver from './components/Silver';
import NoMatch from './pages/NoMatch'

function App() {
  

  const App = () => {
    
      let routes = useRoutes([
      {path: '*', element: <NoMatch/>},
      {path: '/', element: <Home/>},
      {path: "/home", element: <Home /> },
      {path : '/green', element : <Green/> },
      {path : '/GR', element : <Green/> },
      {path : '/red', element : <Red/> },
      {path : '/RD', element : <Red/> },
      {path : '/yellow', element : <Yellow/> },
      {path : '/YL', element : <Yellow/> },
      {path : '/blue', element : <Blue/> },
      {path : '/BL', element : <Blue/> },
      {path : '/orange', element : <Orange/> },
      {path : '/OR', element : <Orange/> },
      ]);

      return routes;
  }


  return (
    <Router>
      <Nav />
      <App />
    </Router>
  );
}

export default App;
