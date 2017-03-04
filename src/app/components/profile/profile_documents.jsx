import React from 'react';
import { connect } from 'react-redux';

// Components
import ProfileDocSummary from './profile_docSummary.jsx';

// Store properties
import * as allDoc from '../../actions/allDocActions.jsx';


export class ProfileDocuments extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="profile-documents mt20">
        {this.props.docList.map((docs, i) => (
          <ProfileDocSummary key={i} docData={docs} />))}
      </div>
    )
  }
}

export default connect(state => state)(ProfileDocuments);

