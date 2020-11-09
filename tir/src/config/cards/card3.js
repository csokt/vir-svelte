import api from '../../api'
import common from '../common'

export default {
  id: 'card3',
  name: 'Card 3',
  elements: [
    { ...common.text_field },
    { ...common.qrtext_field },
    common.alert_fields_button,
    {
      id: 'line1' ,
      type: 'line'
    },
    {
      id: 'simpletable1',
      name: 'Gyümölcsök',
      type: 'simpletable',
      value: [
        {gyumolcs: 'alma', fajta: 'jonatán', szin: 'piros'},
        {gyumolcs: 'korte', fajta: 'vilmos', szin: 'sárga'},
        {gyumolcs: 'szilva', fajta: 'ringló', szin: 'kék'}
      ],
      selected: null,
    }
  ],
}
