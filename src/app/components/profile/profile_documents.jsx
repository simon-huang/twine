// collection that holds all documents

import React from 'react';
import { connect } from 'react-redux';
import * as profile from '../../actions/profileActions.jsx';
import * as allDoc from '../../actions/allDocActions.jsx';

import ProfileDocSummary from './profile_docSummary.jsx';



class ProfileDocuments extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div className="profile-documents">
        <div>Your Documents!</div>
        {this.props.allDoc.allDocuments.map((docs, i) => (
          <ProfileDocSummary key={i} doc={docs}/>))}
      </div>
    )
  }
}

export default connect(state => state)(ProfileDocuments);

