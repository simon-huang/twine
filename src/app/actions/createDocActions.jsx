import axios from 'axios';

export function handleChange(name, value) {
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
      username: states.user.user.username,
      docName: states.create.docName,
      docDescription: states.create.docDescription,
      docType: states.create.docType
    };
    axios.post('/api/doc/createDoc', createRequestInfo)
    .then(function(data){
      data = data.data;
      dispatch({
        type: "EDIT_DOCOWNER",
        payload: data.docOwner
      });
      dispatch({
        type: "EDIT_DOCNAME",
        payload: data.docName
      });
      dispatch({
        type: "EDIT_DOCDESCRIPTION",
        payload: data.docDescription
      });
      dispatch({
        type: "EDIT_DOCTYPE",
        payload: data.docType
      });
      dispatch({
        type: "EDIT_PARENTID",
        payload: data.parentID
      });
      dispatch({
        type: "EDIT_FILEPATH",
        payload: data.filePath
      });
      dispatch({
        type: "EDIT_MASTERHTML",
        payload: data.docContent
      });
      dispatch({
        type: "EDIT_DOCCOMMITS",
        payload: data.docCommits
      });
      console.log('doc states', getState().doc);
    });
  }
}