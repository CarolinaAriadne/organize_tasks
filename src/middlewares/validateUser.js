const joi = require("joi");

const userValidate = joi.object({
  email: joi.string().required(),
  password: joi.string().required(),
});

const validateUserLogin = (req, res, next) => {
  const { email, password } = req.body;
  const { error } = userValidate.validate({ email, password });

  if (error) {
    return res
      .status(400)
      .json({ message: "Some required fields are missing" });
  }

  next();
};

const nameUser = joi.object({
  name_task: joi.string().required(),
});

const validateNameUser = (req, res, next) => {
  const { name_task } = req.body;
  const { error } = nameUser.validate({ name_task });

  if (error) {
    return res
      .status(400)
      .json({ message: "Some required fields are missing" });
  }

  next();
};

const taskForUser = joi.object({
  user_id: joi.string().required(),
  task_id: joi.string().required(),
});

const validateTaskForUser = (req, res, next) => {
  const { user_id, task_id } = req.body;
  const { error } = taskForUser.validate({ user_id, task_id });

  if (error) {
    return res
      .status(400)
      .json({ message: "Some required fields are missing" });
  }

  next();
};

module.exports = {
  validateUserLogin,
  validateNameUser,
  validateTaskForUser,
};
