import React, { useCallback, useEffect, useRef } from 'react';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import '/node_modules/@toast-ui/editor/dist/i18n/zh-cn.js';

import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';

import 'prismjs/themes/prism.css';
import Prism from 'prismjs';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';

type Props = {
  editorRef?: React.MutableRefObject<EditorInstance | undefined>;
};

export default function MarkdownEditor({ editorRef }: Props): JSX.Element {
  const instanceRef = useRef<Editor>(null);

  const getContent = useCallback(() => {
    if (!instanceRef.current) {
      return '';
    }

    const editorInstance = instanceRef.current.getInstance();
    if (!editorInstance) {
      return '';
    }

    return editorInstance.getMarkdown();
  }, []);

  useEffect(() => {
    if (editorRef) {
      editorRef.current = { getContent };
    }
  }, [getContent, editorRef]);

  return (
    <Editor
      ref={instanceRef}
      minHeight="350px"
      height="auto"
      initialEditType="wysiwyg"
      language="zh-CN"
      useCommandShortcut={true}
      plugins={[colorSyntax, [codeSyntaxHighlight, { highlighter: Prism }]]}
    />
  );
}
