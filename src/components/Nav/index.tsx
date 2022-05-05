
import { Link } from "react-router-dom";
import Hamburger from "../Hamburger";
import { useState } from "react";
import Footer from "../Footer";

function Nav({stationsList} : any) {
  return (
    <>
    <header>
      <nav>
        <ul className="header-ul">
          <h1>
            <Link to="/">
              <span role="img" aria-label="Back2Better Logo - metro car emoji">🚇Back2Better</span>
            </Link>
          </h1>
            {stationsList.map(station => (
              <>
                <li key = {station.name}>
                <span className="station-circle" style={{'background-color' : `${station.name}`}}></span>
                  <Link to={`/${station.name}`} >
                    {station.display}
                  </Link>
                </li>
              </>
            ))}
        </ul>
      </nav>
    </header>
    </>
  );
}

export default Nav;
