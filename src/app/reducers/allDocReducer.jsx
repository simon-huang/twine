export default function reducer(state = {
  allDocuments: [
    {docName: 'Doc1', docDescription: 'Doc1 description', type: ''},
    {docName: 'Doc2', docDescription: 'Doc2 description', type: ''},
    {docName: 'Doc3', docDescription: 'Doc3 description', type: ''},
    {docName: 'Doc4', docDescription: 'Doc4 description', type: ''}
  ],
  error: null
}, action) {

  switch(action.type) {

    case "FOO": {
      return {
        ...state,
      }
    }
  }

  return state;
}