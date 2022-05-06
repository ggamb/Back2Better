
import { Link } from "react-router-dom";

const Footer = ({footerData} : any) => {
   
    return (
      <>
      <div className='footer-gap'></div>
      <footer>
        <ul className="footer-content">
            {footerData.map((footerStation) : any => (
              <li key = {footerStation.name}>
                <Link to={`/${footerStation.name}`} >
                <span className="station-circle" style={{'backgroundColor' : `${footerStation.name}`}}></span>
                  {footerStation.shortDisplay}
                </Link>
              </li>
            ))}
        </ul>
      </footer>
      </>
  )
}

export default Footer;