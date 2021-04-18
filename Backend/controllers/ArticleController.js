const User = require("../models/User");
const Article = require("../models/Article");
const readingTime = require("reading-time");
const apiResponse = require("../helpers/apiResponse");
// const { articleValidation } = require("../helpers/validation");
const articleValidation = require("../helpers/validation");

const saveArticle = async (req, res) => {

    // Validate article
    const validationError = articleValidation.articleValidation(req.body.article);

    if (validationError) {
        return apiResponse.validationErrorWithData(res, "Validation error!", validationError);
    }

    // calculate reading time
    // res.body.text is the editorJs data object, so we have to convert it to string
    // for calculating reading time and storing it in MongoDB.
    const readTimeText = readingTime(JSON.stringify(req.body.article.text)).text;

    const article = new Article({
        title: req.body.article.title,
        text: req.body.article.text,
        readTime: readTimeText,
        tags: req.body.article.tags
    });

    if (req.body.action == "save") {
        // save article
        article.status = "draft"

        try {
            const savedArticle = await article.save();
            apiResponse.successResponseWithData(res, "Article saved.", { article_id: savedArticle._id });
        } catch (err) {
            apiResponse.errorResponse(res, err);
        }

    } else {
        // submit article for verification
        try {
            const savedArticle = await article.save();
            apiResponse.successResponseWithData(res, "Article submitted for verification.", { article_id: savedArticle._id });
        } catch (err) {
            apiResponse.errorResponse(res, err);
        }
    }
}

const like = async (req, res) => {

    // Validate data
    const validationError = articleValidation.validateLikeData(req.body);

    if (validationError) {
        apiResponse.validationErrorWithData(res, "Validation error!", validationError);
    }

    // incomming datas
    var articleId = req.body._id;
    var userid = req.body.userid;

    // fetching particular article by id
    Article.findOne({ '_id': articleId }, function (errors, result) {
        // checking if there is error in fetching data to database
        if (errors) {
            apiResponse.errorResponse(res, "Error in fetching data to the database!");
        }
        // if everything ok
        if (result == null) {
            apiResponse.errorResponse(res, "Data not found with this article id to the database!");
        }

        // here inserting like to  the particular article
        result.likes.push({
            'userid': userid,
        });

        result.save().then(function (result) {
            apiResponse.successResponse(res, "Liked successfully.");
        }).catch(function (error) {
            apiResponse.errorResponse(res, "error occured while storing data to database!");
        });
    });

}

const getArticle = async (req, res) => {

    const articleId = req.params.id;

    try {
        const article = await Article.find({_id: articleId});
        if (article.length == 0) {
            apiResponse.successResponse(res, "Article not found");
        } else {
            apiResponse.successResponseWithData(res, "Article found", {article});
        }
    } catch (err) {
        apiResponse.errorResponse(res, err);
        console.log(err);
    }

}

const comment = async (req, res) => {

    // Validate data
    const validationError = articleValidation.validateCommentData(req.body);

    if (validationError) {
        apiResponse.validationErrorWithData(res, "Validation error!", validationError);
    }

    // incomming datas
    var articleId = req.body._id;
    var userid = req.body.userid;
    var commentData = req.body.comment;

    // fetching particular article by id
    Article.findOne({ '_id': articleId }, function (errors, result) {
        // checking if there is error in fetching data to database
        if (errors) {
            apiResponse.errorResponse(res, "Error in fetching data to the database!");
        }
        // if everything ok
        if (result == null) {
            apiResponse.errorResponse(res, "Data not found with this article id to the database!");
        }

        // here inserting comment to  the particular article
        result.comments.push({
            'userid': userid,
            'comment': commentData,
        });

        result.save().then(function (result) {
            apiResponse.successResponse(res, "Commented successfully.");
        }).catch(function (error) {
            apiResponse.errorResponse(res, "error occured while storing data to database!");
        });
    });

}
module.exports.saveArticle = saveArticle;
module.exports.like = like;
module.exports.comment = comment;
module.exports.getArticle = getArticle;

