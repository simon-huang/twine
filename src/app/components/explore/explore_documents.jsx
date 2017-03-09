import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import CopiedFrom from '../commonComponents/copiedFrom.jsx'

export class ExploreDocuments extends React.Component {
  constructor(props) {
    super(props);
    this.openDoc = this.openDoc.bind(this);
    this.goToProfile = this.goToProfile.bind(this);
  }

  openDoc(e) {
    e.preventDefault();
    browserHistory.push(`/profile/${this.props.docData.docOwner}/${this.props.docData.docID}`);
  }

  goToProfile(e) {
    e.preventDefault();
    browserHistory.push(`/profile/${this.props.docData.docOwner}`);
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-explore-avatar">
            <img className="explore-avatar" src={"http://api.adorable.io/avatar/" + this.props.docData.docOwner} />
          </div>
          <div className="col-explore-docs">
            <div className="row">
              <div className="col-sm-12">
                <span className="doc-list-title bold" onClick={this.openDoc}>{this.props.docData.docName}</span>
                <span className="explore-plain-text"> by </span>
                <span className="doc-list-title" onClick={this.goToProfile}>{this.props.docData.docOwner}</span>
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
          </div>
        </div>
        <hr/>
      </div>
    );
  }
};

export default connect(state => state)(ExploreDocuments);