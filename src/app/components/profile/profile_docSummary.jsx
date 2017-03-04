import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

export class ProfileDocSummary extends React.Component {
  constructor(props) {
    super(props);
    this.openDoc = this.openDoc.bind(this);
  }

  openDoc(e) {
    // this.props.dispatch(allDoc.openDoc(docRequest));
    e.preventDefault();
    browserHistory.push(`/profile/${this.props.docData.docOwner}/${this.props.docData.docID}`);
  }

  render() {
    return (
      <div>
        <h4 className="doc-list-title bold" onClick={this.openDoc}>{this.props.docData.docName}</h4>
        <br/>
        <div>{this.props.docData.docDescription}</div>
        <hr/>
      </div>
    );
  }
};

export default connect(state => state)(ProfileDocSummary);