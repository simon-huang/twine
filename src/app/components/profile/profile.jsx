import React from 'react';
import { connect } from 'react-redux';
import * as profile from '../../actions/profileActions.jsx';
import * as user from '../../actions/userActions.jsx';
import * as docSummary from '../../actions/docSummaryActions.jsx';

import ProfileDocuments from './profile_documents.jsx';


@connect((store) => {
  return {
    username: store.user.user.username,
    email: store.user.user.email
  }
})

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div className="profile">
        <h1>Profile</h1>
        <div>Username: {this.props.username}</div>
        <ProfileDocuments />
      </div>
    )
  }
}