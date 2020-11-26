import { debug, data } from '../../stores.js'

export default {
  id: 'tablazatok',
  name: '',
  elements: [
    {
      id: 'kodolasok',
      name: 'Kódolások a munkalapon',
      type: 'menu',
      path: '/table/kodolasok',
      hiddenState: (fields) => { return !['szabó',  'logisztikus',  'varró',  'varró2',  'kódoló',  'meo',  'varrodavezető'].includes(data.user.role) }
    },
    {
      id: 'napikodolas',
      name: 'Mai napi kódolások',
      type: 'menu',
      path: '/table/napikodolas',
      hiddenState: (fields) => { return !['szabó',  'logisztikus',  'varró',  'varró2', 'varrodavezető'].includes(data.user.role) }
    },
    {
      id: 'mitkodoltamma',
      name: 'Mit kódoltam ma?',
      type: 'menu',
      path: '/table/mitkodoltamma',
      hiddenState: (fields) => { return !['kódoló'].includes(data.user.role) }
    },
    {
      id: 'havikodolas',
      name: 'Aktuális havi kódolások',
      type: 'menu',
      path: '/table/havikodolas',
      hiddenState: (fields) => { return !['szabó',  'logisztikus',  'varró',  'varró2', 'varrodavezető'].includes(data.user.role) }
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
      id: 'cikknormai',
      name: 'Konfekció normalapok',
      type: 'menu',
      path: '/table/cikknormai',
      hiddenState: (fields) => { return !['szabó',  'logisztikus',  'varró',  'varró2',  'kódoló',  'meo',  'varrodavezető'].includes(data.user.role) }
    },
    {
      id: 'szabaszatleadas',
      name: 'Szeged szabászat napi leadás',
      type: 'menu',
      path: '/table/szabaszatleadas',
      hiddenState: (fields) => { return !['szabó',  'logisztikus', 'meo',  'varrodavezető'].includes(data.user.role) }
    },
    {
      id: 'varrodaleadas',
      name: 'Szeged varroda napi leadás',
      type: 'menu',
      path: '/table/varrodaleadas',
      hiddenState: (fields) => { return !['varró', 'meo', 'varrodavezető'].includes(data.user.role) }
    },
    {
      id: 'aktualishetigyartasiterv',
      name: 'Gyártási terv - aktuális hét',
      type: 'menu',
      path: '/table/aktualishetigyartasiterv',
      hiddenState: (fields) => { return !['szabó',  'logisztikus',  'varró',  'meo',  'varrodavezető'].includes(data.user.role) }
    },
    {
      id: 'kovetkezohetigyartasiterv',
      name: 'Gyártási terv - következő hét',
      type: 'menu',
      path: '/table/kovetkezohetigyartasiterv',
      hiddenState: (fields) => { return !['szabó',  'logisztikus',  'varró',  'meo',  'varrodavezető'].includes(data.user.role) }
    },
  ],
}
