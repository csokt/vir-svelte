import apisauce from 'apisauce'

const API = apisauce.create({
  // baseURL: '/api2/',
  baseURL: 'http://api2.szefo.local:34000/api2/',
  timeout: 5000
})

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const elements = {
  button_menu: {
    id: 'button_menu',
    name: 'Go to the Button page',
    type: 'menu',
    path: '/button',
  },
  input_menu: {
    id: 'input_menu',
    name: 'Go to the Input page',
    type: 'menu',
    path: '/input',
  },
  text_field: {
    id: 'text_field',
    name: 'Text field',
    type: 'text',
    attributes: {placeholder: 'Text field'}
  },
  number_field: {
    id: 'number_field',
    name: 'Number field',
    type: 'number',
    attributes: {placeholder: 'Number field'}
  },
  alert_data_button: {
    id: 'alert_data_button',
    name: 'Alert data',
    type: 'button',
    onclick: (data) => {alert(JSON.stringify(data))},
  },
}

const config = {
  version: '20.08.01',
  pages: {
    page1: {
      id: 'page1',
      name: 'Page 1',
      cards: [
        { cardid: 'card1' },
        { cardid: 'card2' }
      ],
      data: {
        card1_list1: [],
        card2_list1: []
      }
    }
  },
  cards: {
    card1: {
      id: 'card1',
      name: 'Card 1',
      elements: [
        elements.button_menu,
        elements.input_menu,
        elements.text_field,
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
        elements.alert_data_button,
        {
          id: 'card1_list1',
          name: 'Gyümölcsök',
          type: 'list',
          labelid: 'field1',
          valueid: 'field2',
        }
      ],
      data: {
        card1_list1: [
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
          id: 'cikkszam',
          name: 'Cikkszám',
          type: 'text',
          attributes: {placeholder: 'Cikkszám'}
        },
        {
          id: 'button1',
          name: 'Keres',
          type: 'button',
          onclick: async (data) => { const response = await API.get('/teszt/'+data.cikkszam); data.card2_list1 = response.data; return 'loaded'},
          // onclick: async (data) => { const response = await API.get('/teszt/'+data.text_field); data.card2_list1 = response.data; return 'loaded'},
        },
        {
          id: 'card2_list1',
          name: 'List 1',
          type: 'list',
          labelid: 'repo_name',
          valueid: 'name',
        }
      ],
      data: {
        cikkszam: '25162',
        card2_list1: []
      }
    },
  },
}

export default config
