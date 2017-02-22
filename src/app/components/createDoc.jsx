import React from 'react';
import { connect } from 'react-redux';
import * as doc from '../actions/documentActions.jsx';

// Name of doc
// Desciption of doc (optional)
// Public or Private
// Create Doc button
  // Create Doc fires off an API call over to the server/SQL DB


@connect((store) => {
  return {
    docName: store.doc.docInit.docName,
    docDescription: store.doc.docInit.docDescription,
    docType: store.doc.docInit.docType
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
    this.props.dispatch(doc.handleChange(e.target.name, e.target.value));
  }

  createDocSubmit() {
    console.log('Submitting! Sorta');
    this.props.dispatch(doc.createDocument());
  }

  render() {
    return (
      <div className="create_doc">
        <input onChange={this.handleChange} type="text" value={this.props.docName} name="docName" placeholder="Give me a name" /><br/>
        <input onChange={this.handleChange} type="text" value={this.props.docDescription} name="docDescription" placeholder="Add a description (optional)" /><br/>
        <select onChange={this.handleChange} value={this.props.docType} name="docType">
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select><br/>
        <button onClick={this.createDocSubmit}>Submit</button>
      </div>
    );
  }
};