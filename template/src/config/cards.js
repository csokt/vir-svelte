import API from './api'
import common_elements from './common'

export default {
  home: {
    id: 'home',
    // name: 'Home Card',
    name: '',
    elements: [
      {
        id: 'page1_menu',
        name: 'Page 1',
        type: 'menu',
        path: '/page/page1',
      },
      {
        id: 'card1_menu',
        name: 'Card 1',
        type: 'menu',
        path: '/card/card1',
      },
      {
        id: 'card2_menu',
        name: 'Card 2',
        type: 'menu',
        path: '/card/card2',
      },
    ],
  },
  card1: {
    id: 'card1',
    name: 'Card 1',
    elements: [
      { ...common_elements.text_field },
      { ...common_elements.qrtext_field,
        onChange: (fields) => {fields.text_field = fields.qrtext_field}
      },
      { ...common_elements.number_field,
        onChange: (fields) => {fields.text_field = fields.number_field}
      },
      {
        id: 'select1',
        type: 'select',
        name: 'Select 1',
        value: '',
        items: [],
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
      },
      {
        id: 'select_button',
        name: 'Modify select items',
        type: 'button',
        value: null,
        onClick: (fields) => {fields.select1.items = [
            { value: 1, text: "Egy" },
            { value: 2, text: "Kettő" },
            { value: 3, text: "Három" },
        ]},
      },
      // common_elements.alert_fields_button,
      // {
      //   id: 'card1_list1',
      //   name: 'Gyümölcsök',
      //   type: 'list',
      //   value: [
      //     {field1: 'alma', field2: 'jonatán'},
      //     {field1: 'korte', field2: 'vilmos'},
      //     {field1: 'szilva', field2: 'ringló'}
      //   ],
      //   labelid: 'field1',
      //   valueid: 'field2',
      // }
    ],
  },
  card2: {
    id: 'card2',
    name: 'Card 2',
    elements: [
      {
        id: 'cikkszam',
        name: 'Cikkszám',
        type: 'text',
        value: '25383',
        attributes: {placeholder: 'Cikkszám'}
      },
      {
        id: 'button1',
        name: 'Keres',
        type: 'button',
        value: null,
        onClick: async (fields) => { const response = await API.get('/teszt/'+fields.cikkszam.value); fields.card2_list1.value = response.data; return 'loaded'},
      },
      // common_elements.alert_fields_button,
      {
        id: 'card2_list1',
        name: 'List 1',
        type: 'list',
        value: [],
        labelid: 'repo_name',
        valueid: 'name',
      }
    ],
  },
}
