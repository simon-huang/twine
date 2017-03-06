import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import * as auth from './../../actions/authActions.jsx';
import * as merge from './../../actions/mergeActions.jsx';
import * as doc from './../../actions/docActions.jsx';
import * as docSummary from './../../actions/docSummaryActions.jsx';
import * as loading from './../../actions/loadingActions.jsx';

export class DocMergeListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.displayMergeRequest = this.displayMergeRequest.bind(this);
  }

  displayMergeRequest(e) {
    e.preventDefault();
    if (this.props.user.username === this.props.doc.docOwner) {
      this.props.dispatch(doc.handleChange('OWNERMERGEMESSAGE', ''));
      this.props.dispatch(docSummary.cancelComment());
      this.props.dispatch(merge.reviewPullRequest(this.props.prInfo.commitID));
    } else if (this.props.user.username === '') {
      this.props.dispatch(auth.toggleLoginModal());
    } else {
      this.props.dispatch(loading.toggleToast(true, 'Please sign in as the document owner'));
    }
  }

  render() {
    return (
      <div>
        <h4 className="merge-list-title list-title" onClick={this.displayMergeRequest}>{this.props.prInfo.collaboratorMessage}</h4>
        <br/>
        <div>Request by: {this.props.prInfo.username}</div>
        <hr/>
      </div>
    );
  }
};

export default connect(state => state)(DocMergeListEntry);