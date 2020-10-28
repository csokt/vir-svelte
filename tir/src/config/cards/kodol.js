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
  elements: [
    {
      id: 'dolgozokod',
      name: 'Dolgozó kód',
      type: 'qrtext',
      value: '',
      attributes: {type: 'number'},
      readonlyState: (fields) => {
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
    {
      id: 'munkalapazonosito',
      name: 'Munkalap',
      type: 'qrtext',
      value: '',
      attributes: {type: 'number'},
      onChange: async (fields) => {
        const kellek = Math.floor(fields.munkalapazonosito.value / 10000000) === 3
        const munkalapazonosito = kellek ? fields.munkalapazonosito.value - 10000000 : fields.munkalapazonosito.value
        const sql = `
          select top 1 t1.munkalapazonosito, t1.cikkszam, t1.rendelesszam, t1.kartonszam, t1.db, t2.mennyiseg
            from rendelesmunkalap t1 join rendelesfej t2 on t1.rendelesszam = t2.rendelesszam
            where munkalapazonosito = ${munkalapazonosito}
        `
        const result = await api.post({url: '/local/tir/query', expect: 'object', params: {sql: sql}})
        if (debug) console.log('config Card kodol onChange munkalapazonosito', '\n  result', result)
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
      },
    },
    {
      id: 'kartoninfo',
      name: 'Kartoninfo',
      type: 'text',
      value: '',
      readonly: true,
    },
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
        console.log(fields)
        // Log('kodol', fields)
        // let message = ''
        // this.feldolgozas = true

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
          const result = await api.post({url: '/local/tir/kodol', expect: 'object', params: params})
          console.log('######', result)
        //   let doc = { ...this.kodol, muveletkod: muveletkod }
        //   this.kodolasok.unshift(doc)
        //   const response = await API.post('tir/kodol', doc)

        //   if (response.ok) {
        //     doc.eredmeny = response.data.message
        //     doc.error = parseInt(response.data.error)
        //     if (doc.error) {
        //       message = 'Nem minden tételt sikerült bekódolni!'
        //     }
        //   } else {
        //     message = 'Kódoló szerver hiba, értesítse a rendszergazdát!'
        //     doc.eredmeny = 'Kódoló szerver hiba!'
        //     doc.error = 1
        //     break
        //   }
        }
        // this.feldolgozas = false
        // if (message) {
        //   EventBus.$emit('inform', { type: 'alert', variation: 'error', message: message })
        //   Log('message', { message: message })
        //   return
        // }
        // EventBus.$emit('inform', { type: 'alert', variation: 'success', message: 'Tételek bekódolva!' })
        // this.kodol.mennyiseg = ''

      },
      disabledState: (fields) => {
        return !fields.dolgozonev.value || !fields.kartoninfo.value || !fields.muveletkodok.value.length || !(fields.mennyiseg.value > 0) ||
          fields.gepkod.error || fields.muveletkodok.error || fields.mennyiseg.error
      },
    },
    common.alert_fields_button,
  ],
}
