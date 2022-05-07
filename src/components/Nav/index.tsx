
import { Link } from "react-router-dom";
import { useEffect} from "react";

function Nav({stationsList} : any) {

  useEffect(() => {
    window.addEventListener('scroll', isSticky);
    return () => {
        window.removeEventListener('scroll', isSticky);
    };
  });

  const isSticky = (e) => {
    const header : any = document.querySelector('header');
    const scrollTop = window.scrollY;
    scrollTop >= 100 ? header.classList.add('is-sticky') : header.classList.remove('is-sticky');
  };
  
  return (
    <>
    <header>
      <nav>
        <ul className="header-ul">
          <h1>
            <Link to="/">
              <span role="img" aria-label="Back2Better Logo - metro car emoji">🚇Back2Better</span>
              {/*<h6>Using <a href="https://dcmetrohero.com/apis">MetroHero API</a></h6>*/}
            </Link>
          </h1>
            {stationsList.map(station => (
              <>
                <li key = {station.name}>
                  <Link to={`/${station.name}`} >
                  <span className="station-circle" style={{'backgroundColor' : `${station.name}`}}></span>
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
