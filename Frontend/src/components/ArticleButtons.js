import React, { useContext } from "react";
import { ArticleContext } from "../contexts/ArticleContext";
import api from "../helpers/api";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from "react-router-dom";

function ArticleButtons() {

    const [article] = useContext(ArticleContext);

    const history = useHistory();

    // submit article for verification
    const submitArticle = async () => {
        const body = {
            article: article,
            action: "submit"
        }
        await api.post("/article", body).then((res) => {
            toast(res.data.message);
            history.push("/");
        }).catch((err) => {
            console.log(err);
        });
    }

    // save article
    const saveArticle = async () => {
        const body = {
            article: article,
            action: "save"
        };
        await api.post("/article", body).then((res) => {
            toast(res.data.message);
            history.push("/");
        }).catch((err) => {
            console.log(err);
        });
    }

    return (
        <div id="article-buttons-container">
            <button className="btn btn-success" id="submit-button" onClick={submitArticle}> Submit </button>
            <button className="btn btn-primary" id="save-button" onClick={saveArticle}> Save </button>
        </div>
    );
}

export default ArticleButtons;