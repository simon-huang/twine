export default function reducer(state = {
  showMergeMenu: false,
  mergeTitle: '',
  mergeMessage: '',
  validateMerge: false, //do we need this? Or can we directly manupulate showMerge?
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
  }

  return state;
}