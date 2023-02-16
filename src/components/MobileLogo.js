// styles & images
import "./MobileLogo.css";
import Bulletin from "../assets/bulletin-2.png";

export default function MobileLogo() {
  return (
    <div className="mobile-logo-container">
      <ul>
        <li className="mobile-logo">
          <img src={Bulletin} alt="Busy Bulletin Board" />
          <span>BUSY BULLETIN</span>
        </li>
      </ul>
    </div>
  );
}
