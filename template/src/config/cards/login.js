import api from '../api'
import common from '../common'

export default {
  id: 'login',
  name: 'Be és kijelentkezés',
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
    {
      id: 'info',
      name: 'Info',
      type: 'button',
      value: null,
      onClick: async (fields) => {
        let result = await api.get({ url: '/private/account/info', expect: 'object' })
        console.log(result)
      },
    },
    common.alert_fields_button,
  ],
}
