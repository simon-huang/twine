import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import * as allDoc from '../../actions/allDocActions.jsx';


export class CopiedFrom extends React.Component {
  constructor(props) {
    super(props);
    this.openDoc = this.openDoc.bind(this);
  }

  openDoc(e) {
    e.preventDefault();
    browserHistory.push(`/profile/${this.props.docData.originOwner}/${this.props.docData.parentID}`);
  }

  render() {
    if (this.props.docData.originOwner) {
      return (
        <div>
          <span>Copied from: <a onClick={this.openDoc}>{`${this.props.docData.originOwner} / ${this.props.docData.docName}`}</a></span>
        </div>
      );
    } else {
      return (
        <div></div>
      );
    }
  }
}

export default connect(state => state)(CopiedFrom);

