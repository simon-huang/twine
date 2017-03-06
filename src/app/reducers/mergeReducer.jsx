export default function reducer(state = {
  showMergeMenu: false,
  mergeTitle: '',
  mergeMessage: '',
  // validateMerge: false, //do we need this? Or can we directly manupulate showMerge?
  displayMergeRequest: false,
  // originContent: '',
  diffHtml: '',
  diffObject: '',
  originHtml: '',
  ownerMergeMessage: '',
  mergeCommitID: '',
  error: null
}, action) {

  switch(action.type) {

    case "SHOWMERGEMENU": {
      return {
        ...state,
        showMergeMenu: !state.showMergeMenu
      }
    }
    case "EDIT_MERGETITLE": {
      return {
        ...state,
        mergeTitle: action.payload
      }
    }
    case "EDIT_MERGEMESSAGE": {
      return {
        ...state,
        mergeMessage: action.payload
      }
    }
    case "EDIT_DIFFCONTENT": {
      return {
        ...state,
        diffHtml: action.payload
      }
    }
    case "EDIT_ORIGINCONTENT": {
      return {
        ...state,
        originHtml: action.payload
      }
    }
    case "EDIT_OWNERMERGEMESSAGE": {
      return {
        ...state,
        ownerMergeMessage: action.payload
      }
    }
    case "EDIT_MERGECOMMITID": {
      return {
        ...state,
        mergeCommitID: action.payload
      }
    }
    case "TOGGLE_DISPLAYMERGEREQUEST": {
      return {
        ...state,
        displayMergeRequest: !state.displayMergeRequest
      }
    }
    case "TOGGLE_DISPLAYMERGEREQUEST_FALSE": {
      return {
        ...state,
        displayMergeRequest: false
      }
    }
    case "POPULATE_MERGE_EDITOR": {
      return {
        ...state,
        diffObject: action.payload.editorState,
      }
    }
    case "EDIT_DIFF_CONTENT": {
      return {
        ...state,
        diffObject: action.payload
      }
    }
    
  }


  return state;
}