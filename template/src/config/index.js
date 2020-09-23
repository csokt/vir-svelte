import pages from './pages'
import cards from './cards/index'

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const config = {
  version: '20.08.01',
  pages,
  cards,
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
      if (element.type === 'button') {
        element.disabled = element.disabled || false
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
