export default function reducer(state = {
  error: null
}, action) {

  switch(action.type) {
    case "FOO": {
      return {
        ...state,
        error: null
      }
    }
    case "FOOBAR": {
      return {
        ...state,
        error: null
      }
    }
  }

  return state;
}