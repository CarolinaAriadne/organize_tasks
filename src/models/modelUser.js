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

const createUser = async (dados) => {
  const query =
    "INSERT INTO OrganizeTasks.users (user_id, name_user, password, email) VALUES (?,?,?,?);";
  const [response] = await connection.execute(query, [
    dados.user_id,
    dados.name_user,
    dados.password,
    dados.email,
  ]);
  return response;
};

module.exports = {
  getAllUsers,
  getUserById,
  getUserName,
  createUser,
};
