import axios from 'axios';
import * as doc from './docActions.jsx';

export function tabChange (tab) {
  return {
    type: "PROFILE_TAB_CHANGE",
    payload: tab
  }
}