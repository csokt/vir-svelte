import api from '../../api'
import common from '../common'
import { debug, data } from '../../stores.js'

export default {
  id: 'kodol',
  name: '',
  onMount: (fields) => {
    fields.dolgozokod.value = data.kodol.dolgozokod
    fields.dolgozonev.value = data.kodol.dolgozonev
  },
  layout: ['dolgozokod','dolgozonev','munkalapazonosito','kartoninfo',['gepkod','torles'],'muveletkodok','mennyiseg','mentes','kodolasok'],
  elements: [
    {
      id: 'dolgozokod',
      name: 'Dolgozó kód',
      type: 'qrtext',
      value: '',
      attributes: {type: 'number'},
      hiddenState: (fields) => {
        return data.user.role!=='kódoló' ? true : null
      },
      onChange: async (fields) => {
        const dolgozokod = fields.dolgozokod.value - 20000
        const sql = `select top 1 dolgozokod, dolgozonev from dolgtr where aktiv = 'A' and kilepett = 0 and dolgozokod = ${dolgozokod}`
        const result = await api.post({url: '/local/tir/query', expect: 'object', params: {sql: sql}})
        if (debug) console.log('config Card kodol onChange dolgozokod', '\n  result', result)
        fields.dolgozonev.value = result.dolgozonev
      },
    },

    {
      id: 'dolgozonev',
      name: 'Dolgozó',
      type: 'text',
      value: '',
      readonly: true,
    },

    common.munkalapazonosito,
    common.kartoninfo,

    {
      id: 'gepkod',
      name: 'Gépkód',
      type: 'text',
      value: '0',
      attributes: {type: 'number'},
      errorState: (fields) => {
        return fields.gepkod.value !== parseInt(fields.gepkod.value).toString() || parseInt(fields.gepkod.value) < 0 ? 'Érvénytelen gépkód!' : false
      },
    },

    {
      id: 'torles',
      name: 'Törlés\u21A7',
      type: 'button',
      class: 'pl-2',
      onClick: (fields) => {
        fields.gepkod.value = '0'
        fields.muveletkodok.value = []
        fields.mennyiseg.value = ''
      },
      disabledState: (fields) => {
        return fields.gepkod.value === '0' && !fields.muveletkodok.value.length && fields.mennyiseg.value === ''
      },
    },

    {
      id: 'muveletkodok',
      name: 'Műveletkódok',
      type: 'tags',
      value: [],
      attributes: {type: 'number'},
      errorState: (fields) => {
        for (const muveletkod of fields.muveletkodok.value) {
          if (muveletkod !== parseInt(muveletkod).toString() || parseInt(muveletkod) < 1) {
            api.notifier.alert('Érvénytelen műveletkód!')
            return true
          }
        }
        return false
      },
    },

    {
      id: 'mennyiseg',
      name: 'Mennyiség',
      type: 'text',
      value: '',
      blurOnChange: true,
      attributes: {type: 'number'},
      errorState: (fields) => {
        if (fields.mennyiseg.value === '') return false
        return fields.mennyiseg.value !== parseInt(fields.mennyiseg.value).toString() || parseInt(fields.mennyiseg.value) <= 0 ? 'Érvénytelen mennyiség!' : false
      },
    },

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
          const result = await api.post({url: '/local/tir/kodol', expect: 'object', params: params})
          if (result.message) {
            params.eredmeny = result.message
            params.error = parseInt(result.error)
            if (params.error) {
              message = 'Nem minden tételt sikerült bekódolni!'
              api.log('Kódol', 'hiba', result.message)
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
          return
        }
        api.notifier.alert('Tételek bekódolva!')
        fields.mennyiseg.value = ''
        api.log('Kódol', 'siker')
      },
      disabledState: (fields) => {
        return !fields.dolgozonev.value || !fields.kartoninfo.value || !fields.muveletkodok.value.length || !(fields.mennyiseg.value > 0) ||
          fields.gepkod.error || fields.muveletkodok.error || fields.mennyiseg.error
      },
    },

    // common.alert_fields_button,
    {
      id: 'kodolasok',
      name: 'Kódolások',
      type: 'simpletable',
      rowClass: (row) => {return row.error ? 'text-red-700' : null},
      columns: [
        { label: 'Műv.kód', field: 'muveletkod' },
        { label: 'Menny.',  field: 'mennyiseg' },
        { label: 'Eredmény',field: 'eredmeny' },
      ],
      value: [],
    }
  ],
}
