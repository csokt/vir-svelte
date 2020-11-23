export default {
  id: 'home',
  name: '',
  elements: [
    {
      id: 'teszt',
      name: 'Teszt',
      type: 'menu',
      path: '/teszt',
    },
    {
      id: 'kodol',
      name: 'Kódolás',
      type: 'menu',
      path: '/menu1/kodol',
    },
    {
      id: 'atad',
      name: 'Átadás',
      type: 'menu',
      path: '/menu1/atad',
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
    },
    {
      id: 'napiteljesitmeny',
      name: 'Teljesítmény % (napi becsült)',
      type: 'menu',
      path: '/table/napiteljesitmeny',
    },
    {
      id: 'havilezartteljesitmeny',
      name: 'Teljesítmény % (havi lezárt)',
      type: 'menu',
      path: '/table/havilezartteljesitmeny',
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
