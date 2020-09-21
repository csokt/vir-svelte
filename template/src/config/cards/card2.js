import api from '../api'
import common from '../common'

export default {
  id: 'card2',
  name: 'Card 2',
  elements: [
    {
      id: 'cikkszam',
      name: 'Cikkszám',
      type: 'text',
      value: '25529',
      attributes: {placeholder: 'Cikkszám'}
    },
    {
      id: 'button1',
      name: 'Keres',
      type: 'button',
      value: null,
      onClick: async (fields) => { fields.card2_list1.value = await api.get({url: '/local/seafile/search/'+fields.cikkszam.value})},
    },
    // common.alert_fields_button,
    {
      id: 'card2_list1',
      name: 'List 1',
      type: 'list',
      value: [],
      labelid: 'repo_name',
      valueid: 'name',
    }
  ],
}
