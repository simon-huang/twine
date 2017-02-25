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
    axios.post('/api/doc/createDoc', states.doc.docInit);
  }
}
