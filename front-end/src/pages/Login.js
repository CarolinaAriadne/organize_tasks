import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Input from "../components/Input";
// import { AppContext } from '../contexts/AppContext';

export default function LoginPage() {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(true);

  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await api.post("/login", { email, password });
      if (data.token) {
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/tasks");
      }
    } catch (err) {
      setError("Dados inválidos");
    }
  };

  const disableSubmit = () => {
    if (typeof email === "string" && typeof password === "string") {
      setDisabled(false);
      setError("");
    } else {
      setDisabled(true);
      setDisabled("Dados inválidos");
    }
  };

  return (
    <form class="formLogin" onSubmit={onSubmit}>
      {/* <div> */}
        <label htmlFor="email">
          <section class="sectionLogin">Login</section>       
          <Input
            name="email"
            type="text"
            onChange={({ target }) => setEmail(target.value)}
            onKeyUp={disableSubmit}
            value={email}
          ></Input>
        </label>
      {/* </div> */}
      {/* <div> */}
        <label htmlFor="password">
         <section class="sectionSenha">Senha</section>
          <Input
            type="password"
            name="password"
            onChange={({ target }) => setPassword(target.value)}
            onKeyUp={disableSubmit}
            value={password}
          ></Input>
        </label>
      {/* </div> */}
      <div>
        <button type="submit" disabled={disabled}>
          Enviar
        </button>
        <button type="button" onClick={() => navigate("/register")}>
          Ainda não tenho conta
        </button>
      </div>
      {error && <p>{error}</p>}
    </form>
  );
}
