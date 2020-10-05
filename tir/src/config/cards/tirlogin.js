import api from '../api'
import common from '../common'

export default {
  id: 'tirlogin',
  name: 'Kérem jelentkezzen be!',
  elements: [
    {
      id: 'qrcode',
      name: 'QR code',
      type: 'qrtext',
      value: '',
      attributes: {type: 'number', placeholder: 'QR'},
      onChange: async (fields) => {
        const qr = fields.qrcode.value
        let store = {}
        if (qr < 50000) {
          const dolgozokod = qr - 20000
          const sql = `
            select top 1 dolgozokod, dolgozonev, dolgtr.uzemkod, uzemek.vonalkod, uzemnev, uzemek.telephelykod, telephely
            from dolgtr join uzemek on dolgtr.uzemkod = uzemek.uzemkod join telephelyek on uzemek.telephelykod = telephelyek.telephelykod
            where aktiv = 'A' and kilepett = 0 and dolgozokod = ${dolgozokod}
          `
          const result = await api.post({url: '/local/tir/query', expect: 'object', params: {sql: sql}})
          if (result.dolgozokod) {
            const vonalkodRole = { 1: 'varró', 2: 'varró', 3: 'varró', 7: 'félkész vasaló', 8: 'szabó', 9: 'készáru vasaló', 11: 'logisztikus', 13: 'kötő', 32: 'kötő', 33: 'technológus', 45: 'varró2' }
            store.user = {
              name: result.dolgozonev.trim(),
              role: vonalkodRole[result.vonalkod],
              uzemnev: result.uzemnev.trim(),
              dolgozokod: result.dolgozokod.toString(),
              belepokod: (result.dolgozokod + 20000).toString()
            }
            store.kodol = {
              role: store.user.role,
              telephelykod: result.telephelykod,
              telephely: result.telephely.trim(),
              kodolokod: '-1',
              kodolo: 'dolgozó',
              dolgozokod: store.user.belepokod,
              dolgozonev: store.user.name,
              belepokod: store.user.belepokod,
              username: store.user.name,
              munkalapazonosito: '',
              kartoninfo: '',
              gepkod: '0',
              muveletkodok: [],
              mennyiseg: '',
              suly: '0',
              koteshelye: '',
              uzemnev: store.user.uzemnev
            }
          }
        }
        else if (qr < 51000) {
          const userid = qr - 50000
          const sql = `
            select top 1 [userid], [fullname] from [users] where [userid] = ${userid}
          `
          const result = await api.post({url: '/local/tir/query', expect: 'object', params: {sql: sql}})
          if (result.userid) {
            store.user = {
              name: result.fullname.trim(),
              role: 'kódoló',
              belepokod: (result.userid + 50000).toString()
            }
            store.kodol = {
              role: store.user.role,
              telephelykod: '0',
              telephely: 'Szeged, Tavasz u. 2.',
              kodolokod: store.user.belepokod,
              kodolo: store.user.name,
              dolgozokod: '',
              dolgozonev: '',
              belepokod: store.user.belepokod,
              username: store.user.name,
              munkalapazonosito: '',
              kartoninfo: '',
              gepkod: '0',
              muveletkodok: [],
              mennyiseg: '',
              suly: '0',
              koteshelye: '',
              uzemnev: '',
              uzemkod: '',
              hely: '',
              helynev: '',
              polckod: '0'
            }
          }
        }
        else if (qr < 54000) {
        }
        else if (qr < 55000) {
          store.user = {
            name: 'MEO',
            role: 'meo',
            belepokod: qr
          }
          store.kodol = {
            munkalapazonosito: '',
            kartoninfo: ''
          }
        }
        else {
        }
        fields.fullname.value = store.user.name
        // console.log(store)
      },
    },
    {
      id: 'fullname',
      name: 'Név',
      type: 'text',
      value: '',
      attributes: {readonly: true}
    },
  ],
}
