import api from '../../api'

export default {
  id: 'seasearch',
  name: '',
  elements: [
    {
      id: 'cikkszam',
      name: 'Cikkszám keresése',
      type: 'text',
      value: '25490',
      onChange: async (fields) => { fields.sealist.value = await api.get({url: '/local/seafile/search/'+fields.cikkszam.value}) },
    },
    {
      id: 'sealist',
      name: '',
      type: 'simplelist',
      rows: [{ field: 'name' }],
      value: [],
      onSelect: (fields) => {
        // Log('show', { file: fields.sealist.selected.fullpath })
        const publicUrl = 'https://mobilszefo.hopto.org:19540/d/a5008cf7b7484ef6b34e/'
        const win = window.open(publicUrl + 'files/?p=' + fields.sealist.selected.fullpath, '_blank')
        if (win) {
          win.focus()
        } else {
          alert('Engedélyezze a felugró ablakokat ezen az oldalon!')
        }
      }
    }
  ],
}
