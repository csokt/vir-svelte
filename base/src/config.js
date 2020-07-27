const config = {
  version: '18.10.21',
  forms: {
    form1: {
      id: 'form1',
      name: 'Form 1',
      fields: [
        {
          id: 'field1',
          name: 'Field 1',
          type: 'text',
          attributes: {placeholder: 'Field 1'}
        },
        {
          id: 'field1',
          name: 'Field 1',
          type: 'text',
          attributes: {placeholder: 'readonly', readonly:true}
        },
        {
          id: 'field2',
          name: 'Field 2',
          type: 'number',
          attributes: {placeholder: 'Field 2'}
        }
      ],
      data: {}
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
      data: {}
    },
  }
}

export default config
