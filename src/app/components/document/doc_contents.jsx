import React from 'react';
import { connect } from 'react-redux';

class Doc_contents extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.doc.masterHtml}
      </div>
    );
  }
}


export default connect(state => state)(Doc_contents);
