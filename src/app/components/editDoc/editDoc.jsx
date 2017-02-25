import React from 'react';
import { connect } from 'react-redux';

import EditDoc_details from './editDoc_details.jsx';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import { CompositeDecorator, ContentBlock, ContentState, EditorState, Entity, convertFromHTML, convertToRaw } from 'draft-js';

// Store properties
import * as doc from '../../actions/docActions.jsx';

@connect((store) => {
  return {
    docName: store.doc.docName,
    docObject: store.doc.editsObject,
  }
})

export default class EditDoc extends React.Component {
  constructor(props) {
    super(props);
    this.editingDoc = this.editingDoc.bind(this);
    this.createHTML = this.createHTML.bind(this);
  }

  createHTML(contents) {
    const html = draftToHtml(contents);
    this.props.dispatch(doc.createHTML(html));
  }

  editingDoc(editorState) {
    this.props.dispatch(doc.editingDoc(editorState));
  }

  componentWillMount() {
    this.props.dispatch(doc.loadOriginalContent());
  }

  render() {
    return (
      <div className="container">
        <h2>Edit your Document</h2>
        <div>{this.props.docName}</div>
        <Editor editorState={this.props.docObject} onEditorStateChange={this.editingDoc} onContentStateChange={this.createHTML} />
        <EditDoc_details />
      </div>
    )
  }
}












