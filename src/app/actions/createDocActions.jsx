import axios from 'axios';
import { browserHistory } from 'react-router';
import * as doc from './docActions.jsx';
import * as loading from './loadingActions.jsx';

export function handleCreateChange(name, value) {
  return {
    type: "CREATE_" + name.toUpperCase(),
    payload: value
  }
}

// API request to server to create a document
export function createDocument() {
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
      console.log('DATA.DATA', data.data);
      data = data.data;
      dispatch({
        type: 'RETRIEVE_DOC',
        payload: data
      })
      return data;
    })
    .then(function(data){
      console.log('DATA', data);
      browserHistory.push("/editdoc");
      dispatch(loading.toggleToast(true, `${data.docName} created!`));
    })
    .catch(function(err) {
      console.log(err);
    });
  }
}
