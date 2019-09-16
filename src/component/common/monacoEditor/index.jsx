import React from 'react';
import MonacoEditor from 'react-monaco-editor';

import './index.less';

class Editor extends React.Component {
  onChange(newValue, e) {
    console.log('onChange', newValue, e);
  }

  editorDidMount(editor) {
    console.log('editorDidMount', editor);
    // editor.focus();
  }

  render() {
    const code = this.props.content;
    const options = {
      selectOnLineNumbers: true,
      renderSideBySide: false,
      scrollBeyondLastLine: false,
      automaticLayout: true,
      contextmenu: false,
    };
    return (
      <MonacoEditor
        width="620"
        height="300"
        language={this.props.language}
        theme="vs-dark"
        value={code}
        options={options}
        onChange={this.onChange}
        editorDidMount={this.editorDidMount}
      />
    );
  }
}

export default Editor;
