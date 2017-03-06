import axios from 'axios';

export function switchSplitOrUnified (view) {
  return {
    type: "SWITCH_SPLIT_UNIFIED",
    payload: view
  }
}

export function editMerge () {
  return {
    type: "EDIT_MERGE"
  }
}

export function turnOffEdits () {
  return {
    type: "TURN_OFF_EDITS"
  }
}

export function cancelComment () {
  return {
    type: "CANCEL_COMMENT"
  }
}

export function tabChange (tab) {
  return {
    type: "TAB_CHANGE",
    payload: tab
  }
}

export function reviewChanges (dropdownSelect) {
  return {
    type: "REVIEW_CHANGES",
    payload: dropdownSelect
  }
}

export function actionPullRequest (info) {
  return (dispatch, getState) => {
    axios.post('/api/doc/actionPullRequest', info)
    .then(function(response) {
      console.log('action taken on PR', response.data);
    });
  }
}