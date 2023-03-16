const express = require('express');
const router = express.Router();

const { verifyToken } = require('../middlewares/validateToken');

const {
  validateDadosUser,
  validateUserLogin,
  validateTaskForUser,
} = require('../middlewares/validateUser');

const { validateNameTask } = require('../middlewares/validateTask');

const {
  getAllUsers,
  getUserById,
  loginUser,
  createUser,
  assignmentTask,
} = require('../controllers/controllerUser');

router.get('/users', getAllUsers);
router.get('/users/:user_id', getUserById);
router.post('/login', validateUserLogin, loginUser);
router.post('/register', validateDadosUser, createUser);
router.post('/users-tasks', validateTaskForUser, assignmentTask);

const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/controller');

router.get('/tasks', getAllTasks);
router.get('/tasks/:id', getTaskById);
router.post('/tasks', verifyToken, validateNameTask, createTask);
router.put('/tasks/:id', verifyToken, validateNameTask, updateTask);
router.delete('/tasks/:id', verifyToken, deleteTask);

module.exports = router;
