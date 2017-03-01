import React from 'react';
import { connect } from 'react-redux';

export class Doc_contents extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div dangerouslySetInnerHTML={{'__html': this.props.doc.masterHtml}} />
    );
  }
}


export default connect(state => state)(Doc_contents);
