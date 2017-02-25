export default function reducer(state = {
  docName: 'Test Doc Name',
  docDescription: '',
  docType: '',
  parentID: null,
  filePath: '',
  editContent: '',
  originalContent: 'TEST ORIGINAL CONTENT',
  previewContent: null,
  showMerge: false,
  error: null
}, action) {

  switch(action.type) {

    case "EDIT_DOCNAME": {
      return {
        ...state,
        docName: action.payload
      }
    }
    case "EDIT_DOCDESCRIPTION": {
      return {
        ...state,
        docDescription: action.payload
      }
    }
    case "EDIT_DOCTYPE": {
      return {
        ...state,
        docType: action.payload
      }
    }
    case "EDIT_EDITCONTENT": {
      return {
        ...state,
        editContent: action.payload
      }
    }
    case "EDIT_PREVIEWCONTENT": {
      return {
        ...state,
        previewContent: action.payload
      }
    }
  }

  return state;
}