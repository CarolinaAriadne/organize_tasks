import { useState, useEffect } from 'react';
import api from '../services/api';
import Modal from 'react-modal';

export default function TasksPage() {
  const [error, setError] = useState('');
  const [name_task, setTask] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [oneTask, setOneTask] = useState([{ task_id: 0, name_task: '' }]);
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    loadTasks();
  }); // []

  async function loadTasks() {
    try {
      const { data } = await api.get('/tasks');
      setTasks(data);
    } catch (err) {
      setError('Bad Request');
    }
  }

  const handleRemove = async id => {
    const user = JSON.parse(localStorage.getItem('user'));
    try {
      await api.delete(`/tasks/${id}`, {
        headers: { Authorization: user.token },
      });

      const newArrayWithoutTask = tasks.filter(task => {
        return task.task_id !== id;
      });

      setTasks(newArrayWithoutTask);
      alert('Task deletada com sucesso');
    } catch (err) {
      setError('Bad Request');
    }
  };

  const onSubmit = async event => {
    event.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    try {
      const { data } = await api.post(
        '/tasks',
        { name_task },
        { headers: { Authorization: user.token } },
      );
      if (data) {
        setTasks([...tasks, data]);
        alert('Task criada com sucesso!');
      }
    } catch (err) {
      setError('Dados inválidos ou tarefa já criada');
    }
  };

  const getOneTask = async id => {
    try {
      let response = await api.get(`/tasks/${id}`);
      setOneTask(response.data);
      setTask(response.data[0].name_task);
    } catch (err) {
      setError('Bad Request');
    }
  };

  const updateTask = async oneTask => {
    const user = JSON.parse(localStorage.getItem('user'));
    let id = oneTask[0].task_id;
    try {
      await api.put(
        `/tasks/${id}`,
        { name_task },
        { headers: { Authorization: user.token } },
      );
      alert('Sua mudança foi realizada com sucesso!');
    } catch (err) {
      setError('Bad Request');
    }
  };

  const openModal = id => {
    setIsOpen(true);

    getOneTask(id);
  };

  const closeModal = () => {
    setIsOpen(false);
    setTask('');
  };

  const disableSubmit = () => {
    if (typeof name_task === 'string') {
      console.log(name_task, 'aqui3');
      setDisabled(false);
      setError('');
    } else {
      setDisabled(true);
      setDisabled('Dados inválidos');
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
        <h1 className="h1Task">Jobs</h1>
      </header>
      <section className="container">
        <section className="container-new-task">
          <input
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
          {tasks.map(task => {
            return (
              <div className="tasks-container">
                <p className="p-addtask" key={task.task_id}>
                  {task.name_task}
                </p>
                <button
                  type="button"
                  className="btn-excluir-edit"
                  onClick={() => handleRemove(task.task_id)}
                >
                  excluir
                </button>
                <button
                  type="button"
                  className="btn-excluir-edit"
                  onClick={() => openModal(task.task_id)}
                >
                  editar
                </button>
              </div>
            );
          })}
        </section>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          overlayClassName="modal-overlay"
          className="modal-content"
        >
          <input
            className="inputModal"
            placeholder="name_task"
            name="name_task"
            type="text"
            onChange={({ target }) => setTask(target.value)}
            value={name_task}
            onKeyUp={disableSubmit}
          ></input>
          <button
            className="btnSalvarVoltar"
            type="button"
            onClick={closeModal}
          >
            voltar
          </button>
          <button
            className="btnSalvarVoltar"
            type="submit"
            disabled={disabled}
            onClick={() => updateTask(oneTask)}
          >
            salvar
          </button>
        </Modal>
      </section>
      <section>{error && <p className="erroDeDados2">{error}</p>}</section>{' '}
    </form>
  );
}
