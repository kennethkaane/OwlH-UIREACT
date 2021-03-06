import * as ActionTypes from './utils-action-types';
import {GetUserName, GetToken} from '../../components/Shared/CheckToken'
import axios from 'axios'

const config = {
  headers: {
    'Content-Type': 'application/json'
  }
}

export function defaultCredentials() {
  return (dispatch) => {
    //check default credentials
    axios.get('/api/about', config)
    .then(resp => {
      dispatch(getDefaultCredentials(resp.data.defaults))
    })
  }
}
function getDefaultCredentials(data) {
  return {
    type: ActionTypes.SHOW_CREDENTIALS_ALERT,
    payload: data
  }
}

export function changePassword(data) {

  const token = GetToken()
  const username = GetUserName()

  let newHeaders = {
    ...config.headers, 
    'user': username,
    'token': token
  }
  let newConfig = {headers: newHeaders}

  return (dispatch) => {    
    //check default credentials
    axios.put('/api/pass', JSON.stringify(data), newConfig)
    .then(resp => {
      dispatch(setChangePassword(resp.data))
    })
  }
}
function setChangePassword(data) {
  return {
    type: ActionTypes.CHANGE_PASSWORD,
    payload: data
  }
}

export function showSpinner() {
  return {
    type: ActionTypes.SHOW_SPINNER,
    payload: true
  }
}
  
export function hideSpinner() {
  return {
    type: ActionTypes.HIDE_SPINNER,
    payload: false
  }
}