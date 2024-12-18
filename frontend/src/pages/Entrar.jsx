import "../styles/Entrar.css";
import imgLogin from "/assets/imgLogin.png";
import { useState } from "react";
import { loginOffline } from "../dbStatic/offline-db";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(false);
  const isButtonActive = email !== "" && password !== "";

  const handleNewPasswordClick = () => {
    navigate("/nova-senha");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestBody = {
      login: email,
      password: password,
    };

    try {
      const response = await fetch(
        "https://trilha-2vfh.onrender.com/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );
      if (response.ok) {
        setLoginError(false);
        navigate("/");
      } else {
        setLoginError(true);
        console.error("Erro ao fazer login:", response.status);
      }
    } catch (error) {
      setLoginError(true);
      console.error("Erro na requisição:", error);
    }

    try {
      const result = await loginOffline(email, password);

      if (result.success) {
        setLoginError(false);
        navigate("/");
      } else {
        setLoginError(true);
      }
    } catch (error) {
      setLoginError(true);
      console.error("Erro no login offline:", error);
    }
  };

  console.log(loginError);

  return (
    <div className="container-entrar">
      <img src={imgLogin} className="img-entrar"></img>
      <div className="input-container">
        <input
          id="email"
          className="input-entrar"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label
          htmlFor="email"
          className={`floating-label ${loginError ? "error-label" : ""}`}
        >
          Email
        </label>
      </div>

      <div className="input-container">
        <input
          id="password"
          className="input-entrar"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label
          htmlFor="password"
          className={`floating-label ${loginError ? "error-label" : ""}`}
        >
          Senha
        </label>
      </div>
      {loginError && (
        <p className="error-text-entrar">
          * Erro ao fazer login. Verifique seu email e senha e tente novamente.
        </p>
      )}
      <a className="text-entrar" onClick={handleNewPasswordClick}>
        Esqueceu a senha?
      </a>
      <button
        className={`button-entrar ${isButtonActive ? "active" : ""}`}
        disabled={!isButtonActive}
        onClick={handleSubmit}
      >
        ENTRAR
      </button>
    </div>
  );
};

export default Login;
