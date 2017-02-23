import React from 'react';
import { connect } from 'react-redux';
import * as merge from '../../actions/mergeActions.jsx';

@connect((store) => {
  return {
    showMerge: store.merge.showMerge,
    mergeTitle: store.merge.mergeTitle,
    mergeMessage: store.merge.mergeMessage
  }
})

export default class EditDoc_details extends React.Component {
  constructor(props) {
    super(props);
    this.showMergeMenu = this.showMergeMenu.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.mergeRequest = this.mergeRequest.bind(this);
    this.clearMergeInfo = this.clearMergeInfo.bind(this);
    this.cancelMerge = this.cancelMerge.bind(this);
  }

  showMergeMenu(value) {
    return this.props.dispatch(merge.showMergeMenu(value));
  }

  handleChange(e) {
    e.preventDefault();
    this.props.dispatch(merge.handleChange(e.target.name, e.target.value));
  }

  mergeRequest(value) {
    this.props.dispatch(merge.mergeDocument());
    this.showMergeMenu(value);
    this.clearMergeInfo();
  }

  clearMergeInfo() {
    this.props.dispatch(merge.handleChange('mergeTitle', ''));
    this.props.dispatch(merge.handleChange('mergeMessage', ''));
  }

  cancelMerge(value) {
    this.clearMergeInfo();
    this.showMergeMenu(value);
  }

  render() {
    if (this.props.showMerge) {
      return (
        <div>
          <h2>Merge Menu</h2>
          <input onChange={this.handleChange} type="text" value={this.props.mergeTitle} name="mergeTitle" placeholder="Name your Merge" /><br/>
          <textarea onChange={this.handleChange} type="text" value={this.props.mergeMessage} name="mergeMessage" placeholder="Add a comment telling the document owner what you worked on" /><br/>
          <button className="btn btn-success" onClick={()=>(this.cancelMerge(!this.props.showMerge))}>Cancel</button>
          <button className="btn btn-success" onClick={()=>(this.mergeRequest(!this.props.showMerge))}>Confirm</button>
        </div>
      );
    }
    return (
      <div>
        <button className="btn btn-success" onClick={()=>(console.log('test save'))}>Save</button>
        <button className="btn btn-success" onClick={()=>(this.showMergeMenu(!this.props.showMerge))}>Merge</button>
      </div>
    );
  }
};