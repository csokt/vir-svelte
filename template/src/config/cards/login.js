import api from '../api'
import common from '../common'
console.log('login.js')

export default {
  id: 'login',
  name: 'Be és kijelentkezés',
  onMount: async (fields) => {
    let result = await api.get({ url: '/private/account/info', expect: 'object' })
    fields.fullname.value = result.fullname || ''
    fields.ldap.value = result.ldap
    fields.vir.value = result.vir
    fields.vir2.value = result.vir2
  },
  elements: [
    {
      id: 'username',
      name: 'Bejelentkezési név',
      type: 'text',
      value: 'csok.tibor',
      attributes: {}
    },
    {
      id: 'password',
      name: 'Jelszó',
      type: 'text',
      value: 'Godhak04',
      attributes: {type: 'password'}
    },
    {
      id: 'fullname',
      name: 'Név',
      type: 'text',
      value: '',
      attributes: {readonly: true}
    },
    {
      id: 'ldap',
      name: 'LDAP',
      type: 'checkbox',
      value: false,
      attributes: {disabled: true}
    },
    {
      id: 'vir',
      name: 'Vir',
      type: 'checkbox',
      value: false,
      attributes: {disabled: true}
    },
    {
      id: 'vir2',
      name: 'Vir2',
      type: 'checkbox',
      value: false,
      attributes: {disabled: true}
    },
    {
      id: 'belep',
      name: 'Belép',
      type: 'button',
      value: null,
      onClick: async (fields) => {
        let result = await api.post({url: '/account/login', expect: 'object', params: {username: fields.username.value, password: fields.password.value} })
        console.log(result)
        if (result.accesstoken) {
          fields.fullname.value = result.fullname || ''
          localStorage.szefo_api2_token = result.accesstoken
          api.API.setHeader('Authorization', result.accesstoken)
        }
      },
    },
    {
      id: 'kilep',
      name: 'Kilép',
      type: 'button',
      value: null,
      onClick: (fields) => {
        fields.fullname.value = ''
        delete localStorage.szefo_api2_token
        api.API.setHeader('Authorization', undefined)
      },
    },
    common.alert_fields_button,
  ],
}
