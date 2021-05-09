import React, { useContext, useEffect, useState } from "react"
import { UserContext } from "../contexts/UserContext";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../helpers/api";
import ArticleList from "./ArticleList";

const SavedArticles = () => {

    const [ user, ] = useContext(UserContext);

    const [bookmarkedArticles, setBookmarkedArticles] = useState();
  
    const history = useHistory();
  
    if (!user.isUserLoggedIn) {
      toast.warning("Please login to see your saved articles.");
      history.push("/login");
    }

    useEffect(() => {
        getArticles();
    }, []);

    const getArticles = async () => {
        const res = await api.get(`/article/bookmarked`, { headers: { "auth-token": user.user_token }});
        if (res.data.status === 1 && res.data.data)
            setBookmarkedArticles(res.data.data.articles);
    };

    const deleteArticleFromArray = (articleId) => {
        const articles = bookmarkedArticles.filter((article) => {
            return article._id !== articleId
        });
        setBookmarkedArticles(articles)
    }

    return (
        <div>
        {
            bookmarkedArticles ? 
            <div>
                <h2>Your Bookmarked Articles</h2>
                <ArticleList articles={bookmarkedArticles} deleteArticleFromArray={deleteArticleFromArray} />
            </div>
            : 
            <h2>You do not have any bookmarked articles</h2>
        }
        </div>
    )
}

export default SavedArticles
