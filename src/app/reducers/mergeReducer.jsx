export default function reducer(state = {
  showMerge: false,
  mergeTitle: '',
  mergeMessage: '',
  validateMerge: false, //do we need this? Or can we directly manupulate showMerge?
  error: null
}, action) {

  switch(action.type) {

    case "SHOWMERGEMENU": {
      return {
        ...state,
        showMerge: !state.showMerge
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