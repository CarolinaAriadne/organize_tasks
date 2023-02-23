const serviceTask = require("../services/service");

const getAllTasks = async (_req, res, next) => {
  try {
    const allTasks = await serviceTask.getAllTasks();
    // console.log(allTasks);
    return res.status(200).json(allTasks);
  } catch (error) {
    return next(error);
  }
};

const getTaskById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await serviceTask.getTaskById(id);
    return res.status(200).json(task);
  } catch (error) {
    return next(error);
  }
};

const createTask = async (req, res, next) => {
  try {
    const { name_task } = req.body;
    const createdTask = await serviceTask.createTask(name_task);
    return res.status(200).json(createdTask);
  } catch (error) {
    return next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name_task } = req.body;
    const taskUpdated = await serviceTask.updateTask(id, name_task);
    return res.status(200).json(taskUpdated);
  } catch (error) {
    return next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    await serviceTask.deleteTask(id);
    return res.status(204).end();
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
