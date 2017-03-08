import React from 'react';
import { connect } from 'react-redux';

import * as merge from '../../actions/mergeActions.jsx';
import * as doc from '../../actions/docActions.jsx';
import * as loading from './../../actions/loadingActions.jsx';

export class DocCopyButton extends React.Component {
  constructor(props) {
    super(props);
    this.copyDocument = this.copyDocument.bind(this);
  }

  copyDocument() {
    this.props.dispatch(doc.copyDoc());
  }

  render() {
    if (this.props.doc.docOwner !== this.props.user.username) {
      return (
        <a className="btn btn-purple" onClick={this.copyDocument}>Copy this document</a>
      );
    } else {
      return (
        <div></div>
      );
    }
  }
};

export default connect(state => state)(DocCopyButton);





