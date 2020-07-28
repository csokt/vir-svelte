let formdata = {field1: '', field2: -1}

const config = {
  version: '18.10.21',
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
          label: 'Alaphelyzet',
          onclick: (form) => {form.data.field2=0},
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
