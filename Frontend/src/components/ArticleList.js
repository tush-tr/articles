import React, { useState, useEffect } from "react"
import api from "../helpers/api";
import ArticleListItem from "./ArticleListItem";

const ArticleList = () => {

    const [articles, setArticles] = useState();

    useEffect(() => {
        getArticles();
    }, []);

    const getArticles = async () => {
        const res = await api.get(`/article/recent`);
        if (res.data.status === 1)
            setArticles(res.data.data.articles)
    };

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
