import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faQrcode } from "@fortawesome/free-solid-svg-icons";
import { faFile } from "@fortawesome/free-regular-svg-icons";
import "../styles/NavBar.css";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleQRCodeScannerClick = () => {
    navigate("/QRCodeScanner");
  };

  const handleCardListClick = () => {
    navigate("/card-list");
  };

  return (
    <div className="navbar">
      <FontAwesomeIcon
        icon={faHouse}
        style={{
          color: "#0C9762",
          width: "3vh",
          height: "3vh",
          marginLeft: "2vh",
          marginRight: "2vh",
        }}
        onClick={handleHomeClick}
      />
      <FontAwesomeIcon
        icon={faQrcode}
        style={{
          color: "#0C9762",
          width: "3vh",
          height: "3vh",
          marginLeft: "2vh",
          marginRight: "2vh",
        }}
        onClick={handleQRCodeScannerClick}
      />
      <FontAwesomeIcon
        icon={faFile}
        style={{
          color: "#0C9762",
          width: "3vh",
          height: "3vh",
          marginLeft: "2vh",
          marginRight: "2vh",
        }}
        onClick={handleCardListClick}
      />
    </div>
  );
};

export default NavBar;
