export default function reducer(state = {
    docInit: {
      docName: '',
      docDescription: '',
      docType: 'public',
    },
  error: null
}, action) {

  switch(action.type) {
    case "FOO": {
      return {
        ...state,
        error: null
      }
    }
    case "FOOBAR": {
      return {
        ...state,
        error: null
      }
    }
    case "EDIT_DOCNAME": {
      return {
        ...state,
        docInit: {...state.docInit, docName: action.value}
      }
    }
    case "EDIT_DOCDESCRIPTION": {
      return {
        ...state,
        docInit: {...state.docInit, docDescription: action.value}
      }
    }
    case "EDIT_DOCTYPE": {
      return {
        ...state,
        docInit: {...state.docInit, docType: action.value}
      }
    }
  }

  return state;
}