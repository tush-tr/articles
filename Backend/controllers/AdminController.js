const jwt = require("jsonwebtoken");
const apiResponse = require("../helpers/apiResponse");
const { adminLoginValidation } = require("../helpers/validation");

const login = (req, res) => {

    // Validate data
    const validationError = adminLoginValidation(req.body);

    if (validationError) {
        return apiResponse.validationErrorWithData(res, "Validation error!", validationError);
    }

    const { username, password } = req.body;

    if (username !== process.env.ADMIN_USERNAME || password !== process.env.ADMIN_PASSWORD) {
        return apiResponse.validationErrorWithData(res, "Validation error!", "Username or password is wrong!");
    }

    // create token
    const token = jwt.sign({_id: 'admin'}, process.env.TOKEN_SECRET);
    res.header("auth-token", token)

    apiResponse.successResponseWithData(res, "You are now logged in.", {token: token});
}

module.exports.login = login;