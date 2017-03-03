import React from 'react';
import { connect } from 'react-redux';

import EditDoc_details from './editDoc_details.jsx';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import { CompositeDecorator, ContentBlock, ContentState, EditorState, Entity, convertFromHTML, convertToRaw } from 'draft-js';
import { browserHistory } from 'react-router';

// Store properties
import * as doc from '../../actions/docActions.jsx';

export class EditDoc extends React.Component {
  constructor(props) {
    super(props);
    this.editingDoc = this.editingDoc.bind(this);
    this.createHTML = this.createHTML.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(doc.loadOriginalContent());
  }

  createHTML(contents) {
    const html = draftToHtml(contents);
    this.props.dispatch(doc.createHTML(html));
  }

  editingDoc(editorState) {
    this.props.dispatch(doc.editingDoc(editorState));
  }


  redirectToDoc() {
    browserHistory.push('/doc');
  }

  render() {
    return (
      <div className="doc-editor">
        <h2 className="list-title text-center mt20 mb20" onClick={this.redirectToDoc}>{this.props.doc.docName}</h2>
        <Editor editorState={this.props.doc.editsObject} onEditorStateChange={this.editingDoc} onContentStateChange={this.createHTML} />
        <EditDoc_details />
      </div>
    )
  }
}

export default connect(state => state)(EditDoc);