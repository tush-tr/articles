const jwt = require("jsonwebtoken");
const apiResponse = require("../helpers/apiResponse");

// Restrics Unauthorized access
// saves user id in the request object if token is valid else respond with 'Access Denied'
module.exports = function(req, res, next) {

    // take token from header
    const token = req.header('auth-token');

    if (!token) return apiResponse.unauthorizedResponse(res, "Access Denied!");

    try {
        // check if token is valid, throws error for invalid token
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        // verified is of the form {_id: ..., iat: ...}

        // store the user id in the request object
        req.userId = verified._id;

        next();
    } catch (err) {
        apiResponse.unauthorizedResponse(res, "Access Denied!");
    }
}