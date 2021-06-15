import Vue from 'vue'
import apisauce from 'apisauce'
import router from './router'
import Store from './store'

const API = apisauce.create({
  baseURL: '/api/',
  timeout: 15000
})

// #################################################################################################################################
// API.setHeader('Authorization', 'mJXHU9pmvrQf3XTyfvUULHcZQZ2FsP28v18mGNHbT3wPIBxJK1Tgv17VE5Y86aPV') //          KIVENNI!!          //
// #################################################################################################################################

const EventBus = new Vue()

const groupId = {
  LeltarViewer: 18,
  LeltarUser: 19,
  ChanceViewer: 57,
  ChanceUser: 58,
  LegrandViewer: 66,
  LegrandUser: 67
}

function utc2local (utc) {
  return new Date(utc.replace(/ /, 'T') + 'Z').toLocaleString()
}

function checkResponse (response) {
  if (!response.ok) {
    // console.log('response:', response)
    EventBus.$emit('inform', { type: 'alert', variation: 'error', message: response.data.error.message })
  }
  return response.ok
}

let lastPayload = null

function Log (event, data = {}) {
  const user = Store.get('user')
  const message = {
    user: (user.name) || 'nincs',
    privateip: Store.get('privateIP'),
    program: 'tir-kodol',
    event: event,
    path: router.app._route.path,
    role: (user.role) || '',
    uzem: (user.uzemnev) || '',
    version: Store.get('version'),
    publicip: Store.get('publicIP'),
    data: data
  }
  // console.log('Log message:', message)
  const topic = 'log/ui/' + message.program + '/' + message.event
  const payload = JSON.stringify(message)
  if (lastPayload !== payload) {
    lastPayload = payload
    // const response = await API.post('tir/log', { topic: topic, payload: payload })
    API.post('tir/log', { topic: topic, payload: payload })
    // console.log('Log response:', response)
  }
}

export { API, EventBus, groupId, utc2local, checkResponse, Log }
