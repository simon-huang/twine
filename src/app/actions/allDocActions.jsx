import axios from 'axios';
import * as doc from './docActions.jsx';

export function openDoc(docRequest) {
  return (dispatch, getState) => {
    var states = getState();
    axios.get('api/doc/openDoc', docRequest)
    .then(function(data) {
      dispatch(doc.handleChange('docName', data.docName));
      dispatch(doc.handleChange('docDescription', data.docDescription));
      dispatch(doc.handleChange('docType', data.docType));
      dispatch(doc.handleChange('filePath', data.filePath));
      dispatch(doc.handleChange('parentID', data.parentID));
      dispatch(doc.editDocChange(data.docContent));
    });
  }
}

