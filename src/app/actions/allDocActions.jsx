import axios from 'axios';
import * as doc from './docActions.jsx';

export function openDoc(docRequest) {
  return (dispatch, getState) => {
    var states = getState();
    axios.post('api/doc/openDoc', docRequest)
    .then(function(data) {
      data = data.data;
      dispatch(doc.loadDocInfo(data));
    });
  }
} 

export function retrieveAllDocs () {
  return function(dispatch, getState) {
    axios.get('/api/doc/allDocs')
    .then((response) => {
      dispatch(doc.handleChange('allDocuments', response.data.allDocuments));
    })
    .catch((err) => {
      dispatch(authReject(err));
    })
  }
}
