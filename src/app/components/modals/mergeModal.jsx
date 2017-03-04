import React from 'react';
import { connect } from 'react-redux';

// UI
import Modal from 'react-bootstrap/lib/Modal';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';

// Store properties
import * as user from '../../actions/userActions.jsx';
import * as auth from '../../actions/authActions.jsx';
import * as doc from '../../actions/docActions.jsx';
import * as merge from '../../actions/mergeActions.jsx';

export class MergeModal extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.toggleMergeMenu = this.toggleMergeMenu.bind(this);
    this.submitMerge = this.submitMerge.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    this.props.dispatch(doc.handleChange(e.target.name, e.target.value));
  }

  toggleMergeMenu() {
   this.props.dispatch(merge.showMergeMenu());
  }

  submitMerge(e) {
    e.preventDefault();
    console.log('submitting merge request');
    this.props.dispatch(merge.mergeDocument());
  }

  render() {
    return (
      <Modal show={this.props.merge.showMergeMenu} onHide={this.toggleMergeMenu} dialogClassName="merge-modal">
        <Modal.Header closeButton>
          <Modal.Title>Submit a Merge request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={this.submitMerge}>
            <FormGroup>
              <FormControl type="text" value={this.props.merge.mergeTitle} placeholder="Merge Title" name="mergeTitle" onChange={this.handleChange} />
              <FormControl.Feedback />
            {/*<FormGroup>
              <FormControl type="text" value={this.props.merge.mergeMessage} placeholder="Merge Message" name="mergeMessage" onChange={this.handleChange} />
              <FormControl.Feedback />
            </FormGroup> */}
            <FormGroup className="mt25">
              <input type="submit" className="btn btn-purple" label="Merge in"/>
            </FormGroup>
            </FormGroup>
          </form>
        </Modal.Body>
      </Modal>
    );
  }
}

export default connect(state => state)(MergeModal);







