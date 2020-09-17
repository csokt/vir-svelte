import apisauce from 'apisauce'

const API = apisauce.create({
  // baseURL: '/api2/',
  baseURL: 'http://api2.szefo.local:34000/api2/',
  timeout: 5000
})

export default API
