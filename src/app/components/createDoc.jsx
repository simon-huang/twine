import React from 'react';
import { connect } from 'react-redux';
import * as doc from '../actions/docActions.jsx';

import styles from './styles/style.jsx';
import TextField from 'material-ui/TextField';
import RaisedBtn from 'material-ui/RaisedButton';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

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
    this.dropDownMenuChange = this.dropDownMenuChange.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    this.props.dispatch(doc.handleChange(e.target.name, e.target.value));
  }

  dropDownMenuChange(e) {
    e.preventDefault();
    var type = e.target.innerHTML.toLowerCase();
    if (type[0] === '<') {
      type = type.split('')
      type.splice(0, 5);
      type.splice(type.length - 6, 6);
      type = type.join('');
    }
    this.props.dispatch(doc.handleChange('DOCTYPE', type));
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
        <TextField onChange={this.handleChange} type="text" value={this.props.docName} name="docName" floatingLabelText="Give me a name" /><br/>
        <TextField onChange={this.handleChange} type="text" value={this.props.docDescription} name="docDescription" floatingLabelText="Add a description (optional)" /><br/>
        <div>Type of Doc:</div>
        <DropDownMenu onChange={this.dropDownMenuChange} value={this.props.docType} name="docType">
          <MenuItem value={'public'} primaryText="Public" />
          <MenuItem value={'private'} primaryText="Private" />
        </DropDownMenu><br/>
        <RaisedButton onClick={this.createDocSubmit} label="Submit" primary={true} style={styles.btn} />
      </div>
    );
  }
};






