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
      rowClass: (row) => {return row.szin === 'piros' ? 'text-error-900' : null},
      columns: [
        { label: 'Gyümölcs',  field: 'gyumolcs' },
        { label: 'Fajta',     field: 'fajta' },
        { label: 'Szín',      field: 'szin' },
      ],
      value: [
        {gyumolcs: 'alma', fajta: 'jonatán', szin: 'piros'},
        {gyumolcs: 'körte', fajta: 'vilmos', szin: 'sárga'},
        {gyumolcs: 'szőlő', fajta: 'szlanka', szin: 'piros'},
        {gyumolcs: 'szilva', fajta: 'ringló', szin: 'kék'}
      ],
    }
  ],
}
