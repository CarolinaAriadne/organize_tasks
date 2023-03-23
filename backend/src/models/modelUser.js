const connection = require('./connection');

const getAllUsers = async () => {
  const query = 'SELECT * FROM OrganizeTasks.users';
  console.log(query);
  const [response] = await connection.execute(query);
  console.log(response, 'aqui');
  return response;
};

const getUserById = async user_id => {
  const query = 'SELECT * FROM OrganizeTasks.users WHERE user_id = ?;';
  const [response] = await connection.execute(query, [user_id]);
  return response;
};

const getUserName = async name_user => {
  const query = 'SELECT * FROM OrganizeTasks.users WHERE name_user = ?;';
  const [response] = await connection.execute(query, [name_user]);
  return response;
};

const userLogin = async (email, password) => {
  const query =
    'SELECT * FROM OrganizeTasks.users WHERE (email, password) = (?,?);';

  const [response] = await connection.execute(query, [email, password]);
  console.log(response, 'AQUI 2');
  return response;
};

const createUser = async (name_user, password, email) => {
  const query =
    'INSERT INTO OrganizeTasks.users (name_user, password, email) VALUES (?,?,?);';
  const [response] = await connection.execute(query, [
    name_user,
    password,
    email,
  ]);
  const { insertId: user_id } = response;
  const newUser = { user_id, name_user, password, email };
  return newUser;
};

const assignmentTask = async (user_id, task_id) => {
  const query = `
  SELECT users.user_id, tasks_users.task_id
  FROM OrganizeTasks.users AS users
  INNER JOIN OrganizeTasks.tasks_users AS tasks_users
  ON users.user_id = ? AND tasks_users.user_id = ?;`;
  const [response] = await connection.execute(query, [user_id, task_id]);
  return response;
};

const assignmentTaskUser = async (user_id, task_id) => {
  const query =
    'INSERT INTO OrganizeTasks.tasks_users (user_id, task_id) VALUES (?,?);';
  const [response] = await connection.execute(query, [user_id, task_id]);
  return response;
};

module.exports = {
  getAllUsers,
  getUserById,
  getUserName,
  userLogin,
  createUser,
  assignmentTask,
  assignmentTaskUser,
};

// teste