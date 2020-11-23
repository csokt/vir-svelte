import common from '../common'

export default {
  id: 'tablazatok',
  name: '',
  elements: [
    common.alert_data_button,
    {
      id: 'kodolasok',
      name: 'Kódolások a munkalapon',
      type: 'menu',
      path: '/table/kodolasok',
    },
    {
      id: 'napikodolas',
      name: 'Mai napi kódolások',
      type: 'menu',
      path: '/table/napikodolas',
    },
    {
      id: 'havikodolas',
      name: 'Aktuális havi kódolások',
      type: 'menu',
      path: '/table/havikodolas',
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
      id: 'cikknormai',
      name: 'Konfekció normalapok',
      type: 'menu',
      path: '/table/cikknormai',
    },
    {
      id: 'varrodaleadas',
      name: 'Szeged varroda napi leadás',
      type: 'menu',
      path: '/table/varrodaleadas',
    },
    {
      id: 'aktualishetigyartasiterv',
      name: 'Gyártási terv - aktuális hét',
      type: 'menu',
      path: '/table/aktualishetigyartasiterv',
    },
    {
      id: 'kovetkezohetigyartasiterv',
      name: 'Gyártási terv - következő hét',
      type: 'menu',
      path: '/table/kovetkezohetigyartasiterv',
    },
  ],
}
