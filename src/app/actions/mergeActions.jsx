import axios from 'axios';
import * as doc from './docActions.jsx';

export function handleChange(name, value) {
  return {
    type: "EDIT_" + name.toUpperCase(),
    payload: value
  }
}

export function showMergeMenu() {
  return {
    type: "SHOWMERGEMENU"
  }
}

// API request to server to create a document
export function mergeDocument() {
  return (dispatch, getState) => {
    var states = getState();
    var res;
    var mergeRequest = {
      username: states.user.username,
      docName: states.doc.docName,
      collaboratorMessage: states.merge.mergeTitle,
      commitID: states.doc.currentCommit
    }
    axios.post('/api/doc/requestMerge', mergeRequest);
  }
}


// to validate of Merge Menu should be shown (if the person has made changes)
export function validateMerge () {
  return (dispatch, getState) => {
    var states = getState();
    var validateMergeInfo = {
      commitID: states.doc.currentCommit
    }
    axios.post('/api/doc/validateMerge', validateMergeInfo)
    .then(function(response) {
      if (response.data) {
        dispatch(showMergeMenu());
      } else {
        //update message for toast
      }
    });
  }
}

export function displayMerge () {
  return {
    type: "TOGGLE_DISPLAYMERGEREQUEST"
  }
}