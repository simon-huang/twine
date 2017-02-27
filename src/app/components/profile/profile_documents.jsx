import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import * as allDoc from '../../actions/allDocActions.jsx';

import ProfileDocSummary from './profile_docSummary.jsx';


class ProfileDocuments extends React.Component {
  constructor(props) {
    super(props);
    this.openDoc = this.openDoc.bind(this);
  }

  openDoc(name) {
    var docRequest = {
      username: this.props.user.user.username,
      docName: name,
    }
    this.props.dispatch(allDoc.openDoc(docRequest));
    browserHistory.push('/doc');
  }

  render() {
    return (
      <div className="profile-documents">
        <div>Your Documents!</div>
        <hr/>
        {this.props.allDoc.allDocuments.map((docs, i) => (
          <ProfileDocSummary key={i} onClick={this.openDoc} doc={docs} />))}
      </div>
    )
  }
}

export default connect(state => state)(ProfileDocuments);

