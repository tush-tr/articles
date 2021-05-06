import React from "react"
import ArticleListItem from "./ArticleListItem";

const ArticleList = ({articles, deleteArticleFromArray}) => {

    return (
        <div className='article-list'>
            {
                articles && articles.map((article) => {
                    return <ArticleListItem key={article._id} article={article} deleteArticleFromArray={deleteArticleFromArray} />
                })
            }
        </div>
    )
}

export default ArticleList
