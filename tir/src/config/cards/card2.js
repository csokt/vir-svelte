import api from '../../api'
import common from '../common'

export default {
  id: 'card2',
  name: 'Card 2',
  elements: [
    {
      id: 'cikkszam',
      name: 'Cikkszám',
      type: 'text',
      value: '25504',
      attributes: {placeholder: 'Cikkszám'}
    },
    {
      id: 'button1',
      name: 'Keres',
      type: 'button',
      onClick: async (fields) => { fields.card2_list1.value = await api.get({url: '/local/seafile/search/'+fields.cikkszam.value})},
    },
    // common.alert_fields_button,
    {
      id: 'line1' ,
      type: 'line',
      hiddenState: (fields) => {
        return !fields.card2_list1.value.length
      },
    },
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
