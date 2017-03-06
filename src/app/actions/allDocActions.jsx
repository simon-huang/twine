import axios from 'axios';
import * as doc from './docActions.jsx';

export function openDoc(docRequest) {
  return (dispatch, getState) => {
    var states = getState();
    axios.post('/api/doc/openDoc', docRequest)
    .then(function(data) {
      data = data.data;
      dispatch(doc.loadDocInfo(data));
    });
  }
}

export function retrieveAllDocs () {
  return function(dispatch, getState) {
    dispatch({type:'REQ_STARTED'});
    axios.get('/api/doc/allDocs')
    .then((response) => {
      dispatch({
        type: 'EDIT_ALLDOCUMENTS',
        payload: response.data.allDocuments
      })
      dispatch({type: 'REQ_COMPLETED'});
    })
    .catch((err) => {
      dispatch({type: 'REQ_ERROR'});
    })
  }
}

export function retrieveProfileDocs (username) {
  return function(dispatch, getState) {
    dispatch({type:'REQ_STARTED'});
    axios.get(`/api/profile/${username}`)
    .then((response) => {
      console.log('profile response ==> ', response.data);
      console.log('profile response userDocuments ==> ', response.data.userDocuments);
      dispatch({
        type: 'EDIT_OWNEDDOCS',
        payload: response.data.userDocuments.owned
      }) 
      dispatch({
        type: 'EDIT_CONTRIBUTINGDOCS',
        payload: response.data.userDocuments.contributing
      }) 
      dispatch({
        type: 'EDIT_ASSOCIATEDDOCS',
        payload: response.data.userDocuments.both
      })
      dispatch({type: 'REQ_COMPLETED'});
    })
    .catch((err) => {
      dispatch({type: 'REQ_ERROR'});
    })
  }
}
