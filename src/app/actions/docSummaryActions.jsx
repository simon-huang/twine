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