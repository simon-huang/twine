export default function reducer(state = {
  docName: '',
  docDescription: '',
  docType: 'public',
  error: null
}, action) {

  switch(action.type) {

    case "CREATE_DOCNAME": {
      return {
        ...state,
        docName: action.payload
      }
    }
    case "CREATE_DOCDESCRIPTION": {
      return {
        ...state,
        docDescription: action.payload
      }
    }
    case "CREATE_DOCTYPE": {
      return {
        ...state,
        docType: action.payload
      }
    }
  }

  return state;
}