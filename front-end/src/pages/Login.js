import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Input from "../components/Input";
import ButtonSubmit from "../components/ButtonSubmit";
import Button from "../components/Button";

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
    <form className="formLogin" onSubmit={onSubmit}>
      <label htmlFor="email">
        <section className="sectionEmail">
          <Input
            placeholder="Email"
            name="email"
            type="text"
            onChange={({ target }) => setEmail(target.value)}
            onKeyUp={disableSubmit}
            value={email}
          ></Input>
        </section>
      </label>
      <label htmlFor="password">
        <section className="sectionSenha">
          <Input
            placeholder="Senha"
            type="password"
            name="password"
            onChange={({ target }) => setPassword(target.value)}
            onKeyUp={disableSubmit}
            value={password}
          ></Input>
        </section>
      </label>
      <section>
        <ButtonSubmit
          type="submit"
          content="Enviar"
          disabled={disabled}
        ></ButtonSubmit>
      </section>
      <Button
        type="button"
        content="Não tenho conta"
        onClick={() => navigate("/register")}
      ></Button>

      {/* <button type="button" onClick={() => navigate("/register")}>
        Ainda não tenho conta
      </button> */}
      <section>{error && <p>{error}</p>}</section>
    </form>
  );
}
