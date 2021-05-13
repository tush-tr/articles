const User = require("../models/User");
const ContactMessage = require("../models/ContactMessage");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {registerValidation, loginValidation, contactMessageValidation} = require("../helpers/validation");
const apiResponse = require("../helpers/apiResponse");

const register = async (req, res) => {

    // Validate data
    const validationError = registerValidation(req.body);

    if (validationError) {
        return apiResponse.validationErrorWithData(res, "Validation error!", validationError);
    }

    // if user already exists
    const emailExists = await User.findOne({email: req.body.email});

    if (emailExists) {
        return apiResponse.validationErrorWithData(res, "Email Already exists.", {});
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });

    try {
        // save user and return response with user id
        const savedUser = await user.save();
        apiResponse.successResponseWithData(res, "Registration successful.", {user_id: savedUser._id}); 
    } catch (err) {
        apiResponse.errorResponse(res, err);
    }

}

const login = async (req, res) => {

    // Validate data
    const validationError = loginValidation(req.body);

    if (validationError) {
        return apiResponse.validationErrorWithData(res, "Validation error!", validationError);
    }

    // check if user exists
    const user = await User.findOne({email: req.body.email});

    if (!user) {
        return apiResponse.validationErrorWithData(res, "Validation error!", "Email or password is wrong!");
    }

    // check if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);

    if (!validPass) {
        return apiResponse.validationErrorWithData(res, "Validation error!", "Email or password is wrong!");
    }

    // create token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header("auth-token", token)
    
    const userDetails = {
        id: user._id,
        name: user.name,
        email: user.email,
        pic: user.pic
    }

    // remove password from user object before sending response
    user["password"] = null;

    apiResponse.successResponseWithData(res, "Login successful.", {user: userDetails, token: token});
}
//save details of user(Settings)
const savedetails = async (req, res) => {

}

const contactMessage = async (req, res) => {

    // Validate data
    const validationError = contactMessageValidation(req.body);

    if (validationError) {
        return apiResponse.validationErrorWithData(res, "Validation error!", validationError);
    }

    const contactMessage = ContactMessage({
        name: req.body.name,
        email: req.body.email,
        message: req.body.message
    });

    try {
        await contactMessage.save();
        apiResponse.successResponse(res, "Thanks, We will contact you soon.");
    } catch (err) {
        apiResponse.errorResponse(res, err);
    }
}

module.exports.register = register;
module.exports.login = login;
module.exports.savedetails = savedetails;
module.exports.contactMessage = contactMessage;