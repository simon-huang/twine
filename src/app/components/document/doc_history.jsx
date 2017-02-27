import React from 'react';
import { connect } from 'react-redux';

class Doc_history extends React.Component {

  render() {
    return (
      <div>
        history tab
      </div>
    );
  }
}

export default connect(state => state)(Doc_history);