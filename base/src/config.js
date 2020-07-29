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
  version: '18.10.21',
  lists:{
    list1: {
      id: 'list1',
      name: 'List 1',
      labelid: 'field1',
      valueid: 'field2',
      data: [
        {field1: 'alma', field2: 'jonatán'},
        {field1: 'korte', field2: 'vilmos'},
        {field1: 'szilva', field2: 'ringló'}
      ]
    },
    list2: {
      id: 'list2',
      name: 'List 2',
      labelid: 'repo_name',
      valueid: 'name',
      data: []
    }
  },
  forms: {
    form1: {
      id: 'form1',
      name: 'Form 1',
      fields: [
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
          id: 'button2',
          name: 'Button 2',
          type: 'button',
          label: 'Teszt',
          // label: 'Alaphelyzet',
          // onclick: async (form) => {await(delay(3000)); form.data.field2=1; return 'success'},
          onclick: async (form) => { const response = await API.get('/teszt'); config.lists.list2.data = response.data; return 'loaded'},
        }
      ],
      data: formdata
    },
    form2: {
      id: 'form2',
      name: 'Form 2',
      fields: [
        {
          id: 'field1',
          name: 'Field 1',
          type: 'text',
          attributes: {placeholder: 'Field 1'}
        },
        {
          id: 'field2',
          name: 'Field 2',
          type: 'number',
          attributes: {placeholder: 'Field 2'}
        }
      ],
      data: formdata
    },
  }
}

export default config
