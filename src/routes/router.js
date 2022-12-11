const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middlewares/validateToken");

const {
  getAllUsers,
  getUserById,
  loginUser,
  createUser,
  assignmentTask 
} = require("../controllers/controllerUser");

router.get("/users", verifyToken, getAllUsers);
router.get("/users/:user_id", getUserById);
router.post("/login", loginUser);
router.post("/users", createUser);
router.post("/users-tasks", assignmentTask )

const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/controller");

router.get("/tasks", getAllTasks);
router.get("/tasks/:id", getTaskById);
router.post("/tasks", createTask);
router.put("/tasks/:id", updateTask);
router.delete("/tasks/:id", deleteTask);

module.exports = router;

// joao@joao.com - joãosilva

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiam9hb0Bqb2FvLmNvbSJ9LCJpYXQiOjE2NzA3MTQ4MjEsImV4cCI6MTY3NTg5ODgyMX0.gi8JBu0oDi6WMocwtIb3ED8LdX7YLFakkCvTvaWnPUU