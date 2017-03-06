export default function reducer(state = {
  currentTab: 'document',
  mergeSplitView: 'split',
  editMerge: false,
  reviewChanges: {
    acceptQuick: false,
    acceptComments: false,
    declineComments: false,
  }
}, action) {

  switch(action.type) {
    case "SWITCH_SPLIT_UNIFIED": {
      return {
        ...state,
        mergeSplitView: action.payload
      }
    }
  }

  switch(action.type) {
    case "EDIT_MERGE": {
      return {
        ...state,
        editMerge: !state.editMerge
      }
    }
  }

  switch(action.type) {
    case "TURN_OFF_EDITS": {
      return {
        ...state,
        editMerge: false
      }
    }
  }

  switch(action.type) {
    case "CANCEL_COMMENT": {
      return {
        ...state,
        reviewChanges: {acceptQuick: false, acceptComments: false, declineComments: false}
      }
    }
  }

  switch(action.type) {
    case "TAB_CHANGE": {
      return {
        ...state,
        currentTab: action.payload
      }
    }
  }

  switch(action.type) {
    case "REVIEW_CHANGES": {
      if (action.payload === 'acceptQuick') {
        return {...state, reviewChanges: {...state.reviewChanges, acceptQuick: true, acceptComments: false, declineComments: false}}
      } else if (action.payload === 'acceptComments') {
        return {...state, reviewChanges: {...state.reviewChanges, acceptQuick: false, acceptComments: true, declineComments: false}}
      } else if (action.payload === 'declineComments') {
        return {...state, reviewChanges: {...state.reviewChanges, acceptQuick: false, acceptComments: false, declineComments: true}}
      }
    }
  }

  return state;
}