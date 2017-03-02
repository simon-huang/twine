import React from 'react';
import { connect } from 'react-redux';

// WYSIWYG components and dependancies
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import { CompositeDecorator, ContentBlock, ContentState, EditorState, Entity, convertFromHTML, convertToRaw } from 'draft-js';

// Store properties
import * as doc from '../../actions/docActions.jsx';

class Doc_merge_unified extends React.Component {
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


  render() {
    return (
      <div>
        <div className="row">
          <div className="col-sm-12 col-md-10 col-md-offset-1 col-lg-8 col-lg-offset-2">
            <div className="unified-container">
              <div className="unified-title mb10">Master document</div>
              <Editor editorState={this.props.doc.editsObject} onEditorStateChange={this.editingDoc} onContentStateChange={this.createHTML} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(state => state)(Doc_merge_unified);