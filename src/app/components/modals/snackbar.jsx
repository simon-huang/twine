import React from 'react';
import { connect } from 'react-redux';

// UI
import Snackbar from 'material-ui/Snackbar';

// Actions
import * as loading from './../../actions/loadingActions.jsx';

export class Toast extends React.Component {
  constructor(props) {
    super(props);
    this.handleRequestClose = this.handleRequestClose.bind(this);
  }

  handleRequestClose() {
    this.props.dispatch(loading.toggleToast(false, ''))
  };

  render() {
    return (
      <Snackbar className="toast" open={this.props.loading.toast} message={this.props.loading.toastMsg} autoHideDuration={3000} onRequestClose={this.handleRequestClose} />
    );
  }
}

export default connect(state => state)(Toast);