const joi = require("joi");

const nameTask = joi.object({
    name_task: joi.string().required(),
  });
  
  const validateNameTask = (req, res, next) => {
    const { name_task } = req.body;
    const { error } = nameTask.validate({ name_task });
  
    if (error) {
      return res
        .status(400)
        .json({ message: "Some required fields are missing" });
    }
  
    next();
  };

  module.exports = {
      validateNameTask
  }
  