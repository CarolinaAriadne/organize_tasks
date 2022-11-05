const userModel = require("../models/modelUser");
const generateJwt = require('../utils/generateJWT');

const erroHandler = (status, message) => ({
  status,
  message,
});

const getAllUsers = async () => {
  const allUsers = await userModel.getAllUsers();
  if (allUsers.length === 0) {
    throw erroHandler(404, "Users not found");
  }

  return allUsers;
};

const getUserById = async (user_id) => {
  const userId = await userModel.getUserById(user_id);
  if (userId.length === 0) {
    throw erroHandler(404, "User not found");
  }
  return userId;
};

const createUser = async (user_id, name_user, password, email) => {
  const nameUser = await userModel.getUserName(name_user);

  if (nameUser.length > 0) {
    throw erroHandler(409, "User already exists");
  }
  const getIdUser = await userModel.createUser(dados);
  const userCreated =  { user_id: getIdUser, };
  
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
};
