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
      .json({
        message: "Some required fields are missing or fields must be string",
      });
  }

  next();
};

const dadosUser = joi.object({
  name_user: joi.string().required(),
  password: joi.string().required(),
  email: joi.string().required(),
});

const validateDadosUser = (req, res, next) => {
  const { name_user, password, email } = req.body;
  const { error } = dadosUser.validate({ name_user, password, email });

  if (error) {
    return res
      .status(400)
      .json({
        message: "Some required fields are missing or fields must be string",
      });
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
      .json({
        message: "Some required fields are missing or fields must be string",
      });
  }

  next();
};

module.exports = {
  validateUserLogin,
  validateDadosUser,
  validateTaskForUser,
};
