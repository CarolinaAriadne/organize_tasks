// import { useContext, useEffect, useState } from "react"
// import {AppContext} from '../contexts/AppContext';
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import api from "../services/api";
// import InputTask from "../components/InputTask";
// import ButtonSubmitTask from "../components/ButtonSubmitTask";
// import Button from "../components/Button";

export default function TasksPage() {
  const [error, setError] = useState("");
  const [name_task, setTask] = useState("");
  const [disabled, setDisabled] = useState(true);

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await api.post("/tasks", { name_task });

      localStorage.setItem("name_task", JSON.stringify(data));
    } catch (err) {
      setError("Dados inválidos");
    }
  };

  const disableSubmit = () => {
    if (typeof name_task === "string") {
      console.log("aqui");
      setDisabled(false);
      setError("");
    } else {
      setDisabled(true);
      setDisabled("Dados inválidos");
    }
  };

  return (
    <form className="formTask" onSubmit={onSubmit}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;1,700&display=swap"
        rel="stylesheet"
      />
      <header><h1 className="h1Task">Minhas tarefas</h1></header>
      <section className="container">
        <section className="container-new-task">
          <input
            className="inputTask"
            placeholder="nova tarefa"
            name="task"
            type="text"
            onChange={({ target }) => {
              console.log(target.value);
              setTask(target.value);
            }}
            onKeyUp={disableSubmit}
            value={name_task}
          ></input>
          {/* <section className="sectionBtnCriar"> */}
          <button
            className="newTaskButton"
            type="submit"
            content="criar"
            disabled={disabled}
          >
            Criar
          </button>
        </section>
        <section className="tasks-container"></section>
      </section>
      {/* </section> */}
      {/* <Button
          type="button"
          content="Não tenho conta"
          onClick={() => navigate("/register")}
        ></Button> */}
      <section>{error && <p className="erroDeDados">{error}</p>}</section>
    </form>
  );
}
