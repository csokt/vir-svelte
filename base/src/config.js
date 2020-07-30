import apisauce from 'apisauce'

const API = apisauce.create({
  baseURL: 'http://api2.szefo.local:34000/api2/',
  timeout: 5000
})

let formdata = {field1: '', field2: -1}
let list2_data = []

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const config = {
  version: '20.08.01',
  cards: {
    card1: {
      id: 'card1',
      name: 'Card 1',
      elements: [
        {
          id: 'field1a',
          name: 'Field 1a',
          type: 'text',
          valueid: 'field1',
          label: 'Első a',
          attributes: {placeholder: 'Field 1'}
        },
        {
          id: 'field1b',
          name: 'Field 1b',
          type: 'text',
          valueid: 'field1',
          label: 'Első b',
          attributes: {placeholder: 'readonly', readonly:true}
        },
        {
          id: 'field2',
          name: 'Field 2',
          type: 'number',
          valueid: 'field2',
          label: 'Második',
          attributes: {placeholder: 'Field 2'}
        },
        {
          id: 'button1',
          name: 'Button 1',
          type: 'button',
          label: 'Nyomógomb',
          disabled: (form) => {return !form.data.field2},
          onclick: (form) => {alert(JSON.stringify(form.data))},
        },
        {
          id: 'list1',
          name: 'List 1',
          type: 'list',
          // labelid: 'repo_name',
          // valueid: 'name',
          labelid: 'field1',
          valueid: 'field2',
        }
      ],
      data: {
        field1: '',
        field2: -1,
        list1: [
          {field1: 'alma', field2: 'jonatán'},
          {field1: 'korte', field2: 'vilmos'},
          {field1: 'szilva', field2: 'ringló'}
        ]
      }
    },
    card2: {
      id: 'card2',
      name: 'Card 2',
      elements: [
        {
          id: 'button1',
          name: 'Button 1',
          type: 'button',
          label: 'Load data',
          onclick: async (card) => { const response = await API.get('/teszt'); card.data.list1 = response.data; return 'loaded'},
        },
        {
          id: 'list1',
          name: 'List 1',
          type: 'list',
          labelid: 'repo_name',
          valueid: 'name',
        }
      ],
      data: {
        list1: []
      }
    },
  },
}

export default config
