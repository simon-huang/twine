import React from 'react';
import { connect } from 'react-redux';
import * as profile from '../../actions/profileActions.jsx';
import * as user from '../../actions/userActions.jsx';
import * as docSummary from '../../actions/docSummaryActions.jsx';

import ProfileDocuments from './profile_documents.jsx';


class Profile extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div className="profile">
        <h1>Profile</h1>
        <div>Username: {this.props.user.user.username}</div>
        <ProfileDocuments />
      </div>
    )
  }
}

export default connect(state => state)(Profile);