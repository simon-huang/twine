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
        <h3>Create a new document</h3>
        {/*<input onChange={this.handleChange} type="text" value={this.props.create.docName} name="docName" placeholder="Give me a name" /><br/>
        <textarea onChange={this.handleChange} type="text" value={this.props.create.docDescription} name="docDescription" placeholder="Add a description (optional)" /><br/>
        <div>Type of Doc:</div>
        <select onChange={this.handleChange} value={this.props.create.docType} name="docType">
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select><br/>
        <button onClick={this.createDocSubmit}>Submit</button> */}
        <form onSubmit={this.createDocSubmit}>
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
        </form>
      </div>
    );
  }
};


export default connect(state => state)(CreateDoc);





