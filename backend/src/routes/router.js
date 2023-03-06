const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middlewares/validateToken");

const {
  validateDadosUser,
  validateUserLogin,
  validateTaskForUser,
} = require("../middlewares/validateUser");

const { validateNameTask } = require("../middlewares/validateTask");

const {
  getAllUsers,
  getUserById,
  loginUser,
  // loginUserRefreshToken,
  createUser,
  assignmentTask,
} = require("../controllers/controllerUser");

router.get("/users", getAllUsers);
router.get("/users/:user_id", getUserById);
router.post("/login", validateUserLogin, loginUser);
// router.post("/refresh", verifyRefreshToken, loginUserRefreshToken);
router.post("/register", validateDadosUser, createUser);
router.post("/users-tasks", validateTaskForUser, assignmentTask);

const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/controller");

router.get("/tasks", getAllTasks);
router.get("/tasks/:id", getTaskById);
router.post("/tasks", validateNameTask, createTask);
router.put("/tasks/:id", validateNameTask, updateTask);
router.delete("/tasks/:id", deleteTask);

module.exports = router;

// joao@joao.com - joãosilva

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiam9hb0Bqb2FvLmNvbSJ9LCJpYXQiOjE2NzA3MTQ4MjEsImV4cCI6MTY3NTg5ODgyMX0.gi8JBu0oDi6WMocwtIb3ED8LdX7YLFakkCvTvaWnPUU
