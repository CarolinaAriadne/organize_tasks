import { useState, useEffect } from "react";
import api from "../services/api";

export default function TasksPage() {
  const [error, setError] = useState("");
  const [name_task, setTask] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [tasks, addTask] = useState([]);
  const [allTasks, getTasks] = useState([{}]);

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    try {
      const { data } = await api.get("/tasks");
      getTasks(data);
    } catch (err) {
      setError("Bad Request");
    }
  }

  const handleRemove = async (id) => {
    console.log(id)
    // let reduceTodoTasks = [...allTasks];
    // console.log(reduceTodoTasks)
    // reduceTodoTasks.splice(id)
    // console.log(reduceTodoTasks)

    // getTasks(reduceTodoTasks);

    try {
      const { data } = await api.delete("/tasks/:id", { id });

      getTasks(data);
    } catch (err) {
      setError("Bad Request");
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await api.post("/tasks", { name_task });

      addTask([...tasks, data]);
    } catch (err) {
      setError("Dados inválidos");
    }
  };

  const disableSubmit = () => {
    if (typeof name_task === "string") {
      console.log(name_task, "aqui3");
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
      <header>
        <h1 className="h1Task">Minhas tarefas</h1>
      </header>
      <section className="container">
        <section className="container-new-task">
          <input
            className="inputTask"
            placeholder="nova tarefa"
            name="task"
            type="text"
            onChange={({ target }) => {
              setTask(target.value);
            }}
            onKeyUp={disableSubmit}
            value={name_task}
          ></input>

          <button
            className="newTaskButton"
            type="submit"
            content="criar"
            disabled={disabled}
          >
            Criar
          </button>
        </section>
        <section>
          {/* <div> */}
          {tasks.map((task) => {
            return (
              <div className="tasks-container">
                <p className="p-addtask" key={task.id}>
                  {task.name_task}
                </p>
                <button
                  type="button"
                  className="btn-excluir"
                  onClick={() => handleRemove(task.id)}
                >
                  excluir
                </button>
              </div>
            );
          })}
          {/* </div> */}
          {/* <button className="btn-excluir">excluir</button> */}
          {/* <section className="alltasks-container">
            {allTasks.map((task) => {
              return <p>{task.name_task}</p>;
            })}
           
          </section> */}
        </section>
      </section>
      <section>{error && <p className="erroDeDados">{error}</p>}</section>
    </form>
  );
}
