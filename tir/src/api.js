import apisauce from 'apisauce'
import { version, debug, apiURL, data, snackbar } from './stores.js'

const notifier = {
  alert: (message) => snackbar.set({message: message, timeout: 2, bg: 'gray'}),
  error: (message) => snackbar.set({message: message, timeout: 5, bg: 'red'})
}

const API = apisauce.create({
  baseURL: apiURL,
  timeout: 15000,
  headers: {
    Authorization: localStorage.szefo_api2_token
  }
})

function checkResponse (response) {
  if (!response.ok) {
    console.log(response)
    notifier.error('Hiba: ' + (response.status ? response.status : '') + ' ' + response.problem + ' ' +
                              ((response.data && response.data.error) ? response.data.error : ''))
  }
  return response.ok
}

function dataFromResponse(response, expect) {
  if (!checkResponse(response)) {
    if (expect === 'array') return []
    if (expect === 'object') return {}
    return null
  }
  const data = response.data
  if (expect === 'array') {
    if (Array.isArray(data)) {
      return data
    } else {
      return [data]
    }
  }
  if (expect === 'object') {
    if (Array.isArray(data) && data.length) {
      return data[0]
    } else if (typeof data === 'object' && data.constructor === Object) {
      return data
    } else {
      return {}
    }
  }
  return null
}

async function get({url, expect='array', params=null}) {
  let parstr = ''
  if (params) {
    parstr = '?params=' + JSON.stringify(params)
  }
  const response = await API.get(url + parstr)
  if (debug) console.log('api.get', url + parstr, '\n  response:', response)
  return dataFromResponse(response, expect)
}

async function post({url, expect='array', params={}}) {
  const response = await API.post(url, params)
  if (debug) console.log('api.post', url,  '\n  params:', params, '\n  response:', response)
  return dataFromResponse(response, expect)
}

async function log(event, value, message='') {
  const params = {
    esemeny: event,
    ertek: value,
    uzenet: message,
    // data_user: data.user,
    felhasznalo: data.user.name || '',
    szerepkor: data.user.role || '',
    uzem: data.user.uzemnev || '',
    // data_account: data.account,
    ad_felhasznalo: data.account.fullname || '',
    // data_info: data.info,
    ip: data.info.ip || '',
    verzio: version,
    // path: router.app._route.path,
  }
  // console.log('###################')
  console.log(params)
}

export default { API, checkResponse, get, post, log, notifier }
