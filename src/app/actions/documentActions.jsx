import axios from 'axios';

export function handleChange(name, value) {
  return {
    type: "EDIT_" + name.toUpperCase(),
    value: value
  }
}

// API request to server to create a document
export function createDocument() {
  return (dispatch, getState) => {
    var states = getState();
    console.log('docInit', states.doc.docInit);
    axios.post('/api/doc/createDoc', states.doc.docInit);
  }
}

// export function testFunc() {
//   return (dispatch, getState) => {
//     var states = getState();
//     console.log('docInit States', states.doc.docInit);
//   }
// }