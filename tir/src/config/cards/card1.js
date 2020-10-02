import api from '../api'
import common from '../common'

export default {
  id: 'card1',
  name: 'Card 1',
  onMount: (fields) => {fields.select1.items = [
      { value: 0, text: "Zero" },
      { value: 1, text: "One" },
      { value: 2, text: "Two" },
      { value: 3, text: "Three" },
      { value: 4, text: "Four" },
      { value: 5, text: "Five" },
      { value: 6, text: "Six" },
      { value: 7, text: "Seven" },
      { value: 8, text: "Eight" },
      { value: 9, text: "Nine" },
  ]},
  elements: [
    { ...common.text_field },
    { ...common.qrtext_field,
      onChange: (fields) => {fields.text_field.value = fields.qrtext_field.value}
    },
    { ...common.number_field,
      onChange: (fields) => {fields.text_field.value = fields.number_field.value}
    },
    {
      id: 'select1',
      type: 'select',
      name: 'Select 1',
      value: '',
      items: [],
    },
    {
      id: 'select_button',
      name: 'Modify select items',
      type: 'button',
      onClick: (fields) => {fields.select1.items = [
          { value: 1, text: "Egy" },
          { value: 2, text: "Kettő" },
          { value: 3, text: "Három" },
      ]},
    },
  ],
}
