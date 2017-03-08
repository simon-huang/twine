import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import CopiedFrom from '../commonComponents/copiedFrom.jsx'

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
        <div className="row">
          <div className="col-sm-12">
            <span className="doc-list-title bold" onClick={this.openDoc}>{this.props.docData.docName}</span>
            {this.props.docData.docType === 'private' ? <span className="doc-list-privacy-tag ml10">{this.props.docData.docType}</span> : <span></span>}
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <CopiedFrom docData={this.props.docData}/>
          </div>
        </div>
        <div className="row mt5">
          <div className="col-sm-12">
            <p className="doc-list-description">{this.props.docData.docDescription}</p>
          </div>
        </div>
        <hr/>
      </div>
    );
  }
};

export default connect(state => state)(ProfileDocSummary);