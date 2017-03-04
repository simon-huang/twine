export default function reducer(state = true, action) {

  switch(action.type) {

    case "REQ_STARTED":
      return true
    
    case "REQ_COMPLETED": 
      return false
    
    case "REQ_ERROR": 
      return false

    default:
      return state;
  }
  
}