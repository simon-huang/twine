import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';

import * as create from '../actions/createDocActions.jsx';

export class CreateDoc extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.createDocSubmit = this.createDocSubmit.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    this.props.dispatch(create.handleCreateChange(e.target.name, e.target.value));
  }


  createDocSubmit(e) {
    e.preventDefault();
    this.props.dispatch(create.createDocument());
  }

  componentWillMount() {
    this.props.dispatch(create.handleCreateChange('docName', ''));
    this.props.dispatch(create.handleCreateChange('docDescription', ''));
    this.props.dispatch(create.handleCreateChange('docType', 'public'));
  }

  render() {
    return (
      <div className="mt20 container create_doc" >
        <div className="create-doc-container">
          <div className="create-doc">
            <form className="create-doc-form" onSubmit={this.createDocSubmit}>
              <input className="create-doc-title" onChange={this.handleChange} type="text" value={this.props.create.docName} name="docName" placeholder="Give me a name" />
              <textarea className="mt10" onChange={this.handleChange} type="text" value={this.props.create.docDescription} name="docDescription" placeholder="Add a description (optional)" />
              <span className="privacy-selector mb20">
                Make me
                <select className="ml5" onChange={this.handleChange} value={this.props.create.docType} name="docType">
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                </select>
              </span>
              <input type="submit" className="ml10 mt10 btn btn-purple" value="Create document"/>
            </form>
          </div>
        </div>
      </div>
    );
  }
};


export default connect(state => state)(CreateDoc);





/*<form onSubmit={this.createDocSubmit}>
  <FormGroup>
    <FormControl onChange={this.handleChange} type="text" value={this.props.create.docName} name="docName" placeholder="Give me a name" />
    <FormControl.Feedback />
  </FormGroup>
  <FormGroup>
    <FormControl onChange={this.handleChange} type="text" value={this.props.create.docDescription} name="docDescription" placeholder="Add a description (optional)" />
    <FormControl.Feedback />
  </FormGroup>
  <FormGroup>
    <select onChange={this.handleChange} value={this.props.create.docType} name="docType">
      <option value="public">Public</option>
      <option value="private">Private</option>
    </select><br/>
  </FormGroup>
  <FormGroup controlId="formSubmit" className="mt25">
    <input type="submit" className="btn btn-purple" label="Log in"/>
  </FormGroup>
</form>*/