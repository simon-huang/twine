import React from 'react';
import { connect } from 'react-redux';

// Store properties
import * as doc from '../../actions/docActions.jsx';

export class HistoryEntry extends React.Component {
  constructor(props) {
    super(props);
    this.revertDoc = this.revertDoc.bind(this);
    this.selectTimeStamp = this.selectTimeStamp.bind(this);
  }

  revertDoc(commitID) {
    if (this.props.doc.editMode) {
      if (confirm('You have unsaved changes. Are you sure you want to continue?')) {
        this.props.dispatch(doc.revertDoc(commitID));
        this.props.dispatch(doc.toggleEditMode());
      }
    } else {
      this.props.dispatch(doc.revertDoc(commitID));
    }
  }

  selectTimeStamp() {
    if (this.props.commit.commitID === this.props.doc.currentCommit) {
      return(
        <div key={this.props.key} onClick={ ()=> this.revertDoc(this.props.commit.commitID) }><strong>{this.props.commit.commitMessage}</strong></div>
      );
    } else {
      return (
        <div key={this.props.key} onClick={ ()=> this.revertDoc(this.props.commit.commitID) }>{this.props.commit.commitMessage}</div>
      );
    }
  }

  render() {
    return (
      <li>
        {this.selectTimeStamp()}
      </li>
    );
  }
}

export default connect(state => state)(HistoryEntry);

