import api from '../../api'
import common from '../common'
import { debug, data } from '../../stores.js'

export default {
  id: 'atad',
  name: '',
  elements: [
    {
      id: 'hely',
      name: 'Átadási helykód',
      type: 'qrtext',
      value: '',
      attributes: {type: 'number'},
      onChange: async (fields) => {
        const sql = `select top 1 kod, kodnev from vonalkodok where kod = ${fields.hely.value}`
        const result = await api.post({url: '/local/tir/query', expect: 'object', params: {sql: sql}})
        if (debug) console.log('config Card atad onChange hely', '\n  result', result)
        fields.helynev.value = result.kodnev
      },
    },

    {
      id: 'helynev',
      name: 'Átadási helynév',
      type: 'text',
      value: '',
      readonly: true,
    },

    {
      id: 'uzemkod',
      name: 'Üzemkód',
      type: 'qrtext',
      value: '',
      attributes: {type: 'number'},
      onChange: async (fields) => {
        const value = parseInt(fields.uzemkod.value) - 54000
        const sql = `select top 1 vonalkod, uzemnev from uzemek where vonalkod = ${value}`
        const result = await api.post({url: '/local/tir/query', expect: 'object', params: {sql: sql}})
        if (debug) console.log('config Card atad onChange uzemkod', '\n  result', result)
        fields.uzemnev.value = result.uzemnev
      },
      hiddenState: (fields) => { return fields.hely.value != '90026' },
    },

    {
      id: 'uzemnev',
      name: 'Üzemnév',
      type: 'text',
      value: '',
      readonly: true,
      hiddenState: (fields) => { return fields.hely.value != '90026' },
    },

    common.munkalapazonosito,
    common.kartoninfo,

    {
      id: 'mentes',
      name: 'Adatok mentése',
      type: 'button',
      onClick: async (fields) => {
        let message = ''

        const params = {
          funkcio: fields.hely.value,
          telephelykod: data.kodol.telephelykod,
          kodolokod: data.kodol.kodolokod,
          munkalap: fields.munkalapazonosito.value,
          hely: fields.hely.value,
          uzemkod: fields.uzemkod.value || 0,
          polckod: 0
        }
        fields.atadasok.value.unshift(params)
        if (fields.atadasok.value.length > 20) { fields.atadasok.value.length = 20 }
        // fields.atadasok.value.push(params)
        // Log('atad', params)
        const result = await api.post({url: '/local/tir/kodol', expect: 'object', params: params})
        if (result.message) {
          params.eredmeny = result.message
          params.error = parseInt(result.error)
          if (params.error) {
            message = 'Nem sikerült átadni!'
          }
        } else {
          message = 'Kódoló szerver hiba, értesítse a rendszergazdát!'
          params.eredmeny = 'Kódoló szerver hiba!'
          params.error = 1
        }

        if (message) {
          api.notifier.error(message)
          // Log('message', { message: message })
          return
        }
        api.notifier.notify('Átadva!')
        fields.mennyiseg.value = ''

      },
      disabledState: (fields) => {
        return !fields.helynev.value || !fields.kartoninfo.value || (fields.hely.value == '90026' && !fields.uzemnev.value)
      },
    },

    // common.alert_fields_button,
    // common.alert_data_button,
    {
      id: 'atadasok',
      name: 'Átadások',
      type: 'simpletable',
      rowClass: (row) => {return row.error ? 'text-red-700' : null},
      columns: [
        { label: 'Helykód', field: 'hely' },
        { label: 'Munkalap',  field: 'munkalap' },
        { label: 'Eredmény',field: 'eredmeny' },
      ],
      value: [],
    }
  ],
}
