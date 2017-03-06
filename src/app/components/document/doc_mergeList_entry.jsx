import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import * as merge from './../../actions/mergeActions.jsx';
import * as doc from './../../actions/docActions.jsx';
import * as docSummary from './../../actions/docSummaryActions.jsx';

export class DocMergeListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.displayMergeRequest = this.displayMergeRequest.bind(this);
  }

  displayMergeRequest(e) {
    e.preventDefault();
    this.props.dispatch(doc.handleChange('OWNERMERGEMESSAGE', ''));
    this.props.dispatch(docSummary.resetReviewChanges());
    this.props.dispatch(merge.reviewPullRequest(this.props.prInfo.commitID));
  }

  render() {
    return (
      <div>
        <h4 className="merge-list-title" onClick={this.displayMergeRequest}>{this.props.prInfo.collaboratorMessage}</h4>
        <br/>
        <div>Request by: {this.props.prInfo.username}</div>
        <hr/>
      </div>
    );
  }
};

export default connect(state => state)(DocMergeListEntry);