import "../styles/TrilhaEcologica.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faShareNodes } from "@fortawesome/free-solid-svg-icons";
import imgInfo from "../assets/imgDiv2TelaInicial.jpg";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";

const Info = () => {
  const navigate = useNavigate();

  const handleTelaInicialClick = () => {
    navigate("/");
  };

  return (
    <div className="container-info">
      <div className="header-info">
        <FontAwesomeIcon
          icon={faArrowLeft}
          style={{
            color: "#0C9762",
            width: "2.02vh",
            height: "2.02vh",
            marginLeft: "3.91vh",
          }}
          onClick={handleTelaInicialClick}
        />
        <p className="tittle-info">O que é a trilha ecológica</p>
        <FontAwesomeIcon
          icon={faShareNodes}
          style={{
            color: "#0C9762",
            width: "3vh",
            height: "3vh",
            marginRight: "4vh",
          }}
        />
      </div>
      <img src={imgInfo} className="img-info" />
      <div className="div-text-info">
        <p className="texto-info">
          A Trilha Ecológica da Universidade Tecnológica Federal do Paraná
          (UTFPR) é uma iniciativa única que oferece aos visitantes a
          oportunidade de explorar a biodiversidade local enquanto se engajam em
          atividades educativas e recreativas. Localizada em um cenário natural
          exuberante, a trilha proporciona uma experiência imersiva na flora e
          fauna nativas da região.
          <p className="subttile-info">Descubra a Natureza</p>
          <p className="texto-info">
            A trilha é cuidadosamente projetada para levar os visitantes por uma
            jornada através de diferentes ecossistemas, onde é possível observar
            uma variedade de plantas e animais em seu habitat natural. Com um
            percurso bem sinalizado, a trilha é acessível para pessoas de todas
            as idades e níveis de condicionamento físico.
          </p>
        </p>
      </div>
      <div className="div-navbar">
        <NavBar />
      </div>
    </div>
  );
};

export default Info;
