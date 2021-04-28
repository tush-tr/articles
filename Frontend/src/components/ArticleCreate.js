import React, { useContext, useEffect, useReducer } from "react";
import TitleInput from "./TitleInput";
import ArticleButtons from "./ArticleButtons";
import Editor from "./Editor";
import { ArticleContext } from "../contexts/ArticleContext";
import Tags from "./Tags";
import { UserContext } from "../contexts/UserContext";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

function ArticleCreate() {

  const [ , setArticle ] = useContext(ArticleContext);

  const [user, ] = useContext(UserContext);

  const history = useHistory();

  // reinitialize state to clear previous data
  // previous data need to be cleared as edit article is using the same context
  useEffect(() => {
    setArticle({
      title: "",
      text: "",
      tags: []
    });
  }, []);

  if (!user.isUserLoggedIn) {
    toast.warning("Please login to write a article.");
    history.push("/login");
  }

  return (
    <div id="editor">
      <Tags />
      <ArticleButtons edit={false}/>
      <TitleInput />
      <Editor />
    </div>
  );
}

export default ArticleCreate;
