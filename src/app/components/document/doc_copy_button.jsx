import React from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/lib/Button';

import * as merge from '../../actions/mergeActions.jsx';
import * as doc from '../../actions/docActions.jsx';
import * as loading from './../../actions/loadingActions.jsx';

export class DocCopyButton extends React.Component {
  constructor(props) {
    super(props);
    this.copyDocument = this.copyDocument.bind(this);
  }

  copyDocument() {
    this.props.dispatch(loading.toggleToast(true, 'Document copied! And its super'));
    // this.props.dispatch(doc.copyDoc());
    // browserHistory.push('/doc');
  }

  render() {
    if (this.props.doc.docOwner !== this.props.user.username) {
      return (
        <Button onClick={this.copyDocument} className="copy-button">Copy</Button>
      );
    } else {
      return (
        <div></div>
      );
    }
  }
};

export default connect(state => state)(DocCopyButton);





