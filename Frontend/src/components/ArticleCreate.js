import React from "react";
import TitleInput from "./TitleInput"
import ArticleButtons from "./ArticleButtons";
import Editor from "./Editor";
import { ArticleProvider } from "../contexts/ArticleContext";
import Tags from "./Tags";

// component for creating new article
function ArticleCreate() {



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