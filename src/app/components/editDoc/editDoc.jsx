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
    this.routerWillLeave = this.routerWillLeave.bind(this);
    this.onUnload = this.onUnload.bind(this);
  }

  onUnload(event) {
    if(this.props.doc.editMode) {
      event.returnValue = "You have unsaved changes!"
    }
  }

  componentWillMount() {
    this.props.dispatch(doc.loadOriginalContent());
  }

  componentDidMount() {
    this.props.router.setRouteLeaveHook(this.props.route, this.routerWillLeave)
    window.addEventListener("beforeunload", this.onUnload);
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.onUnload)
  }

  routerWillLeave(nextLocation) {
    if (this.props.doc.editMode) {
      this.props.dispatch(doc.toggleEditMode());
      this.props.dispatch(doc.toggleUnsavedChangesModal(nextLocation.pathname));
      return false;
    }
  }

  createHTML(contents) {
    const html = draftToHtml(contents);
    this.props.dispatch(doc.createHTML(html));
  }

  editingDoc(editorState) {
    this.props.dispatch(doc.editingDoc(editorState));
  }

  render() {
    var simpleToolbar = {
      options: ['inline', 'remove', 'list', 'blockType', 'history'],
      inline: {
        options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace'],
      },
      blockType: {
        options: [ 'Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'],
      },
      list: {
        options: ['unordered', 'ordered']
      }
    }
    return (
      <div>
        <Editor editorState={this.props.doc.editsObject} onEditorStateChange={this.editingDoc} onContentStateChange={this.createHTML} toolbar={simpleToolbar}/>
        <EditDoc_details />
      </div>
    )
  }
}

export default connect(state => state)(EditDoc);




/*<div className="doc-editor">*/