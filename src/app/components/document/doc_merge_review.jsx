import React from 'react';
import { connect } from 'react-redux';

// WYSIWYG components and dependancies
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import { CompositeDecorator, ContentBlock, ContentState, EditorState, Entity, convertFromHTML, convertToRaw } from 'draft-js';

// Store properties
import * as doc from '../../actions/docActions.jsx';
import * as docSummary from './../../actions/docSummaryActions.jsx';

class DocMergeReview extends React.Component {
  constructor(props) {
    super(props);
    this.editingDoc = this.editingDoc.bind(this);
    this.createHTML = this.createHTML.bind(this);
    this.editMode = this.editMode.bind(this);
    this.splitView = this.splitView.bind(this);
  }

  componentWillUnmount() {
    this.props.dispatch(docSummary.turnOffEdits());
  }

  createHTML(contents) {
    const html = draftToHtml(contents);
    this.props.dispatch(doc.createHTML(html));
  }

  editingDoc(editorState) {
    this.props.dispatch(doc.editingDoc(editorState));
  }

  splitView() {
    if (this.props.docSummary.mergeSplitView === 'unified') {
      return (
        <div>
          <div className="row">
            <div className="col-sm-12 col-md-10 col-md-offset-1 col-lg-8 col-lg-offset-2">
              <div className="unified-container">
                <div className="unified-title mb10">Master document</div>
                {this.editMode()}
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <div className="split-master">
            <div className="split-title mb10">Master document</div>
            <div className="split-document split-document-L" dangerouslySetInnerHTML={{'__html': this.props.doc.masterHtml}}></div>
          </div><div className="split-changes">
            <div className="split-title mb10">franklinjjeng’s changes</div>
            {this.editMode()}
          </div>
        </div>
      )
    }
  }

  editMode() {
    if (this.props.docSummary.editMerge) {
      return (
        <Editor editorState={this.props.doc.editsObject} onEditorStateChange={this.editingDoc} onContentStateChange={this.createHTML} />
      )
    } else {
      return (
        <div className="split-document" dangerouslySetInnerHTML={{'__html': this.props.doc.masterHtml}}></div>
      )
    }
  }

  render() {
    return (
      <div>
        {this.splitView()}
      </div>
    );
  }
}

export default connect(state => state)(DocMergeReview);

