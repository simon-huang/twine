import React from 'react';
import { connect } from 'react-redux';

class Doc_settings extends React.Component {

  render() {
    return (
      <div>
        Settings tab
      </div>
    );
  }
}

export default connect(state => state)(Doc_settings);