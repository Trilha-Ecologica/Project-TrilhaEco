import "../styles/CardList.css";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import NavBar from "../components/NavBar";
import { fetchSpeciesFromCache } from "../dbStatic/offline-db";
import { useNavigate } from "react-router-dom";

const CardList = () => {
  const [species, setSpecies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchSpecies = async () => {
    try {
      if (navigator.onLine) {
        console.log("Tentando buscar os dados online...");
        const response = await fetch("https://trilha-2vfh.onrender.com/species");
        if (response.ok) {
          const data = await response.json();
          setSpecies(data);
          setLoading(false);
        } else {
          console.error("Falha ao buscar dados online. Tentando offline...");
          throw new Error("Falha ao buscar online");
        }
      } else {
        console.log("Sem conexão. Tentando buscar offline...");
        const result = await fetchSpeciesFromCache();
        if (result) {
          setSpecies(result);
          setLoading(false);
        } else {
          throw new Error("Não foi possível carregar os detalhes da espécie offline.");
        }
      }
    } catch (err) {
      setError("Erro ao carregar os dados da espécie.");
      console.error("Erro ao buscar os dados:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpecies();
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  const handleCardClick = (id) => {
    navigate("/card-details", { state: { speciesId: id } });
  };

  return (
    <div className="container-cardlist">
      <p className="tittle-cardlist">Espécies encontradas</p>
      <div className="grid-container">
        {species.map((specie) => (
          <div
            className="grid-item"
            key={specie.id}
            onClick={() => handleCardClick(specie.id)}
          >
            <img src={specie.imgURL} alt={specie.nomepopular} />
            <div className="card-overlay">
              <p>{specie.nomepopular}</p>
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                style={{
                  color: "#ffffff",
                  width: "2.02vh",
                  height: "2.02vh",
                  marginLeft: "3.91vh",
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="div-navbar">
        <NavBar />
      </div>
    </div>
  );
};

export default CardList;
