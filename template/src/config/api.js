import apisauce from 'apisauce'
console.log('api.js')

const API = apisauce.create({
  // baseURL: '/api2/',
  baseURL: 'http://api2.szefo.local:34000/api2/',
  timeout: 5000,
  headers: {
    Authorization: localStorage.szefo_api2_token
  }
})

function checkResponse (response) {
  if (!response.ok) {
    // EventBus.$emit('inform', { type: 'alert', variation: 'error', message: response.data.error.data.message })
    console.log(response)
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
  return dataFromResponse(response, expect)
}

async function post({url, expect='array', params={}}) {
  const response = await API.post(url, params)
  return dataFromResponse(response, expect)
}

export default { API, checkResponse, get, post }
