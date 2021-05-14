import React, { useContext, useEffect } from "react";
import TitleInput from "./TitleInput";
import ArticleButtons from "./ArticleButtons";
import Editor from "./Editor";
import { ArticleContext } from "../contexts/ArticleContext";
import Tags from "./Tags";
import { UserContext } from "../contexts/UserContext";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { useParams } from "react-router";
import api from "../helpers/api";
import ArticleHeaderImage from "./ArticleHeaderImage";

function ArticleEdit() {
  const { id } = useParams();

  const [article, setArticle] = useContext(ArticleContext);

  const [user, ] = useContext(UserContext);

  const history = useHistory();

  if (!user.isUserLoggedIn) {
    toast.warning("Please login to write a article.");
    history.push("/login");
  }

  useEffect(() => {
      getArticle();
  }, []);

  const getArticle = async () => {
      await api.get(`/article/${id}`)
      .then((res) => {
          const articleFromResponse = res.data.data;
          if (articleFromResponse) {
              setArticle({
                  title: articleFromResponse.title,
                  text: articleFromResponse.text,
                  tags: articleFromResponse.tags,
                  headerImage: articleFromResponse.headerImage
              });
          }
      })
  };

  return (
      <div id="editor">
        <Tags />
        <ArticleButtons edit={true} id={id}/>
        <ArticleHeaderImage />
        <TitleInput />
        <Editor data={article.text} />
      </div>
  );
}

export default ArticleEdit;
