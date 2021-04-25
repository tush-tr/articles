import React, { useState, useEffect } from "react";
import ArticleList from "./ArticleList";
import api from "../helpers/api";

function Home() {

    const [articles, setArticles] = useState();

    useEffect(() => {
        getArticles();
    }, []);

    const getArticles = async () => {
        const res = await api.get(`/article/recent`);
        if (res.data.status === 1 && res.data.data)
            setArticles(res.data.data.articles)
    };

    return (
        <div>
            <h1>Home</h1>
            <h2>Recent Articles</h2>
            <ArticleList articles={articles}/>
        </div>
    );
}

export default Home;