const connection = require("./connection");

const getAllUsers = async () => {
  const query = "SELECT * FROM OrganizeTasks.users";
  const [response] = await connection.execute(query);
  return response;
};

const getUserById = async (user_id) => {
  const query = "SELECT * FROM OrganizeTasks.users WHERE user_id = ?;";
  const [response] = await connection.execute(query, [user_id]);
  return response;
};

const getUserName = async (name_user) => {
  const query = "SELECT * FROM OrganizeTasks.users WHERE name_user = ?;";
  const [response] = await connection.execute(query, [name_user]);
  return response;
};

const userLogin = async (email, password) => {
  const query = "SELECT * FROM OrganizeTasks.users WHERE (email, password) = (?,?);";
  const [response] = await connection.execute(query, [email,password]);
  return response;
};

const createUser = async (name_user, password, email) => {
  const query =
    "INSERT INTO OrganizeTasks.users (name_user, password, email) VALUES (?,?,?);";
  const [response] = await connection.execute(query, [
    name_user,
    password,
    email,
  ]);
  const { insertId: user_id} = response;
  const newUser = { user_id, name_user, password, email};
  return newUser;
};

module.exports = {
  getAllUsers,
  getUserById,
  getUserName,
  userLogin,
  createUser,
};
