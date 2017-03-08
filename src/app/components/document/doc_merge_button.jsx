import React from 'react';
import { connect } from 'react-redux';
import * as merge from '../../actions/mergeActions.jsx';
import * as doc from '../../actions/docActions.jsx';

export class DocMergeButton extends React.Component {
  constructor(props) {
    super(props);
    this.showMergeMenu = this.showMergeMenu.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  showMergeMenu() {
    this.props.dispatch(merge.validateMerge());
  }

  handleChange(e) {
    e.preventDefault();
    this.props.dispatch(doc.handleChange(e.target.name, e.target.value));
  }

  render() {
    if (this.props.doc.originOwner !== null) {
      return (
        <a className="btn btn-gray mr10" onClick={this.showMergeMenu}>Submit your changes</a>
      );
    } else {
      return (
        <div></div>
      );
    }
  }
};

export default connect(state => state)(DocMergeButton);
