import { notifier } from 'smelte/src/components/Snackbar'
import api from '../../api'
import common from '../common'
import { debug, data } from '../../stores.js'

export default {
  id: 'tirlogin',
  name: 'Kérem jelentkezzen be!',
  elements: [
    {
      id: 'qrcode',
      name: 'Dolgozókód',
      type: 'qrtext',
      value: '',
      attributes: {type: 'number'},
      onChange: async (fields) => {
        data.user = {}
        data.kodol = {}
        const qr = fields.qrcode.value
        if (qr < 20000) {}
        else if (qr < 50000) {
          const dolgozokod = qr - 20000
          const sql = `
            select top 1 dolgozokod, dolgozonev, dolgtr.uzemkod, uzemek.vonalkod, uzemnev, uzemek.telephelykod, telephely
            from dolgtr join uzemek on dolgtr.uzemkod = uzemek.uzemkod join telephelyek on uzemek.telephelykod = telephelyek.telephelykod
            where aktiv = 'A' and kilepett = 0 and dolgozokod = ${dolgozokod}
          `
          const result = await api.post({url: '/local/tir/query', expect: 'object', params: {sql: sql}})
          if (result.dolgozokod) {
            const vonalkodRole = { 1: 'varró', 2: 'varró', 3: 'varró', 7: 'félkész vasaló', 8: 'szabó', 9: 'készáru vasaló', 11: 'logisztikus', 13: 'kötő', 32: 'kötő', 33: 'technológus', 45: 'varró2' }
            data.user = {
              name: result.dolgozonev.trim(),
              role: vonalkodRole[result.vonalkod],
              uzemnev: result.uzemnev.trim(),
              dolgozokod: result.dolgozokod.toString(),
              belepokod: (result.dolgozokod + 20000).toString()
            }
            data.kodol = {
              role: data.user.role,
              telephelykod: result.telephelykod,
              telephely: result.telephely.trim(),
              kodolokod: '-1',
              kodolo: 'dolgozó',
              dolgozokod: data.user.belepokod,
              dolgozonev: data.user.name,
              belepokod: data.user.belepokod,
              username: data.user.name,
              munkalapazonosito: '',
              kartoninfo: '',
              gepkod: '0',
              muveletkodok: [],
              mennyiseg: '',
              suly: '0',
              koteshelye: '',
              uzemnev: data.user.uzemnev
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
            data.user = {
              name: result.fullname.trim(),
              role: 'kódoló',
              belepokod: (result.userid + 50000).toString()
            }
            data.kodol = {
              role: data.user.role,
              telephelykod: '0',
              telephely: 'Szeged, Tavasz u. 2.',
              kodolokod: data.user.belepokod,
              kodolo: data.user.name,
              dolgozokod: '',
              dolgozonev: '',
              belepokod: data.user.belepokod,
              username: data.user.name,
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
          data.user = {
            name: 'MEO',
            role: 'meo',
            belepokod: qr
          }
          data.kodol = {
            munkalapazonosito: '',
            kartoninfo: ''
          }
        }
        fields.fullname.value = data.user.name
        if (!fields.fullname.value) {
          notifier.alert('A dolgozókód nem található!')
        }
        if (debug) console.log('config Card tirlogin onChange qrcode', '\n  user', data.user, '\n  kodol', data.kodol)
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
