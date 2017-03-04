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
    // this.props.dispatch(merge.showMergeMenu());
  }

  handleChange(e) {
    e.preventDefault();
    this.props.dispatch(doc.handleChange(e.target.name, e.target.value));
  }

  render() {
    if (this.props.doc.originOwner !== this.props.user.username) {
      return (
        <button className="btn btn-success merge_request" onClick={this.showMergeMenu}>Merge</button>
      );
    } else {
      return (
        <div></div>
      );
    }
  }
};

export default connect(state => state)(DocMergeButton);


