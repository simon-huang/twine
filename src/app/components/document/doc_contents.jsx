import React from 'react';
import { connect } from 'react-redux';

class Doc_contents extends React.Component {
  constructor(props) {
    super(props);
  }

  createMarkup() {
    return {__html: this.props.doc.masterHtml};
  }


  render() {
    return (
      <div dangerouslySetInnerHTML={this.createMarkup()} />
    );
  }
}


export default connect(state => state)(Doc_contents);
