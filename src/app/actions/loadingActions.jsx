export function reqStarted () {
  return {
    type: "REQ_STARTED"
  }
}

export function reqCompleted () {
  return {
    type: "REQ_COMPLETED"
  }
}

export function reqError () {
  return {
    type: "REQ_ERROR"
  }
}

export function toggleToast (showing, message) {
  return {
    type: "TOGGLE_TOAST",
    payload: {showing: showing, message: message}
  }
}