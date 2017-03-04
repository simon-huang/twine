import React from 'react';
import { connect } from 'react-redux';
import * as merge from '../../actions/mergeActions.jsx';
import * as doc from '../../actions/docActions.jsx';

export class EditDoc_details extends React.Component {
  constructor(props) {
    super(props);
    this.toggleMergeMenu = this.toggleMergeMenu.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.mergeRequest = this.mergeRequest.bind(this);
    this.clearMergeInfo = this.clearMergeInfo.bind(this);
    this.cancelMerge = this.cancelMerge.bind(this);
    this.saveDoc = this.saveDoc.bind(this);
  }

  toggleMergeMenu(value) {
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

  saveDoc() {
    this.props.dispatch(doc.saveDoc());
  }

  // toggleMerge() {
  //   if (this.props.merge.showMergeMenu) {
  //     return (
  //       <div>
  //         <h2>Merge Menu</h2>
  //         <input onChange={this.handleChange} type="text" value={this.props.merge.mergeTitle} name="mergeTitle" placeholder="Name your Merge" /><br/>
  //         <textarea onChange={this.handleChange} type="text" value={this.props.merge.mergeMessage} name="mergeMessage" placeholder="Add a comment telling the document owner what you worked on" /><br/>
  //         <button className="btn btn-success cancel_request" onClick={()=>(this.cancelMerge(!this.props.merge.showMergeMenu))}>Cancel</button>
  //         <button className="btn btn-success confirm_merge_request" onClick={()=>(this.mergeRequest(!this.props.merge.showMergeMenu))}>Confirm</button>
  //       </div>
  //     );
  //   } else {
  //     return (
  //       <div>
  //         <button className="btn btn-success merge_request" onClick={()=>(this.toggleMergeMenu(!this.props.merge.showMergeMenu))}>Merge</button>      
  //       </div>
  //     );
  //   }
  // }

  render() {
    return (
      <div className="editDoc-details">
        <button className="btn btn-success save_request" onClick={this.saveDoc}>Save</button>
      </div>
    );
  }
};

export default connect(state => state)(EditDoc_details);





