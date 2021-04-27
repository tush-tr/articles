import React, { useContext, useRef } from 'react'
import EditorJs from "react-editor-js";
import Paragraph from "@editorjs/paragraph"
import Image from "@editorjs/image";
import Header from "@editorjs/header"
import {ArticleContext} from "../contexts/ArticleContext";

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
        inlineToolbar: true,
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


const Editor = ({data}) => {

    const [article, setArticle] = useContext(ArticleContext);
  
    const editorInstanceRef = useRef(null)
  
    const onChange = async () => {
      try {
        const outputData = await editorInstanceRef.current.save();
        // console.log('Article data: ', outputData);
        setArticle({
            title: article.title,
            text: outputData,
            tags: article.tags
        });
      } catch (e) {
        // console.log('Saving failed: ', e);
      }
    }
    return (
        <div>
            <EditorJs 
            enableReInitialize
            data={data}
            placeholder="Tell your story..." 
            tools={ EDITOR_JS_TOOLS }
            onChange={onChange}
            instanceRef={instance => editorInstanceRef.current = instance}
            />
        </div>
    )
}

export default Editor
