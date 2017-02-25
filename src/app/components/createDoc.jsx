import React from 'react';
import { connect } from 'react-redux';
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
    this.props.dispatch(create.handleChange(e.target.name, e.target.value));
  }


  createDocSubmit() {
    console.log('Submitting! Sorta');
    this.props.dispatch(create.createDocument());
  }

  componentWillMount() {
    this.props.dispatch(create.handleChange('docName', ''));
    this.props.dispatch(create.handleChange('docDescription', ''));
    this.props.dispatch(create.handleChange('docType', 'public'));
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






