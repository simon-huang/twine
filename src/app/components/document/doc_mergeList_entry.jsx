import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

// Import Components
import Tooltip from 'react-bootstrap/lib/Tooltip';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';

// Import actions
import * as auth from './../../actions/authActions.jsx';
import * as merge from './../../actions/mergeActions.jsx';
import * as doc from './../../actions/docActions.jsx';
import * as docSummary from './../../actions/docSummaryActions.jsx';
import * as loading from './../../actions/loadingActions.jsx';

export class DocMergeListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.displayMergeRequest = this.displayMergeRequest.bind(this);
    this.addTooltip = this.addTooltip.bind(this);
  }

  displayMergeRequest(e) {
    e.preventDefault();
    if (this.props.user.username === this.props.doc.docOwner) {
      this.props.dispatch(doc.handleChange('OWNERMERGEMESSAGE', ''));
      this.props.dispatch(docSummary.cancelComment());
      this.props.dispatch(merge.reviewPullRequest(this.props.prInfo));
    } else if (this.props.user.username === '') {
      this.props.dispatch(auth.toggleLoginModal());
    } else {
      this.props.dispatch(loading.toggleToast(true, 'Please sign in as the document owner'));
    }
  }

  addTooltip(text) {
    return (
      <Tooltip id="tooltip">{text}</Tooltip>
    );
  }

  render() {
    return (
      <div className="row">
        <div className="col-sm-12">
          <div className="row">
            <div className="col-sm-12">
              <OverlayTrigger placement="top" overlay={this.addTooltip('edits waiting review')}>
                <span className="open-merge-icon"><i class="fa fa-clipboard" aria-hidden="true"></i></span>
              </OverlayTrigger>
              <span className="ml10 merge-req-title" onClick={this.displayMergeRequest}>{this.props.prInfo.collaboratorMessage}</span>
              <span className="ml10 open-merge-tag">waiting review</span>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <span className="open-merge-author">edits submitted by {this.props.prInfo.username}</span>
            </div>
          </div>
          <hr/>
        </div>
      </div>
    );
  }
};

export default connect(state => state)(DocMergeListEntry);