import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import * as allDoc from '../../actions/allDocActions.jsx';


export class ForkedFrom extends React.Component {
  constructor(props) {
    super(props);
    this.openDoc = this.openDoc.bind(this);
  }

  openDoc(e) {
    e.preventDefault();
    browserHistory.push(`/profile/${this.props.doc.originOwner}/${this.props.doc.parentID}`);
  }

  render() {
    if (this.props.doc.originOwner) {
      return (
        <div className="copied-from-tag ml5">
          <span><i class="fa fa-code-fork"></i> from: <a onClick={this.openDoc}>{`${this.props.doc.originOwner} / ${this.props.doc.docName}`}</a></span>
        </div>
      );
    } else {
      return (
        <div></div>
      );
    }
  }
}

export default connect(state => state)(ForkedFrom);

