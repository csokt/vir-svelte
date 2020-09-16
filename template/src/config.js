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
  alert_data_button: {
    id: 'alert_data_button',
    name: 'Alert fields',
    type: 'button',
    value: null,
    attributes: {color: 'alert'},
    onclick: (fields) => {alert(JSON.stringify(fields))},
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
    },
    page1: {
      id: 'page1',
      name: 'Page 1',
      cards: [
        { cardid: 'card1' },
        { cardid: 'card2' }
      ],
    }
  },
  cards: {
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
        { ...common_elements.qrtext_field },
        { ...common_elements.number_field },
        {
          id: 'select1',
          type: 'select',
          name: 'Select 1',
          value: '',
          items: [
              { value: 1, text: "One" },
              { value: 2, text: "Two" },
              { value: 3, text: "Three" },
              { value: 4, text: "Four" },
          ],
        },
        {
          id: 'select_button',
          name: 'Modify select items',
          type: 'button',
          value: null,
          onclick: (fields) => {fields.select1.items = [
              { value: 1, text: "Egy" },
              { value: 2, text: "Kettő" },
              { value: 3, text: "Három" },
          ]},
        },
        common_elements.alert_data_button,
        {
          id: 'card1_list1',
          name: 'Gyümölcsök',
          type: 'list',
          value: [
            {field1: 'alma', field2: 'jonatán'},
            {field1: 'korte', field2: 'vilmos'},
            {field1: 'szilva', field2: 'ringló'}
          ],
          labelid: 'field1',
          valueid: 'field2',
        }
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
          onclick: async (fields) => { const response = await API.get('/teszt/'+fields.cikkszam.value); fields.card2_list1.value = response.data; return 'loaded'},
        },
        common_elements.alert_data_button,
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
  },
}

function checkProp(prop, obj1, obj2=null) {
  if (obj2) {
    if (!obj2.hasOwnProperty(prop)) {
      console.log(obj1.id, obj2.id, ':', prop, 'missing')
    }
  } else {
    if (!obj1.hasOwnProperty(prop)) {
      console.log(obj1.id,':', prop, 'missing')
    }
  }
}

console.log('CHECK PAGES')
for (const key in config.pages) {
  if (config.pages.hasOwnProperty(key)) {
    const page = config.pages[key]
    checkProp('name', page)
    checkProp('cards', page)
  }
}

console.log('CHECK CARDS')
for (const key in config.cards) {
  if (config.cards.hasOwnProperty(key)) {
    const card = config.cards[key]
    checkProp('name', card)
    checkProp('elements', card)
    card.fields = {}
    for (const element of card.elements) {
      card.fields[element.id] = element
      checkProp('name', card, element)
      checkProp('type', card, element)
      if (!['menu'].includes(element.type)) {
        checkProp('value', card, element)
      }
      if (element.type === 'list') {
        checkProp('labelid', card, element)
        checkProp('valueid', card, element)
      }
      if (element.type === 'select') {
        checkProp('items', card, element)
      }
    }
  }
}

export default config
