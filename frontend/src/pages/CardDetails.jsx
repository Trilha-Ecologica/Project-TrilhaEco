import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faShareNodes } from "@fortawesome/free-solid-svg-icons";
import "../styles/CardDetails.css";
import { useNavigate, useLocation } from "react-router-dom";
import { getSpeciesById } from "../dbStatic/offline-db";
import NavBar from "../components/NavBar";

const CardDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { qrCodeData, speciesId } = location.state || {};
  const [speciesDetails, setSpeciesDetails] = useState(null);
  const [error, setError] = useState(null);

  const handleTelaInicialClick = () => {
    navigate("/");
  };

  useEffect(() => {
    const id = qrCodeData || speciesId;
    if (!id) {
      console.error("ID não fornecido. Redirecionando para a tela inicial.");
      navigate("/");
      return;
    }

    const fetchSpeciesDetails = async () => {
      try {
        if (navigator.onLine) {
          console.log("Tentando buscar os dados online...");
          const response = await fetch(
            `https://trilha-2vfh.onrender.com/species/${id}`
          );
          if (response.ok) {
            const data = await response.json();
            setSpeciesDetails(data);
          } else {
            console.error(
              "Falha ao buscar detalhes online. Tentando offline..."
            );
            throw new Error("Falha ao buscar online");
          }
        } else {
          console.log("Sem conexão. Tentando buscar offline...");
          const result = await getSpeciesById(id);

          if (result) {
            setSpeciesDetails(result);
          } else {
            setError(
              "Não foi possível carregar os detalhes da espécie offline."
            );
          }
        }
      } catch (error) {
        setError("Erro ao carregar os dados da espécie.");
        console.error("Error fetching data:", error);
      }
    };

    fetchSpeciesDetails();
  }, [qrCodeData, speciesId, navigate]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!speciesDetails) {
    return <p>Carregando detalhes...</p>;
  }

  return (
    <div className="card-details-container">
      <div className="header-carddetails">
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
        <p className="tittle-carddetails">Detalhes da espécie</p>
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
      <img
        src={speciesDetails.imgURL || "placeholder.png"}
        alt={speciesDetails.nomepopular || "Imagem da espécie"}
        className="img-carddetails"
      />
      <div className="div-text-carddetails">
        <p className="subttile-carddetails">
          {speciesDetails.nomepopular} ({speciesDetails.nomecientifico})
        </p>
        <p className="text-carddetails">{speciesDetails.descricao}</p>
        <p className="subttile-carddetails">Características</p>
        <p className="text-carddetails">{speciesDetails.caracteristicas}</p>
      </div>
      <div className="div-navbar">
        <NavBar />
      </div>
    </div>
  );
};

export default CardDetails;
