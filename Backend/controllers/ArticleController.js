const User = require("../models/User");
const Article = require("../models/Article");
const readingTime = require("reading-time");
const apiResponse = require("../helpers/apiResponse");
// const { articleValidation } = require("../helpers/validation");
const articleValidation = require("../helpers/validation");

const save = async (req, res) => {

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
        tags: req.body.article.tags,
        author: req.userId
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

const edit = async (req, res) => {

    // Validate article
    const validationError = articleValidation.articleValidation(req.body.article);

    if (validationError) {
        return apiResponse.validationErrorWithData(res, "Validation error!", validationError);
    }

    // calculate reading time
    // res.body.text is the editorJs data object, so we have to convert it to string
    // for calculating reading time and storing it in Database.
    const readTimeText = readingTime(JSON.stringify(req.body.article.text)).text;

    try {

        const article = await Article.findOne({_id: req.body.articleId, author: req.userId});
    
        if (article) {
            article.title = req.body.article.title
            article.text = req.body.article.text,
            article.readTime = readTimeText,
            article.tags = req.body.article.tags

            if (req.body.action == "save") {
                article.status = "draft";
                await article.save();
                apiResponse.successResponseWithData(res, "Article saved.", { article_id: article._id });
            } else {
                await article.save();
                article.status = "unpublished";
                apiResponse.successResponseWithData(res, "Article submitted for verification.", { article_id: article._id });
            }
        }

    } catch (err) {
        console.log(err);
        apiResponse.errorResponse(res, err);
    }
}

const likeUnlike = async (req, res) => {

    // Validate data
    const validationError = articleValidation.validateLikeData(req.body);

    if (validationError) {
        apiResponse.validationErrorWithData(res, "Validation error!", validationError);
    }

    var articleId = req.body.articleId;
    var userId = req.userId;

    try {
        var article = await Article.findOne({'_id': articleId});
        // check if the user has already liked the article, unlike it
        if (article.likes.includes(userId)) {
            // remove the userId from like array
            article.likes = article.likes.filter(item => item != userId);
        } else {
            article.likes.push(userId);
        }

        const {likes} = await article.save();

        apiResponse.successResponseWithData(res, "Article Liked", { likes:likes} );

    } catch(err) {
        apiResponse.errorResponse(res, err);
        console.log(err);
    }
    


}

const getOne = async (req, res) => {

    const articleId = req.params.id;

    try {
        const article = await Article.find({_id: articleId}).populate('author', '_id name pic').populate('comments.postedBy', '_id name pic');
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
    var articleId = req.body.articleId;
    var userId = req.userId;
    var comment = req.body.comment;

    try {
        var article = await Article.findOne({_id: articleId});
        
        article.comments.push({
           comment:  comment,
           postedBy: userId
        });
        const {comments} = await article.save();

        apiResponse.successResponseWithData(res, "Comment successful", { lastComment: comments[comments.length - 1]} );
    } catch(err) {
        apiResponse.errorResponse(res, err);
        console.log(err);
    }

}

const report = async (req, res) => {

    // Validate data
    const validationError = articleValidation.validateReportData(req.body);

    if (validationError) {
        apiResponse.validationErrorWithData(res, "Validation error!", validationError);
    }

    // incomming datas
    var articleId = req.body._id;
    var userid = req.body.userid;
    var problem = req.body.problem;

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
        result.report.push({
            'userid': userid,
            'problem': problem,
        });

        result.save().then(function (result) {
            apiResponse.successResponse(res, "Reported successfully.");
        }).catch(function (error) {
            apiResponse.errorResponse(res, "error occured while storing data to database!");
        });
    });

}

const getRecent = async (req, res) => {

    try {
        const articles = await Article.find()
        .select('_id title text tags readTime likes comments publishDate', )
        .sort({ publishDate: -1 })
        .limit(10)
        .populate('author', '_id name pic')
        .populate('comments.postedBy', '_id name')
        if (articles.length == 0) {
            apiResponse.successResponse(res, "Articles not found");
        } else {
            apiResponse.successResponseWithData(res, "Articles found", {articles});
        }
    } catch (err) {
        apiResponse.errorResponse(res, err);
        console.log(err);
    }

}

const saved = async (req, res) => {

    const userId = req.userId;

    try {
        const articles = await Article.find({author: userId, status: "draft"}).populate('author', '_id name pic');
        if (articles.length == 0) {
            apiResponse.successResponse(res, "Articles not found");
        } else {
            apiResponse.successResponseWithData(res, "Articles found", {articles});
        }
    } catch (err) {
        apiResponse.errorResponse(res, err);
        console.log(err);
    }

}

module.exports.save = save;
module.exports.likeUnlike = likeUnlike;
module.exports.comment = comment;
module.exports.report = report;
module.exports.getOne = getOne;
module.exports.getRecent = getRecent;
module.exports.saved = saved;
module.exports.edit = edit;

