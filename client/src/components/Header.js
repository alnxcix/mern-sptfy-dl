import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";

const Header = () => (
  <nav className="themed-navbar navbar">
    <div className="container-fluid">
      <span className="mb-0 h1">
        <FontAwesomeIcon icon={faSpotify} style={{ color: "#1db954" }} />{" "}
        Spotify{" "}
        <small className="badge rounded-pill font-monospace" id="dl-badge">
          {"</downloader>"}
        </small>
      </span>
    </div>
  </nav>
);

export default Header;
