const joi = require('joi');


const userValidate = joi.object({
    email: joi.string().required(),
    password: joi.string().required(),
});

const validateUserLogin = (req, res, next) => {
    const {email, password} = req.body;
    const { error } = userValidate.validate({email, password});

    if(error) {
        return res.status(400).json({message: 'Some required fields are missing'});
    }

    next();

};

module.exports = {
    validateUserLogin,
  };
  