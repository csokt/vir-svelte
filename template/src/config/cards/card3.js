import api from '../api'
import common from '../common'

export default {
  id: 'card3',
  name: 'Card 3',
  elements: [
    { ...common.text_field },
    { ...common.qrtext_field },
    common.alert_fields_button,
    {
      id: 'card3_list1',
      name: 'Gyümölcsök',
      type: 'list',
      value: [
        {field1: 'alma', field2: 'jonatán'},
        {field1: 'korte', field2: 'vilmos'},
        {field1: 'szilva', field2: 'ringló'}
      ],
      labelid: 'field1',
      valueid: 'field2',
    }
  ],
}
