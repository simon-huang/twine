import React from 'react';
import { connect } from 'react-redux';
import * as doc from '../../actions/docActions.jsx';
import EditDoc_actions from './editDoc_actions.jsx';
import EditDoc_details from './editDoc_details.jsx';

@connect((store) => {
  return {
    docName: store.doc.editDoc.docName,
    docDescription: store.doc.editDoc.docDescription,
    docType: store.doc.editDoc.docType,
    parentID: store.doc.editDoc.parentID,
    filePath: store.doc.editDoc.filePath,
    docContent: store.doc.editDoc.docContent,
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

  render() {
    return (
      <div>
        <h2>Edit your Document</h2>
        <div>{this.props.docName}</div>
        <textarea onChange={this.editDocChange} type="text" value={this.props.docContent} rows="40" cols="90"></textarea>
        <EditDoc_details />
      </div>
    )
  }
}

// <EditDoc_details mergeMenu={this.props.mergeMenu} showMergeMenu={this.showMergeMenu} handleChange={this.handleChange}/>