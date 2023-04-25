const userModel = require('../models/modelUser');
const generateJwt = require('../utils/generateJWT');

const erroHandler = (status, message) => ({
  status,
  message,
});

const getAllUsers = async () => {
  const allUsers = await userModel.getAllUsers();
  if (allUsers.length === 0) {
    throw erroHandler(404, 'Users not found');
  }

  return allUsers;
};

const getUserById = async user_id => {
  const userId = await userModel.getUserById(user_id);
  if (userId.length === 0) {
    throw erroHandler(404, 'User not found');
  }
  return userId;
};

const userLogin = async (email, password) => {
  const user = await userModel.userLogin(email, password);

  if (user.length === 0) {
    throw erroHandler(404, 'Users not found');
  }

  const returnToken = generateJwt.generateJwt(email);
  return returnToken;
};

const createUser = async (name_user, password, email) => {
  const nameUser = await userModel.getUserName(name_user);

  if (nameUser.length > 0) {
    throw erroHandler(409, 'User already exists');
  }
  await userModel.createUser(name_user, password, email);

  const returnToken = generateJwt.generateJwt(email);
  return returnToken;
};

const assignmentTask = async (user_id, task_id) => {
  const verifyTaskUser = await userModel.assignmentTask(user_id, task_id);

  if (verifyTaskUser.length) {
    throw erroHandler(409, 'Task already assigned to user');
  }

  const createUserTask = await userModel.assignmentTaskUser(user_id, task_id);

  return createUserTask;
};

module.exports = {
  getAllUsers,
  getUserById,
  userLogin,
  createUser,
  assignmentTask,
};

// "test": "nyc --all --include models --include services --include controllers mocha tests/**/*.js --exit",
