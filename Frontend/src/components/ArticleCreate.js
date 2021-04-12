import React from "react";
import EditorJs from "react-editor-js";
import Paragraph from "@editorjs/paragraph"
import Image from "@editorjs/image";
import Header from "@editorjs/header"
import TitleInput from "./TitleInput"
import ArticleButtons from "./ArticleButtons";

// currently we are using Paragraph, Image and Header tools
// we can add more later
const EDITOR_JS_TOOLS = {
    paragraph: {
      class: Paragraph,
      inlineToolbar: true
    },
    image: {
      class: Image,
      inlineToolbar: true,
      config: {
        endpoints: {
          byFile: 'http://localhost:5000/api/image-upload', // backend file uploader endpoint
        }
      }
    },
    header: {
      class: Header,
      config: {
        placeholder: 'Heading',
        levels: [2, 3, 4, 5],
        defaultLevel: 3,
      }
    },
    // embed: Embed,
    // table: Table,
    // list: List,
    // warning: Warning,
    // code: Code,
    // linkTool: LinkTool,
    // raw: Raw,
    // header: Header,
    // quote: Quote,
    // marker: Marker,
    // checklist: CheckList,
    // delimiter: Delimiter,
    // inlineCode: InlineCode,
    // simpleImage: SimpleImage
}

// component for creating new article
function ArticleCreate() {
    return (
        <div id="editor">
          <ArticleButtons />
          <TitleInput />
          <EditorJs placeholder="Tell your story..." tools={ EDITOR_JS_TOOLS } />
        </div>
    );
}

export default ArticleCreate;