import React, { useContext, useEffect, useState } from "react"
import { UserContext } from "../contexts/UserContext";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../helpers/api";
import ArticleList from "./ArticleList";

const SavedArticles = () => {

    const [ user, ] = useContext(UserContext);

    const [ userArticles, setUserArticles ] = useState();
  
    const history = useHistory();
  
    if (!user.isUserLoggedIn) {
      toast.warning("Please login to see your saved articles.");
      history.push("/login");
    }

    useEffect(() => {
        getUserArticles();
    }, []);

    const getUserArticles = async () => {
        const res = await api.get(`/article/of-user`, { headers: { "auth-token": user.user_token }});
        if (res.data.status === 1 && res.data.data)
            setUserArticles(res.data.data.articles);
    };

    const deleteArticleFromArray = (articleId) => {
        const articles = userArticles.filter((article) => {
            return article._id !== articleId
        });
        setUserArticles(articles)
    }

    return (
        <div>
            {
                userArticles ? 
                <div>
                    <h2>Your Articles</h2>
                    <ArticleList articles={userArticles} deleteArticleFromArray={deleteArticleFromArray} /> 
                </div>
                : 
                <h2>You have not submitted any article</h2>
            }
        </div>
    )
}

export default SavedArticles
