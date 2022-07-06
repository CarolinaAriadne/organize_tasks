const express = require('express');

const {
  getAllTasks, getTaskById, createTask, updateTask, deleteTask,
} = require('../controllers/controller');

const router = express.Router();

router.get('/tasks', getAllTasks);
router.get('/tasks/:id', getTaskById);
router.post('/tasks', createTask);
router.put('/tasks/:id', updateTask);
router.delete('/tasks/:id', deleteTask);

module.exports = router;
