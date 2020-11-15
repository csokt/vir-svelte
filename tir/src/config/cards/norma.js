import api from '../../api'
import common from '../common'

export default {
  id: 'norma',
  name: '',
  onMount: (fields) => {},
  elements: [
    {
      id: 'kezdIdo',
      name: 'Munkaidő kezdete',
      type: 'time',
      value: null,
    },
    {
      id: 'aktIdo',
      name: 'Aktuális idő',
      type: 'text',
      value: '',
      attributes: {readonly: true}
    },
    {
      id: 'elteltPerc',
      name: 'Eltelt idő (perc)',
      type: 'text',
      value: '',
      attributes: {readonly: true}
    },
    {
      id: 'osszesNormaperc',
      name: 'Összes normaperc',
      type: 'text',
      value: '',
      attributes: {readonly: true}
    },
    {
      id: 'teljesitmeny',
      name: 'Teljesítmény %',
      type: 'text',
      value: '',
      attributes: {readonly: true}
    },
  ],
}
