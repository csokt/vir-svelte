import common from '../common'
import { data } from '../../stores.js'

export default {
  id: 'munkalap',
  name: '',
  // onMount: (fields) => {
  //   fields.munkalap.value = data.munkalap
  // },
  elements: [
    common.munkalapazonosito,
    common.kartoninfo,
    common.munkalap,
  ],
}
