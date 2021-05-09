import React, { useContext } from "react";
import { ArticleContext } from "../contexts/ArticleContext";
import { UserContext } from "../contexts/UserContext";
import api from "../helpers/api";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from "react-router-dom";

function ArticleButtons({edit, id}) {

    const [article] = useContext(ArticleContext);

    const [user] = useContext(UserContext);

    const history = useHistory();

    // save article
    const saveArticle = async (action) => {

        var body = {
            article: article,
            action: action
        };
        
        if (article.title === "") {
            toast.warning("Please provide a title.");
            return;
        }

        if (article.text === "") {
            toast.warning("Please write some text");
            return;
        }

        if (edit) {
            body = {
                ...body,
                articleId: id
            }
            await api.put("/article/edit", body, { headers: { "auth-token": user.user_token }})
            .then((res) => {
                const status = res.data.status;
                if (status === 0) {
                    toast(res.data.message);
                    toast(res.data.data);
                } else {
                    console.log(res);
                    toast(res.data.message);
                    history.push("/");
                }
            }).catch((err) => {
                console.log(err);
            });
        } else {
            await api.post("/article", body, { headers: { "auth-token": user.user_token }})
            .then((res) => {
                const status = res.data.status;
                if (status === 0) {
                    toast(res.data.message);
                    toast(res.data.data);
                } else {
                    console.log(res);
                    toast(res.data.message);
                    history.push("/");
                }
            }).catch((err) => {
                console.log(err);
            });
        }
    }

    return (
        <div className="article-buttons-container">
            <button className="btn btn-success" id="submit-button" onClick={() => saveArticle("submit")}> Submit </button>
            <button className="btn btn-primary" id="save-button" onClick={() => saveArticle("save")}> Save </button>
        </div>
    );
}

export default ArticleButtons;