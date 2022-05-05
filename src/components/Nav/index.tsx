
import { Link } from "react-router-dom";
import Hamburger from "../Hamburger";
import { useState } from "react";

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
  ];

  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  
  const toggleHamburger = () => {
    setHamburgerOpen(!hamburgerOpen);
  }

  return (
    <header>
      <nav>
        <ul>
          <h1>
            <Link to="/">
              <span role="img" aria-label="Back2Better Logo - metro car emoji">🚇Back2Better</span>
            </Link>
          </h1>
            {stationsList.map(station => (
              <li key = {station.name}>
                <Link to={`/${station.name}`} >
                  {station.display}
                </Link>
              </li>
            ))}

        </ul>
        <div className="outer-hamburger" onClick={toggleHamburger}>
            <Hamburger />
        </div>

      </nav>
    </header>
  );
}

export default Nav;
