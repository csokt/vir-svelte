import { push } from 'svelte-spa-router'
import api from '../api'
import { debug, data } from '../stores.js'

export default {
  munkalapazonosito: {
    id: 'munkalapazonosito',
    name: 'Munkalap',
    type: 'qrtext',
    value: '',
    attributes: {type: 'number'},
    onChange: async (fields) => {
      const kellek = Math.floor(fields.munkalapazonosito.value / 10000000) === 3
      const munkalapazonosito = kellek ? fields.munkalapazonosito.value - 10000000 : fields.munkalapazonosito.value
      const sql = `
        select top 1 t1.munkalapazonosito, t1.cikkszam, t1.rendelesszam, t1.kartonszam, t1.db, t1.partnerrendelesszam, t1.itszam, t1.szinkod, t1.meret, t1.megjegyzes,
            t2.mennyiseg, t2.partnercikk, t2.cikkmegnevezes, t2.csoport4, t2.mosott, t3.alapanyag, t3.ugyfelnev
          from rendelesmunkalap t1 join rendelesfej t2 on t1.rendelesszam = t2.rendelesszam join cikktorzs t3 on t1.cikkszam = t3.tcikkszam and t3.aktiv = 'A'
          where munkalapazonosito = ${munkalapazonosito}
      `
      const result = await api.post({url: '/local/tir/query', expect: 'object', params: {sql: sql}})
      if (result.munkalapazonosito) {
        if (kellek) {
          fields.kartoninfo.value = result.cikkszam.trim() + '/' + parseInt(result.rendelesszam.trim().slice(-4).toString()) + ' ' + result.mennyiseg.toString() + ' db'
        }
        else {
          fields.kartoninfo.value = result.cikkszam.trim() + '/' + parseInt(result.rendelesszam.trim().slice(-4).toString()) + ' ' + result.kartonszam.trim() + ' ' + result.db.toString() + ' db'
        }
      } else {
        fields.kartoninfo.value = ''
      }
      data.munkalap = result
      if (fields.munkalap) { fields.munkalap.value = result }
      if (debug) console.log('config Card kodol onChange munkalapazonosito', '\n  result', result)
    },
  },

  kartoninfo: {
    id: 'kartoninfo',
    name: 'Kartoninfo',
    type: 'text',
    value: '',
    readonly: true,
  },

  munkalap:  {
    id: 'munkalap',
    name: 'Munkalap',
    type: 'simpleobject',
    fields: [
      { field: 'itszam', label: 'IT azonosító' },
      { field: 'cikkszam', label: 'Cikkszám' },
      { field: 'cikkmegnevezes', label: 'Cikknév' },
      { field: 'kartonszam', label: 'Gyártási kartonszám' },
      { field: 'csoport4', label: 'Gépfinomság' },
      { field: 'alapanyag', label: 'Fonal összetétel' },
      { field: 'megjegyzes', label: 'Megjegyzés' },
      { field: 'mosott', label: 'Mosott' },
      { field: 'szinkod', label: 'Színszám' },
      { field: 'meret', label: 'Nagyság' },
      { field: 'db', label: 'Darabszám' },
      { field: 'ugyfelnev', label: 'Partner' },
      { field: 'partnerrendelesszam', label: 'Partner rendelésszám' },
      { field: 'partnercikk', label: 'Partner modellszám' },
    ],
    value: {},
    onSelect: (fields, params) => {
      if (params.selected.field === 'cikkszam' && params.selected.value) {
        data.params.seasearch = params.selected.value.trim()
        push('/menu2/seasearch')
      }
    },
  },

  text_field: {
    id: 'text_field',
    name: 'Text field',
    type: 'text',
    value: '',
    // attributes: {placeholder: 'Text field'}
  },

  qrtext_field: {
    id: 'qrtext_field',
    name: 'QR text field',
    type: 'qrtext',
    value: '',
    // attributes: {placeholder: 'QR text field'}
  },

  number_field: {
    id: 'number_field',
    name: 'Number field',
    type: 'text',
    value: '',
    attributes: {type: 'number', placeholder: 'Number field'}
  },

  alert_fields_button: {
    id: 'alert_fields_button',
    name: 'Alert fields',
    type: 'button',
    attributes: {color: 'orange'},
    onClick: (fields) => {
      console.log(fields)
      alert(JSON.stringify(fields, null, 4))
    },
  },

  alert_data_button: {
    id: 'alert_data_button',
    name: 'Alert data',
    type: 'button',
    attributes: {color: 'orange'},
    onClick: (fields) => {
      console.log(data)
      alert(JSON.stringify(data, null, 4))
    },
  },
}
