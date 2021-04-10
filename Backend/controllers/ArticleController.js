const User = require("../models/User");
const Article = require("../models/Article");
const readingTime = require("reading-time");
const apiResponse = require("../helpers/apiResponse");
const { articleValidation } = require("../helpers/validation");

// only to test if verifyToken middleware is working
const saveArticle = async (req, res) => {
    
    // Validate article
    const validationError = articleValidation(req.body);

    if (validationError) {
        return apiResponse.validationErrorWithData(res, "Validation error!", validationError);
    }

    // calculate reading time
    const readTimeText = readingTime(req.body.text).text;

    const article = new Article({
        title: req.body.title,
        text: req.body.text,
        readTime: readTimeText
    });

    try {
        // save article
        const savedArticle = await article.save();
        apiResponse.successResponseWithData(res, "Article submitted for verifiction.", {article_id: savedArticle._id});
    } catch (err) {
        apiResponse.errorResponse(res, err);
    }
}

module.exports.saveArticle = saveArticle;