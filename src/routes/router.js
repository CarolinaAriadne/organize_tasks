const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middlewares/validateToken");

const {
  getAllUsers,
  getUserById,
  loginUser,
  createUser,
} = require("../controllers/controllerUser");

router.get("/users", verifyToken, getAllUsers);
router.get("/users/:user_id", verifyToken, getUserById);
router.post("/login", loginUser);
router.post("/users", createUser);

const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/controller");

router.get("/tasks", verifyToken, getAllTasks);
router.get("/tasks/:id", verifyToken, getTaskById);
router.post("/tasks", verifyToken, createTask);
router.put("/tasks/:id", verifyToken, updateTask);
router.delete("/tasks/:id", verifyToken, deleteTask);

module.exports = router;

// joao@joao.com - joãosilva
