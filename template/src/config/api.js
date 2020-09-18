import apisauce from 'apisauce'

const API = apisauce.create({
  // baseURL: '/api2/',
  baseURL: 'http://api2.szefo.local:34000/api2/',
  timeout: 5000
})

function checkResponse (response) {
  if (!response.ok) {
    // EventBus.$emit('inform', { type: 'alert', variation: 'error', message: response.data.error.data.message })
    console.log(response)
  }
  return response.ok
}

async function get({url, expect='array', params=null}) {
  let parstr = ''
  if (params) {
    parstr = '?params=' + JSON.stringify(params)
  }
  const response = await API.get(url + parstr)
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

export default { API, checkResponse, get }
