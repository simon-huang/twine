import axios from 'axios';
import * as doc from './docActions.jsx';
import { browserHistory } from 'react-router';

export function handleCreateChange(name, value) {
  return {
    type: "CREATE_" + name.toUpperCase(),
    payload: value
  }
}

// API request to server to create a document
export function createDocument(path) {
  return (dispatch, getState) => {
    var states = getState();
    var createRequestInfo = {
      username: states.user.username,
      docName: states.create.docName,
      docDescription: states.create.docDescription,
      docType: states.create.docType
    };
    axios.post('/api/doc/createDoc', createRequestInfo)
    .then(function(data){
      data = data.data;
      dispatch(doc.loadDocInfo(data, path));
      // browserHistory.push(`/profile/${path}`);
    });
  }
}
