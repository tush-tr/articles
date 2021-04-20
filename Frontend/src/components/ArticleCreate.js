import React, { useContext } from "react";
import TitleInput from "./TitleInput"
import ArticleButtons from "./ArticleButtons";
import Editor from "./Editor";
import { ArticleProvider } from "../contexts/ArticleContext";
import Tags from "./Tags";
import { UserContext } from "../contexts/UserContext";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

// component for creating new article
function ArticleCreate() {

  const [ user, setUser ] = useContext(UserContext);

  const history = useHistory();

  if (!user.isLoggedIn) {
    toast.warning("Please login to write a article.");
    history.push("/login");
  }

  return (
    <ArticleProvider>
      <div id="editor">
        <Tags />
        <ArticleButtons />
        <TitleInput />
        <Editor />
      </div>
    </ArticleProvider>
  );
}

export default ArticleCreate;