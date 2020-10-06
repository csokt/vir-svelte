import api from '../../api'
import common from '../common'
import { debug, data } from '../../stores.js'

export default {
  id: 'kodol',
  name: '',
  elements: [
    {
      id: 'dolgozokod',
      name: 'Dolgozó kód',
      type: 'qrtext',
      value: '',
      attributes: {type: 'number'},
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
      attributes: {readonly: true}
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
      attributes: {readonly: true}
    },
    {
      id: 'gepkod',
      name: 'Gépkód',
      type: 'text',
      value: '0',
      attributes: {type: 'number'},
    },
    {
      id: 'muveletkodok',
      name: 'Műveletkódok',
      type: 'text',
      value: '',
    },
    {
      id: 'mennyiseg',
      name: 'Mennyiség',
      type: 'text',
      value: '',
      attributes: {type: 'number'},
    },
    {
      id: 'mentes',
      name: 'Adatok mentése',
      type: 'button',
      onClick: async (fields) => {
        console.log(fields)
      },
      disabledState: (fields) => {
        return !fields.dolgozonev.value || !fields.kartoninfo.value || !fields.muveletkodok.value || !(fields.mennyiseg.value > 0)
      },
    },
  ],
}
