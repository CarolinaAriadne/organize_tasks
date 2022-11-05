const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getUserById,
  loginUser,
  createUser,
} = require("../controllers/controllerUser");

router.get("/users", getAllUsers);
router.get("/users/:user_id", getUserById);
router.post("/login", loginUser);
router.post("/users", createUser);

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