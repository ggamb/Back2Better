
import { Link } from "react-router-dom";

const Footer = ({footerData} : any) => {
   
    return (
      <footer>
        <ul className="footer-content">
            {footerData.map((footerStation) : any => (
              <li key = {footerStation.name}>
                <span className="station-circle" style={{'background-color' : `${footerStation.name}`}}></span>
                <Link to={`/${footerStation.name}`} >
                  {footerStation.shortDisplay}
                </Link>
              </li>
            ))}
        </ul>
      </footer>
  )
}

export default Footer;