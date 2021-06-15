import { debug, data } from '../../stores.js'

export default {
  id: 'home',
  name: '',
  elements: [
    {
      id: 'kodol',
      name: 'Kódolás',
      type: 'menu',
      path: '/menu1/kodol',
      hiddenState: (fields) => { return ['kötő', 'meo'].includes(data.user.role) }
    },
    {
      id: 'atad',
      name: 'Átadás',
      type: 'menu',
      path: '/menu1/atad',
      hiddenState: (fields) => { return !['kódoló'].includes(data.user.role) }
    },
    {
      id: 'munkalap',
      name: 'Munkalap információk',
      type: 'menu',
      path: '/menu1/munkalap',
    },
    {
      id: 'seasearch',
      name: 'Dokumentációk',
      type: 'menu',
      path: '/menu1/seasearch',
    },
    {
      id: 'norma',
      name: 'Mai teljesítmény %',
      type: 'menu',
      path: '/menu1/norma',
      hiddenState: (fields) => { return !['varró', 'varró2', 'szabó'].includes(data.user.role) }
    },
    {
      id: 'napiteljesitmeny',
      name: 'Teljesítmény % (napi becsült)',
      type: 'menu',
      path: '/table/napiteljesitmeny',
      hiddenState: (fields) => { return !['szabó',  'logisztikus',  'varró',  'varró2', 'varrodavezető'].includes(data.user.role) }
    },
    {
      id: 'havilezartteljesitmeny',
      name: 'Teljesítmény % (havi lezárt)',
      type: 'menu',
      path: '/table/havilezartteljesitmeny',
      hiddenState: (fields) => { return !['szabó',  'logisztikus',  'varró',  'varró2', 'varrodavezető'].includes(data.user.role) }
    },
    {
      id: 'tablazatok',
      name: 'Táblázatok',
      type: 'menu',
      path: '/menu1/tablazatok',
    },
    {
      id: 'fullname',
      name: 'Dolgozó',
      type: 'text',
      value: '',
      attributes: {readonly: true}
    },
    {
      id: 'logout',
      name: 'Másik dolgozó választása',
      type: 'button',
      onClick: (fields) => { fields.fullname.value = '' },
    },
  ],
}
