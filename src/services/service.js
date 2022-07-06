/* eslint-disable camelcase */
const tasksModel = require('../models/model');

const erroHandler = (status, message) => ({
  status,
  message,
});

const getAllTasks = async () => {
  const allTasks = await tasksModel.getAllTasksModel();

  if (allTasks.length === 0) {
    throw erroHandler(404, 'Tasks not found');
  }

  const orderTasks = allTasks.sort((task) => task);
  return orderTasks;
};

const getTaskById = async (task_id) => {
  const taskId = await tasksModel.getTaskById(task_id);
  if (taskId.length === 0) {
    throw erroHandler(404, 'Task not found');
  }
  return taskId;
};

const createTask = async (name_task) => {
  const nameTask = await tasksModel.getTaskName(name_task);

  if (nameTask.length > 0) {
    throw erroHandler(409, 'Task already exists');
  }
  const getIdTask = await tasksModel.createTask(name_task);
  const taskCreated = { id: getIdTask, name_task };
  return taskCreated;
};

const updateTask = async (task_id, name_task) => {
  const task = await tasksModel.getTaskById(task_id);

  if (task.length === 0) {
    throw erroHandler(404, 'Task not found');
  }

  const taskId = await tasksModel.updateTask(task_id, name_task);
  const task2 = await tasksModel.getTaskIdUp(taskId);
  return task2;
};

const deleteTask = async (task_id) => {
  const task = await tasksModel.getTaskById(task_id);
  if (task.length === 0) {
    throw erroHandler(404, 'Task not found');
  }

  await tasksModel.deleteTask(task_id);
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
