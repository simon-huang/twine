import React from 'react';
import { connect } from 'react-redux';
import * as user from '../../actions/userActions.jsx';
import * as docSummary from '../../actions/docSummaryActions.jsx';

import ProfileContribDocuments from './profile_contribDocuments.jsx';
import ProfileMyDocuments from './profile_myDocuments.jsx';


export class Profile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="profile">
        <h1>Profile</h1>
        <div>Username: {this.props.user.username}</div>
        <ProfileContribDocuments />
        <hr/>
        <ProfileMyDocuments />
      </div>
    )
  }
}

export default connect(state => state)(Profile);