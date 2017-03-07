import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

// UI
import Modal from 'react-bootstrap/lib/Modal';

// Store properties
import * as doc from '../../actions/docActions.jsx';

export class editDocModal extends React.Component {
  constructor(props) {
    super(props);
    this.toggleModal = this.toggleModal.bind(this);
    this.dontSave = this.dontSave.bind(this);
    this.save = this.save.bind(this);
  }

  toggleModal() {
   this.props.dispatch(doc.toggleUnsavedChangesModal());
  }

  dontSave() {
    this.props.dispatch(doc.toggleEditMode());
    browserHistory.push(this.props.doc.nextRouteAfterEdits);
  }

  save() {
    this.props.dispatch(doc.saveDoc());
    this.props.dispatch(doc.toggleEditMode());
    browserHistory.push(this.props.doc.nextRouteAfterEdits);
  }

  render() {
    return (
      <Modal show={this.props.doc.unsavedChangesModal} onHide={this.toggleModal}>
        <Modal.Body>
          <h4 className="mb30">Do you want to save the changes to {this.props.doc.docName}?</h4>
          <ul className="unsaved-changes-actions">
            <li><a onClick={this.dontSave} className="btn-cancel">Don't save</a></li>
            <li><a onClick={this.toggleModal} className="btn-cancel">Cancel</a></li>
            <li><a onClick={this.save} className="btn-purple">Save</a></li>
          </ul>
        </Modal.Body>
      </Modal>
    );
  }
}

export default connect(state => state)(editDocModal);




