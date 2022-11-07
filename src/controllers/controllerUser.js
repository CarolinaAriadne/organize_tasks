const serviceUsers = require("../services/serviceUser");

const getAllUsers = async (_req, res, next) => {
  try {
    const allUsers = await serviceUsers.getAllUsers();
    // console.log(allUsers);
    return res.status(200).json(allUsers);
  } catch (error) {
    return next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const user = await serviceUsers.getUserById(user_id);
    return res.status(200).json(user);
  } catch (error) {
    return next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
     const {email, password} = req.body;
     const token = await serviceUsers.userLogin(email, password);
     return res.status(200).json({token}); // testar sem objeto se der erro
  }catch(error){
    return next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const { name_user, password, email } = req.body;
    const createdUser = await serviceUsers.createUser(name_user, password, email);
    return res.status(200).json(createdUser);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  loginUser,
  createUser,
};
