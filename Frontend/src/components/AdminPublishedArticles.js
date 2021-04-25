import React, { useEffect, useContext, useState } from "react";
import api from "../helpers/api";
import { UserContext } from "../contexts/UserContext";
import { useHistory } from "react-router";
import Moment from "react-moment";

const AdminPublishedArticles = () => {
    
  const [user, setUser] = useContext(UserContext);

  const [ publishedArticles, setPublishedArticles ] = useState([]);

  useEffect(() => {
    getPublishedArticles();
  }, []);

  const history = useHistory();

  const getPublishedArticles = async () => {
    const res = await api.get(`/admin/published-articles`, {
      headers: { "auth-token": user.admin_token },
    });
    if (res.data.status === 1) {
        setPublishedArticles(res.data.data);
    }
  };

  const openArticle = (artilcleId) => {
      history.push(`/article/${artilcleId}`);
  }
  return (
    <div id="content-wrapper" class="d-flex flex-column">
      <div class="content">
        <div class="container-fluid">
          <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Published Articles</h1>
          </div>
          <table class="table">
            <thead class="thead-dark">
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Title</th>
                <th scope="col">Date Published</th>
              </tr>
            </thead>
            <tbody>
                {
                    publishedArticles && publishedArticles.map((article) => {
                        return (
                            <tr key={article._id} onClick={() => openArticle(article._id)}>
                              <th scope="row">{article._id}</th>
                              <td>{article.title}</td>
                              <td><Moment format="MMM DD, YYYY h:m a">{article.publishDate}</Moment></td>
                            </tr>
                        );
                    })
                }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPublishedArticles;
