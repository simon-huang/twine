import React from 'react';
import { connect } from 'react-redux';
import * as doc from '../../actions/docActions.jsx';
import EditDoc_details from './editDoc_details.jsx';

@connect((store) => {
  return {
    docName: store.doc.docName,
    docDescription: store.doc.docDescription,
    docType: store.doc.docType,
    parentID: store.doc.parentID,
    filePath: store.doc.filePath,
    editContent: store.doc.editContent,
    previewContent: store.doc.previewContent
  }
})

export default class EditDoc extends React.Component {
  constructor(props) {
    super(props);
    this.editDocChange = this.editDocChange.bind(this);
  }

  editDocChange(e) {
    e.preventDefault();
    this.props.dispatch(doc.editDocChange(e.target.value));
  }

  componentWillMount() {
    if(this.props.previewContent) {
      this.props.dispatch(doc.loadPreviewContent());
    } else {
      this.props.dispatch(doc.loadOriginalContent());
    }
  }

  render() {
    return (
      <div className="container">
        <h2>Edit your Document</h2>
        <div>{this.props.docName}</div>
        <textarea onChange={this.editDocChange} type="text" value={this.props.editContent} rows="40" cols="90"></textarea>
        <EditDoc_details />
      </div>
    )
  }
}