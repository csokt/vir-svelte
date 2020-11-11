import api from '../../api'
import common from '../common'
import { debug, data } from '../../stores.js'

export default {
  id: 'atad',
  name: '',
  // onMount: (fields) => {
  //   fields.dolgozokod.value = data.kodol.dolgozokod
  //   fields.dolgozonev.value = data.kodol.dolgozonev
  // },
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
    },

    {
      id: 'uzemnev',
      name: 'Üzemnév',
      type: 'text',
      value: '',
      readonly: true,
    },

    common.munkalapazonosito,
    common.kartoninfo,

    {
      id: 'mentes',
      name: 'Adatok mentése',
      type: 'button',
      onClick: async (fields) => {
        let message = ''
        fields.kodolasok.value = []
        for (const muveletkod of fields.muveletkodok.value) {
          const params = {
            funkcio: '99994',
            telephelykod: data.kodol.telephelykod,
            kodolokod: data.kodol.kodolokod,
            dolgozokod: fields.dolgozokod.value,
            munkalap: fields.munkalapazonosito.value,
            gepkod: fields.gepkod.value,
            muveletkod: muveletkod,
            mennyiseg: fields.mennyiseg.value,
            suly: 0,
            koteshelye: ''
          }
          // fields.kodolasok.value.unshift(params)
          fields.kodolasok.value.push(params)
          // Log('kodol', params)
          const result = await api.post({url: '/local/tir/kodol', expect: 'object', params: params})
          if (result.message) {
            params.eredmeny = result.message
            params.error = parseInt(result.error)
            if (params.error) {
              message = 'Nem minden tételt sikerült bekódolni!'
            }
          } else {
            message = 'Kódoló szerver hiba, értesítse a rendszergazdát!'
            params.eredmeny = 'Kódoló szerver hiba!'
            params.error = 1
            break
          }
        }
        if (message) {
          api.notifier.error(message)
          // Log('message', { message: message })
          return
        }
        api.notifier.notify('Tételek bekódolva!')
        fields.mennyiseg.value = ''

      },
      // disabledState: (fields) => {
      //   return !fields.dolgozonev.value || !fields.kartoninfo.value || !fields.muveletkodok.value.length || !(fields.mennyiseg.value > 0) ||
      //     fields.gepkod.error || fields.muveletkodok.error || fields.mennyiseg.error
      // },
    },

    // common.alert_fields_button,
    {
      id: 'kodolasok',
      name: 'Kódolások',
      type: 'simpletable',
      rowClass: (row) => {return row.error ? 'text-error-900' : null},
      columns: [
        { label: 'Műv.kód', field: 'muveletkod' },
        { label: 'Menny.',  field: 'mennyiseg' },
        { label: 'Eredmény',field: 'eredmeny' },
      ],
      value: [],
    }
  ],
}
