import React from 'react';
import { connect } from 'react-redux';

// WYSIWYG components and dependancies
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import { CompositeDecorator, ContentBlock, ContentState, EditorState, Entity, convertFromHTML, convertToRaw } from 'draft-js';

// Store properties
import * as doc from '../../actions/docActions.jsx';
import * as merge from '../../actions/mergeActions.jsx';
import * as docSummary from './../../actions/docSummaryActions.jsx';

class DocMergeReview extends React.Component {
  constructor(props) {
    super(props);
    this.editingDiff = this.editingDiff.bind(this);
    this.createHTML = this.createHTML.bind(this);
    this.editMode = this.editMode.bind(this);
    this.splitView = this.splitView.bind(this);
  }

  componentWillUnmount() {
    this.props.dispatch(docSummary.turnOffEdits());
    // this.props.dispatch(merge.editMergeDiff());
  }

  createHTML(contents) {
    const html = draftToHtml(contents);
    this.props.dispatch(doc.createHTML(html));
  }

  editingDiff(editorState) {
    this.props.dispatch(merge.editingDiff(editorState));
  }

  splitView() {
    if (this.props.docSummary.mergeSplitView === 'unified') {
      return (
        <div>
          <div className="row">
            <div className="col-sm-12 col-md-10 col-lg-8 col-centered">
              <div className="unified-container">
                <div className="unified-title mb10">{this.props.merge.mergeDetails.username}’s proposed edits</div>
                {this.editMode()}
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <div className="split-master hidden-xs hidden-sm col-md-6">
            <div className="split-title mb10">Master document</div>
            <div className="master-edits" dangerouslySetInnerHTML={{'__html': this.props.doc.masterHtml}}></div>
          </div><div className="split-changes col-md-6">
            <div className="split-title mb10">{this.props.merge.mergeDetails.username}’s proposed edits</div>
            {this.editMode()}
          </div>
        </div>
      )
    }
  }

  editMode() {
    if (this.props.docSummary.editMerge) {
      return (
        <Editor editorState={this.props.merge.diffObject} onEditorStateChange={this.editingDiff} onContentStateChange={this.createHTML} />
      )
    } else {
      return (
        <div className="proposed-edits" dangerouslySetInnerHTML={{'__html': this.props.merge.diffHtml}}></div>
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

