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
    this.closeModal = this.closeModal.bind(this);
    this.dontSave = this.dontSave.bind(this);
    this.save = this.save.bind(this);
  }

  closeModal() {
   this.props.dispatch(doc.toggleUnsavedChangesModal());
   this.props.dispatch(doc.toggleEditMode());
  }

  dontSave(e) {
    e.preventDefault();
    this.props.dispatch(doc.toggleUnsavedChangesModal());
    browserHistory.push(this.props.doc.nextRouteAfterEdits);
  }

  save(e) {
    e.preventDefault();
    this.props.dispatch(doc.saveDoc());
    this.props.dispatch(doc.toggleUnsavedChangesModal());
    browserHistory.push(this.props.doc.nextRouteAfterEdits);
  }

  render() {
    return (
      <Modal show={this.props.doc.unsavedChangesModal} onHide={this.closeModal}>
        <Modal.Body>
          <h4 className="mb30">Do you want to save your changes to {this.props.doc.docName} before leaving?</h4>
          <ul className="unsaved-changes-actions">
            <li><a onClick={this.dontSave} className="btn-cancel">Don't save</a></li>
            <li><a onClick={this.closeModal} className="btn-cancel">Cancel</a></li>
            <li><a onClick={this.save} className="btn-purple">Save</a></li>
          </ul>
        </Modal.Body>
      </Modal>
    );
  }
}

export default connect(state => state)(editDocModal);




