const jwt = require("jsonwebtoken");
const apiResponse = require("../helpers/apiResponse");
const { adminLoginValidation } = require("../helpers/validation");
const Article = require("../models/Article.js");

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

const dashboard = async (req, res) => {
    try {
        const totalPublished = await Article.find({status: "published"}).countDocuments();
        const toBeVerified = await Article.find({status: "unpublished"}).countDocuments();

        const response = {
            totalPublished: totalPublished,
            toBeVerified: toBeVerified
        }

        apiResponse.successResponseWithData(res, "Success", response);
    } catch (err){
        console.log(err);
        apiResponse.errorResponse(res, err);
    }
}

const publishedArticles = async (req, res) => {
    try {
        const published_articles = await Article.find({status: "published"});

        apiResponse.successResponseWithData(res, "Success", published_articles);
    } catch (err){
        console.log(err);
        apiResponse.errorResponse(res, err);
    }

}

module.exports.login = login;
module.exports.dashboard = dashboard;
module.exports.publishedArticles = publishedArticles;