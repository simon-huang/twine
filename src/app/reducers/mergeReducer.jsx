export default function reducer(state = {
  showMerge: false,
  mergeTitle: '',
  mergeMessage: '',
  error: null
}, action) {

  switch(action.type) {

    case "SHOWMERGEMENU": {
      return {
        ...state,
        showMerge: action.payload
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