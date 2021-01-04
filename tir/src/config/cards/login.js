import api from '../../api'
import common from '../common'
import { userinfo } from '../../stores.js'

let user

userinfo.subscribe(value => {
  user = value
})

export default {
  id: 'login',
  name: 'Be és kijelentkezés',
  onMount: async (fields) => {
    fields.username.value = user.username || ''
    fields.fullname.value = user.fullname || ''
  },
  layout: ['version','username','password','fullname',['belep','kilep']],
  elements: [
    {
      id: 'version',
      name: 'Verzió',
      type: 'text',
      value: '21.01.04',
      attributes: { readonly: true }
    },
    {
      id: 'username',
      name: 'Bejelentkezési név',
      type: 'text',
      value: 'csok.tibor',
      attributes: {},
      onChange: (fields) => {},
    },
    {
      id: 'password',
      name: 'Jelszó',
      type: 'text',
      value: '',
      attributes: { type: 'password' },
      onChange: (fields) => {},
    },
    {
      id: 'fullname',
      name: 'Név',
      type: 'text',
      value: '',
      attributes: { readonly: true }
    },
    {
      id: 'belep',
      name: 'Belép',
      type: 'button',
      onClick: async (fields) => {
        let result = await api.post({url: '/account/login', expect: 'object', params: {username: fields.username.value, password: fields.password.value} })
        if (result.accesstoken) {
          fields.password.value = ''
          fields.fullname.value = result.fullname || ''
          localStorage.szefo_api2_token = result.accesstoken
          api.API.setHeader('Authorization', result.accesstoken)
          userinfo.set(await api.get({ url: '/private/account/info', expect: 'object' }))
        }
      },
      disabledState: (fields) => {
        return !fields.username.value || !fields.password.value
      },
    },
    {
      id: 'kilep',
      name: 'Kilép',
      type: 'button',
      onClick: (fields) => {
        fields.password.value = ''
        fields.fullname.value = ''
        userinfo.set({})
        delete localStorage.szefo_api2_token
        api.API.setHeader('Authorization', undefined)
      },
      disabledState: (fields) => {
        return !fields.fullname.value
      },
    },
  ],
}
