export default {
  text_field: {
    id: 'text_field',
    name: 'Text field',
    type: 'text',
    value: '',
    // attributes: {placeholder: 'Text field'}
  },
  qrtext_field: {
    id: 'qrtext_field',
    name: 'QR text field',
    type: 'qrtext',
    value: '',
    // attributes: {placeholder: 'QR text field'}
  },
  number_field: {
    id: 'number_field',
    name: 'Number field',
    type: 'text',
    value: '',
    attributes: {type: 'number', placeholder: 'Number field'}
  },
  alert_fields_button: {
    id: 'alert_fields_button',
    name: 'Alert fields',
    type: 'button',
    value: null,
    attributes: {color: 'alert'},
    onClick: (fields) => {alert(JSON.stringify(fields))},
  },
}
