import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TelaInicial from "./pages/TelaInicial";
import QRCodeScanner from "./pages/QRCodeScanner";
import CardDetails from "./pages/CardDetails";
import Entrar from "./pages/Entrar";
import Info from "./pages/TrilhaEcologica";
import CardList from "./pages/CardList";
import ChangePassword from "./pages/ChangePassword.jsx";
import { syncUsersFromBackend, syncSpeciesFromBackend } from "./dbStatic/sync";
import { useEffect, useState } from "react";

const App = () => {
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    async function synchronizeData() {
      if (navigator.onLine) {
        setIsSyncing(true);
        try {
          await syncUsersFromBackend();
          await syncSpeciesFromBackend();
        } catch (error) {
          console.error("Erro ao sincronizar dados:", error);
        }
        setIsSyncing(false);
      }
    }

    synchronizeData();

    window.addEventListener("online", synchronizeData);

    return () => {
      window.removeEventListener("online", synchronizeData);
    };
  }, []);

  return (
    <Router>
      {isSyncing && <div className="sync-message">Sincronizando dados...</div>}
      <Routes>
        <Route path="/" element={<TelaInicial />} />
        <Route path="/info" element={<Info />} />
        <Route path="/entrar" element={<Entrar />} />
        <Route path="/nova-senha" element={<ChangePassword />} />
        <Route path="/QRCodeScanner" element={<QRCodeScanner />} />
        <Route path="/card-details" element={<CardDetails />} />
        <Route path="/card-list" element={<CardList />} />
      </Routes>
    </Router>
  );
};

export default App;
