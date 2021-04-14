import React, { useContext } from "react";
import { ArticleContext } from "../contexts/ArticleContext";

function ArticleButtons() {

    const [article] = useContext(ArticleContext);

    const submitArticle = () => {
        console.log(article);
    }

    const saveArticle = () => {
        console.log(article);
    }

    return (
        <div id="article-buttons-container">
            <button className="btn btn-success" id="submit-button" onClick={submitArticle}> Submit </button>
            <button className="btn btn-primary" id="save-button" onClick={saveArticle}> Save </button>
        </div>
    );
}

export default ArticleButtons;