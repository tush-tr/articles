import React from "react"
import ArticleListItem from "./ArticleListItem";

const ArticleList = ({articles}) => {

    return (
        <div className='article-list'>
            {
                articles && articles.map((article) => {
                    return <ArticleListItem key={article._id} article={article}/>
                })
            }
        </div>
    )
}

export default ArticleList
