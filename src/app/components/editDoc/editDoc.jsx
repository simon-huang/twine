import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import { CompositeDecorator, ContentBlock, ContentState, EditorState, Entity, convertFromHTML, convertToRaw } from 'draft-js';

// Import Components
import EditDoc_details from './editDoc_details.jsx';
import HistoryEntry from './editDoc_historyEntry.jsx';

// Store properties
import * as doc from '../../actions/docActions.jsx';

export class EditDoc extends React.Component {
  constructor(props) {
    super(props);
    this.editingDoc = this.editingDoc.bind(this);
    this.createHTML = this.createHTML.bind(this);
    this.routerWillLeave = this.routerWillLeave.bind(this);
    this.onUnload = this.onUnload.bind(this);
    this.toggleSideBar = this.toggleSideBar.bind(this);
  }

  toggleSideBar() {
    this.props.dispatch(doc.toggleSideBar());
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
        <div className={this.props.doc.docSideBar ? "col-doc-editing-w-sidebar" : "col-doc-editing-full"}>
          <Editor editorState={this.props.doc.editsObject} onEditorStateChange={this.editingDoc} onContentStateChange={this.createHTML} toolbar={simpleToolbar}/>
        </div>
        <div className={this.props.doc.docSideBar ? "col-doc-sidebar-open" : "col-doc-sidebar-closed"}>
          <div className="sidebar-header">
            <span>Document Details</span>
            <span className="sidebar-close" onClick={this.toggleSideBar}><i class="fa fa-times" aria-hidden="true"></i></span>
          </div>
          <div className="sidebar-body">
            <h5 className="mt0 mb0">History</h5>
            <hr className="mt10 mb10" />
            <ul className="history-entry">
              {this.props.doc.docCommits.map((commit, i) => 
                <HistoryEntry key={i} commit={commit}/>
              )}
            </ul>
          </div>
        </div>
        <EditDoc_details />
      </div>
    )
  }
}

export default connect(state => state)(EditDoc);




/*<div className="doc-editor">*/