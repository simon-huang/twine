import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import * as create from '../actions/createDocActions.jsx';


@connect((store) => {
  return {
    docName: store.create.docName,
    docDescription: store.create.docDescription,
    docType: store.create.docType
  }
})

export default class CreateDoc extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.createDocSubmit = this.createDocSubmit.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    this.props.dispatch(create.handleCreateChange(e.target.name, e.target.value));
  }


  createDocSubmit() {
    this.props.dispatch(create.createDocument());
    browserHistory.push('/doc');
  }

  componentWillMount() {
    this.props.dispatch(create.handleCreateChange('docName', ''));
    this.props.dispatch(create.handleCreateChange('docDescription', ''));
    this.props.dispatch(create.handleCreateChange('docType', 'public'));
  }

  render() {
    return (
      <div className="container create_doc" >
        <h2>Create a new doc</h2>
        <input onChange={this.handleChange} type="text" value={this.props.docName} name="docName" placeholder="Give me a name" /><br/>
        <textarea onChange={this.handleChange} type="text" value={this.props.docDescription} name="docDescription" placeholder="Add a description (optional)" /><br/>
        <div>Type of Doc:</div>
        <select onChange={this.handleChange} value={this.props.docType} name="docType">
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select><br/>
        <button onClick={this.createDocSubmit}>Submit</button>
      </div>
    );
  }
};






