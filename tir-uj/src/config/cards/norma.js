import api from '../../api'
import common from '../common'
import { data } from '../../stores.js'

let startDate = new Date()
startDate.setHours(5,30,0,0)

function onChange(fields) {
  let aktIdo = new Date()
  aktIdo.setSeconds(0,0)
  const elteltPerc = Math.round((aktIdo.getTime() - fields.kezdIdo.value.getTime())/60000)

  fields.aktIdo.value = aktIdo.toLocaleTimeString('hu', {timeStyle: 'short'})
  fields.elteltPerc.value = elteltPerc
  fields.teljesitmeny.value = Math.round(100 * fields.osszesNormaperc.value / elteltPerc)
}

export default {
  id: 'norma',
  name: '',
  onMount: async (fields) => {
    const sql = `
      SELECT sum([Összes Normaperc]) AS sum FROM monitor_napikodolas where [Dolgozó kód] = ${data.user.belepokod}
    `
    const result = await api.post({url: '/local/tir/query', expect: 'object', params: {sql: sql}})
    fields.osszesNormaperc.value = result.sum ? Math.round(result.sum) : 0
    onChange(fields)
  },
  elements: [
    // common.alert_fields_button,
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
      value: 0,
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
