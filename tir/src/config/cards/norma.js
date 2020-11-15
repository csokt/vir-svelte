import api from '../../api'
import common from '../common'
import { data } from '../../stores.js'

let startDate = new Date()
startDate.setHours(5,30,0,0)

function onChange(fields) {
  fields.aktIdo.value = new Date().toLocaleTimeString('hu', {timeStyle: 'short'})
  fields.elteltPerc.value = Math.round((new Date().getTime() - fields.kezdIdo.value.getTime())/60000)

}

export default {
  id: 'norma',
  name: '',
  onMount: async (fields) => {
      // SELECT sum([Összes Normaperc]) AS sum FROM monitor_napikodolas where [Dolgozó kód] = ${data.user.belepokod}
    const sql = `
      SELECT sum([Összes Normaperc]) AS sum FROM monitor_napikodolas where [Dolgozó kód] = 20007
    `
    const result = await api.post({url: '/local/tir/query', expect: 'object', params: {sql: sql}})
    console.log(result)
    // onChange(fields)
  },
  elements: [
    common.alert_fields_button,
    {
      id: 'kezdIdo',
      name: 'Munkaidő kezdete',
      type: 'time',
      value: startDate,
      onChange: onChange,
    },
    {
      id: 'aktIdo',
      name: 'Aktuális idő',
      type: 'text',
      value: '',
      attributes: {readonly: true}
    },
    {
      id: 'elteltPerc',
      name: 'Eltelt idő (perc)',
      type: 'text',
      value: '',
      attributes: {readonly: true}
    },
    {
      id: 'osszesNormaperc',
      name: 'Összes normaperc',
      type: 'text',
      value: '',
      attributes: {readonly: true}
    },
    {
      id: 'teljesitmeny',
      name: 'Teljesítmény %',
      type: 'text',
      value: '',
      attributes: {readonly: true}
    },
  ],
}
