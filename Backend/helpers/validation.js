const Joi = require("@hapi/joi");

// Validation for register
const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });

    const { error } = schema.validate(data);

    if (error) {
        return error.details[0].message;
    }
    return;
}

// Validation for login
const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });

    const { error } = schema.validate(data);

    if (error) {
        return error.details[0].message;
    }
    return;
}

// validation for article
const articleValidation = (data) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        text: Joi.string().required()
    });

    const { error } = schema.validate(data);

    if (error) {
        return error.details[0].message;
    }
    return;
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.articleValidation = articleValidation;