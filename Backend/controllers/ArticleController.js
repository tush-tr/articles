const User = require("../models/User");
const apiResponse = require("../helpers/apiResponse");

// only to test if verifyToken middleware is working
const test = async (req, res) => {

    const user = await User.findOne({_id: req.user_id});

    apiResponse.successResponseWithData(res, "User", user)
}

module.exports.test = test;