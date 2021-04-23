const jwt = require("jsonwebtoken");
const apiResponse = require("../helpers/apiResponse");

// Restricts Unauthorized access
// checks if token contain role as admin
module.exports = function(req, res, next) {

    // take token from header
    const token = req.header('auth-token');

    if (!token) return apiResponse.unauthorizedResponse(res, "Access Denied!");

    try {
        // check if token is valid, throws error for invalid token
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        // verified is of the form {role: ..., iat: ...}
        
        if (verified.role != 'admin') return apiResponse.unauthorizedResponse(res, "Access Denied!");

        next();
    } catch (err) {
        apiResponse.unauthorizedResponse(res, "Access Denied!");
    }
}