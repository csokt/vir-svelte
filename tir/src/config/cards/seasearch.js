import api from '../../api'
import { data } from '../../stores.js'

export default {
  id: 'seasearch',
  name: '',
  onMount: async (fields) => {
    if (data.params.seasearch) {
      fields.cikkszam.value = data.params.seasearch
      delete data.params.seasearch
    }
    if (fields.cikkszam.value) {
      api.log('Keresés', fields.cikkszam.value)
      fields.sealist.value = await api.get({url: '/local/seafile/search/'+fields.cikkszam.value})
    }
  },
  elements: [
    {
      id: 'cikkszam',
      name: 'Cikkszám keresése',
      type: 'text',
      value: '',
      onChange: async (fields) => { api.log('Keresés', fields.cikkszam.value); fields.sealist.value = await api.get({url: '/local/seafile/search/'+fields.cikkszam.value}) },
    },
    {
      id: 'sealist',
      name: '',
      type: 'simplelist',
      rows: [{ field: 'name' }],
      value: [],
      onSelect: (fields, params) => {
        // Log('show', { file: fields.sealist.selected.fullpath })
        const publicUrl = 'https://mobilszefo.hopto.org:19540/d/a5008cf7b7484ef6b34e/'
        const win = window.open(publicUrl + 'files/?p=' + params.selected.fullpath, '_blank')
        if (win) {
          win.focus()
        } else {
          alert('Engedélyezze a felugró ablakokat ezen az oldalon!')
        }
      }
    }
  ],
}
