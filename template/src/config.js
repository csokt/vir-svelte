import apisauce from 'apisauce'

const API = apisauce.create({
  // baseURL: '/api2/',
  baseURL: 'http://api2.szefo.local:34000/api2/',
  timeout: 5000
})

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const common_elements = {
  page1_menu: {
    id: 'page1_menu',
    name: 'Page 1',
    type: 'menu',
    path: '/page/page1',
  },
  card1_menu: {
    id: 'card1_menu',
    name: 'Card 1',
    type: 'menu',
    path: '/card/card1',
  },
  card2_menu: {
    id: 'card2_menu',
    name: 'Card 2',
    type: 'menu',
    path: '/card/card2',
  },
  text_field: {
    id: 'text_field',
    name: 'Text field',
    type: 'text',
    // attributes: {placeholder: 'Text field'}
  },
  number_field: {
    id: 'number_field',
    name: 'Number field',
    type: 'text',
    attributes: {type: 'number', placeholder: 'Number field'}
  },
  alert_data_button: {
    id: 'alert_data_button',
    name: 'Alert data',
    type: 'button',
    attributes: {color: 'alert'},
    onclick: (data) => {alert(JSON.stringify(data))},
  },
}

const config = {
  version: '20.08.01',
  pages: {
    home: {
      id: 'home',
      name: 'Home!',
      cards: [
        { cardid: 'home' },
      ],
      data: {}
    },
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
    home: {
      id: 'home',
      // name: 'Home Card',
      name: '',
      elements: [
        common_elements.page1_menu,
        common_elements.card1_menu,
        common_elements.card2_menu,
      ],
      data: {}
    },
    card1: {
      id: 'card1',
      name: 'Card 1',
      elements: [
        common_elements.text_field,
        common_elements.number_field,
        {
          id: 'select1',
          type: 'select',
          name: 'Select 1',
          // items: [
          //     { value: 1, text: "One" },
          //     { value: 2, text: "Two" },
          //     { value: 3, text: "Three" },
          //     { value: 4, text: "Four" },
          // ],
        },
        {
          id: 'select_button',
          name: 'Modify select items',
          type: 'button',
          onclick: (data) => {data.select1.items = [
              { value: 1, text: "Egy" },
              { value: 2, text: "Kettő" },
              { value: 3, text: "Három" },
          ]},
        },
        common_elements.alert_data_button,
        // {
        //   id: 'card1_list1',
        //   name: 'Gyümölcsök',
        //   type: 'list',
        //   labelid: 'field1',
        //   valueid: 'field2',
        // }
      ],
      data: {
        text_field: '',
        select1: {
          value: '',
          items: [
              { value: 1, text: "One" },
              { value: 2, text: "Two" },
              { value: 3, text: "Three" },
              { value: 4, text: "Four" },
          ],
        },
        // card1_list1: [
        //   {field1: 'alma', field2: 'jonatán'},
        //   {field1: 'korte', field2: 'vilmos'},
        //   {field1: 'szilva', field2: 'ringló'}
        // ]
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
        common_elements.alert_data_button,
        {
          id: 'card2_list1',
          name: 'List 1',
          type: 'list',
          labelid: 'repo_name',
          valueid: 'name',
        }
      ],
      data: {
        text_field: '',
        cikkszam: '25181',
        card2_list1: []
      }
    },
  },
}

export default config
