const taskModel = require('../models/model');

const erroHandler = (status, message) => ({
  status,
  message,
});

const getAllTasks = async () => {
  const allTasks = await taskModel.getAllTasks();
  if (allTasks.length === 0) {
    throw erroHandler(404, 'Tasks not found');
  }

  const orderTasks = allTasks.sort(task => task);
  return orderTasks;
};

const getTaskById = async task_id => {
  const taskId = await taskModel.getTaskById(task_id);
  if (taskId.length === 0) {
    throw erroHandler(404, 'Task not found');
  }
  return taskId;
};

const createTask = async name_task => {
  const nameTask = await taskModel.getTaskName(name_task);

  if (nameTask.length > 0) {
    throw erroHandler(409, 'Task already exists');
  }
  const getIdTask = await taskModel.createTask(name_task);
  const taskCreated = { id: getIdTask, name_task };
  return taskCreated;
};

const updateTask = async (task_id, name_task) => {
  const taskId = await taskModel.getTaskById(task_id);

  if (taskId.length === 0) {
    throw erroHandler(404, 'Task not found');
  }

  const upTaskId = await taskModel.updateTask(task_id, name_task);
  const getTaskUpdate = await taskModel.getTaskIdUp(upTaskId);
  return getTaskUpdate;
};

const deleteTask = async task_id => {
  const task = await taskModel.getTaskById(task_id);
  if (task.length === 0) {
    throw erroHandler(404, 'Task not found');
  }

  await taskModel.deleteTask(task_id);
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
