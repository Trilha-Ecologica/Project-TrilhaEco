import "../styles/ChangePassword.css";
import imgLogin from "/assets/imgLogin.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const isButtonActive = email !== "";

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestBody = {
      login: email,
    };

    try {
      const response = await fetch("https://trilha-2vfh.onrender.com/users/sendResetPasswordEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      if (response.ok) {
        navigate("/");
      }
    } catch (error) {
      console.error("Erro:", error);
    }
  };
  return (
    <div className="container-changepassword">
      <img src={imgLogin} className="img-changepassword"></img>
      <div className="input-container-changepassword">
        <input
          id="email"
          className="input-changepassword"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="email" className="floating-label-changepassword">
          Email
        </label>
      </div>
      <p className="text-changepssword">
        Digite seu e-mail para redefinir sua senha. Enviaremos um codigo de validação para você
        criar uma nova senha.
      </p>  
      <button
        className={`button-changepassword ${isButtonActive ? "active" : ""}`}
        disabled={!isButtonActive}
        onClick={handleSubmit}
      >
        ENVIAR
      </button>
    </div>
  );
};

export default Login;
