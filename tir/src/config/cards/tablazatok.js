import common from '../common'
import { debug, data } from '../../stores.js'

export default {
  id: 'tablazatok',
  name: '',
  elements: [
    {
      id: 'havikodolas',
      name: 'Aktuális havi kódolások',
      type: 'menu',
      path: '/table/havikodolas',
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
      id: 'utovasaloleadas',
      name: 'Szeged utóvasaló napi leadás',
      type: 'menu',
      path: '/table/utovasaloleadas',
      hiddenState: (fields) => { return !['meo'].includes(data.user.role) }
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
    {
      id: 'muveletekosszegzese',
      name: 'Bekódolt műveletek összegzése',
      type: 'menu',
      path: '/table/muveletekosszegzese',
      hiddenState: (fields) => { return !['varrodavezető'].includes(data.user.role) }
    },
    common.munkalapazonosito,
    common.kartoninfo,
    {
      id: 'kodolasok',
      name: 'Kódolások a munkalapon',
      type: 'menu',
      path: '/table/kodolasok',
      // hiddenState: (fields) => { return !['szabó',  'logisztikus',  'varró',  'varró2',  'kódoló',  'meo',  'varrodavezető'].includes(data.user.role) }
      hiddenState: (fields) => { return !fields.kartoninfo.value }
    },
    common.cikkszam,
    common.cikkmegnevezes,
    {
      id: 'cikknormai',
      name: 'Konfekció normalapok',
      type: 'menu',
      path: '/table/cikknormai',
      // hiddenState: (fields) => { return !['szabó',  'logisztikus',  'varró',  'varró2',  'kódoló',  'meo',  'varrodavezető'].includes(data.user.role) }
      hiddenState: (fields) => { return !fields.cikkmegnevezes.value }
    },
  ],
}
