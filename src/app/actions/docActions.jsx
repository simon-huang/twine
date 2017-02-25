import axios from 'axios';

export function handleChange(name, value) {
  return {
    type: "EDIT_" + name.toUpperCase(),
    payload: value
  }
}

// API request to server to create a document
export function editDocChange(value) {
  return {
    type: "EDIT_DOCCONTENT",
    payload: value
  }
}
