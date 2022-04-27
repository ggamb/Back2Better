import React from "react";
import { Link } from "react-router-dom";
import Green from '../Green';
import Yellow from '../Yellow';
import Red from '../Red';
import Blue from '../Blue';
import Orange from '../Orange';
import Silver from '../Silver';
import Home from '../Home';


function Nav() {
  const stationsList = [
    {
      name: 'red',
      display: 'Red'
    },
    {
      name: 'green',
      display: 'Green'
    },
    {
      name: 'yellow',
      display: 'Yellow'
    },
    {
      name: 'blue',
      display: 'Blue'
    },
    {
      name: 'orange',
      display: 'Orange'
    },
    {
      name: 'silver',
      display: 'Silver'
    },
  ]


  function showNavigation()  {
      return (
        <ul className="flex-row">
        <h1>
          <Link to="/">
            <span role="img" aria-label="Back2Better Logo - metro car emoji">🚇Back2Better</span>
          </Link>
        </h1>
          {stationsList.map(station => (
            <li key = {station.name} className = "nav-list">
              <Link to={`/${station.name}`} >
                {station.display}
              </Link>
            </li>
          ))}
        </ul>

      );
  }

  return (
    <header className="flex-row">
      <nav>
        {showNavigation()}
      </nav>
    </header>
  );
}

export default Nav;
