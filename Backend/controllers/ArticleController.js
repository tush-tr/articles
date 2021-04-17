const User = require("../models/User");
const Article = require("../models/Article");
const readingTime = require("reading-time");
const apiResponse = require("../helpers/apiResponse");
// const { articleValidation } = require("../helpers/validation");
const articleValidation = require("../helpers/validation");

// only to test if verifyToken middleware is working
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
        text: JSON.stringify(req.body.article.text),
        readTime: readTimeText
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
    // incomming datas
    var articleId = req.query._id;
    var userid = req.query.userid;
    // Validate data
    const validationError = articleValidation.validateLikeData(req.query);

    if (validationError) {
        apiResponse.validationErrorWithData(res, "Validation error!", validationError);
    }

    Article.findOne({ '_id': articleId }, function (errors, result) {

        if (errors) {
            apiResponse.errorResponse(res, "Error in fetching data to the database!");
        }
        // if everything ok
        if (result == null) {
            apiResponse.errorResponse(res, "Data not found with this article id to the database!");
        }
        article.likes.push({
            'userid': userid,
            // 'time': new Date(),
        });

        result.save().then(function (result) {
            apiResponse.successResponse(res, "Liked successfully.");
        });

        apiResponse.errorResponse(res, "Error in storing data to database!");
    });

    // try {
    //     const article = await Article.find({ '_id': articleId });

    //     if (!article) {
    //         return apiResponse.errorResponse(res, "Article not found!");
    //     }

    //     // it will insert the userid into article.likes.userid
    //     article.likes.push({
    //         'userid': userid,
    //         // 'time': new Date(),
    //     });
    //     const result = await article.save();
    //     if (result) {
    //         apiResponse.successResponse(res, "Liked successfully.");
    //     } else {
    //         apiResponse.errorResponse(res, "Error in storing data to database!");
    //     }
    // } catch (err) {
    //     console.log(err);
    // }

}
module.exports.like = like;
module.exports.saveArticle = saveArticle;