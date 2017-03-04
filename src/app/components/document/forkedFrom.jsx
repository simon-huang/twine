import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import * as allDoc from '../../actions/allDocActions.jsx';


export class ForkedFrom extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.doc.originOwner) {
      return (
        <div>Forked from: {this.props.doc.originOwner}
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

