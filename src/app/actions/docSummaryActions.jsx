export function switchSplitOrUnified () {
  return {
    type: "SWITCH_SPLIT_UNIFIED"
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