export default function reducer(state = {
    docInit: {
      docName: '',
      docDescription: '',
      docType: 'public',
    },
    editDoc: {
      docName: 'TestName',
      docDescription: '',
      docType: '',
      parentID: null,
      filePath: '',
      docContent: '',
      showMerge: false
    },
  error: null
}, action) {

  switch(action.type) {

    case "EDIT_DOCNAME": {
      return {
        ...state,
        docInit: {...state.docInit, docName: action.payload}
      }
    }
    case "EDIT_DOCDESCRIPTION": {
      return {
        ...state,
        docInit: {...state.docInit, docDescription: action.payload}
      }
    }
    case "EDIT_DOCTYPE": {
      return {
        ...state,
        docInit: {...state.docInit, docType: action.payload}
      }
    }
    case "EDIT_DOCCONTENT": {
      return {
        ...state,
        editDoc: {...state.editDoc, docContent: action.payload}
      }
    }
  }

  return state;
}