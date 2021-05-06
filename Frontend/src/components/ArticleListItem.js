import React, { useContext, useReducer } from 'react'
import Moment from "react-moment";
import { useHistory, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { UserContext } from "../contexts/UserContext";
import { toast } from "react-toastify";
import api from "../helpers/api";

const ArticleListItem = ({article, deleteArticleFromArray}) => {

    const history = useHistory();
    const location = useLocation();

    const [ user, ] = useContext(UserContext);

    const [, forceUpdate] = useReducer(x => x + 1, 0);

    const openArticle = () => {
        history.push("/article/" + article._id);
    }

    const deleteArticle = async () => {
        const res = await api.delete(`/article/${article._id}`, { headers: { "auth-token": user.user_token }}, {})
        if (res.data && res.data.status === 1) {
            toast.success(res.data.message);
            deleteArticleFromArray(article._id);
            forceUpdate();
        } else {
            toast.error("Oops, Some error occurred");
        }
    }

    return (
        <div className="article-list-item">
            <div className="card-body">
                <img className="card-img-top" src="https://picsum.photos/200/200" alt="Random pic" onClick={openArticle} />
                {
                    article.status && 
                    <span className="article-status">
                        {
                            article.status === "unpublished" 
                            ? 
                            <span className="color-blue">Submitted</span>
                            :
                            "Published"
                        }
                    </span>
                }
                {
                    location.pathname === "/saved-articles" ? <Link to={`/article-edit/${article._id}`}><i className="edit-btn fa fa-edit"></i></Link> : ''
                }
                {
                    location.pathname === "/saved-articles" || location.pathname === '/user-articles' ? <span onClick={deleteArticle}><i className="delete-btn fa fa-trash"></i></span> : ''
                }
                <div className="card-content">
                    <span className="tags">
                        {
                            article.tags.map((tag) => {
                                return <span key={tag} className="tag">{tag}</span>
                            })
                        }
                    </span>
                    <span className="date"> - <Moment format="MMM DD, YYYY">{ article.publishDate }</Moment> </span>
                    <h5 className="card-title" onClick={openArticle}>{article.title}</h5>
                    <img className="author-pic" src={ article && article.author && article.author.pic } alt="author pic" />
                    <span className="card-text"> By {article && article.author && article.author.name}</span>
                </div>
            </div>
        </div>
    )
}

export default ArticleListItem
