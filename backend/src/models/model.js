const connection = require("./connection");

const getAllTasks = async () => {
  const query = "SELECT * FROM OrganizeTasks.tasks";
  const [response] = await connection.execute(query);
  return response;
};

const getTaskById = async (task_id) => {
  const query = "SELECT * FROM OrganizeTasks.tasks WHERE task_id = ?;";
  const [response] = await connection.execute(query, [task_id]);
  return response; // usada
};

const getTaskName = async (name_task) => {
  const query = "SELECT * FROM OrganizeTasks.tasks WHERE name_task = ?;";
  const [response] = await connection.execute(query, [name_task]);
  return response;
};

const createTask = async (name_task) => {
  const query = "INSERT INTO OrganizeTasks.tasks (name_task) VALUES (?);";
  const [response] = await connection.execute(query, [name_task]);
  return response.insertId;
};

const getTaskIdUp = async (task_id) => {
  const query = "SELECT * FROM OrganizeTasks.tasks WHERE task_id = ?;";
  const [response] = await connection.execute(query, [task_id]);
  return response[0];
};

const updateTask = async (task_id, name_task) => {
  const query = "UPDATE tasks SET name_task=? WHERE task_id = ?;";
  await connection.execute(query, [name_task, task_id]);
  return task_id;
};

const deleteTask = async (task_id) => {
  const query = "DELETE FROM tasks WHERE task_id = ?;";
  await connection.execute(query, [task_id]);
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  getTaskName,
  updateTask,
  getTaskIdUp,
  deleteTask,
};
