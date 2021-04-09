const jwt = require("jsonwebtoken");
const apiResponse = require("../helpers/apiResponse");

module.exports = function(req, res, next) {

    // take token from header
    const token = req.header('auth-token');

    if (!token) return apiResponse.unauthorizedResponse(res, "Access Denied!");

    try {
        // check if token is valid, throws error for invalid token
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        // verified is of the form {_id: ..., iat: ...}

        // store the user id in the request object
        req.user_id = verified._id;

        // move to next
        next();
    } catch (err) {
        apiResponse.unauthorizedResponse(res, "Access Denied!");
    }
}