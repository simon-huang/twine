import React from 'react';
import { connect } from 'react-redux';
import * as doc from '../actions/docActions.jsx';


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

  componentWillMount() {
    this.props.dispatch(doc.handleChange('docName', ''));
    this.props.dispatch(doc.handleChange('docDescription', ''));
    this.props.dispatch(doc.handleChange('docType', 'public'));
  }

  render() {
    return (
      <div className="create_doc" >
        <h2>Create a new doc</h2>
        <input onChange={this.handleChange} type="text" value={this.props.docName} name="docName" placeholder="Give me a name" /><br/>
        <input onChange={this.handleChange} type="text" value={this.props.docDescription} name="docDescription" placeholder="Add a description (optional)" /><br/>
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






