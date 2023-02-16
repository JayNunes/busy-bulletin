import { Link } from "react-router-dom";

import "./Footer.css";

export default function Footer() {
  return (
    <div className="footer">
      <p>
        Site created by{" "}
        <Link
          to={"https://www.jaynunes.dev"}
          target="_blank"
          rel="noopener noreferrer"
        >
          Jay Nunes
        </Link>
        , © 2022
      </p>
    </div>
  );
}
