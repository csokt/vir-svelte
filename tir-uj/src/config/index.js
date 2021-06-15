import { debug } from '../stores.js'
import pages from './pages'
import cards from './cards/index'

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const config = {
  pages,
  cards,
}

function checkProp(prop, obj1, obj2=null) {
  if (obj2) {
    if (!obj2.hasOwnProperty(prop)) {
      if (debug) console.log(obj1.id, obj2.id, ':', prop, 'missing')
    }
  } else {
    if (!obj1.hasOwnProperty(prop)) {
      if (debug) console.log(obj1.id,':', prop, 'missing')
    }
  }
}

if (debug) console.log('CHECK CARDS')
for (const key in config.cards) {
  const card = config.cards[key]
  checkProp('name', card)
  checkProp('elements', card)
  card.fields = {}
  for (const element of card.elements) {
    card.fields[element.id] = element
    // Create states object from nameState shaped fields
    element.states = {}
    for (const prop in element) {
      const splits = prop.split('State')
      if (splits.length > 1) {
        element.states[splits[0]] = element[prop]
      }
    }
    // Check required properties
    checkProp('type', card, element)
    element.hidden = element.hidden || false
    if (['button', 'checkbox', 'text', 'qrtext'].includes(element.type)) {
      element.disabled = element.disabled || false
    }
    if (['text', 'qrtext'].includes(element.type)) {
      element.error = false
    }
    if (!['line'].includes(element.type)) {
      checkProp('name', card, element)
    }
    if (!['line', 'menu', 'button'].includes(element.type)) {
      checkProp('value', card, element)
    }
    if (element.type === 'menu') {
      checkProp('path', card, element)
    }
    if (element.type === 'select') {
      checkProp('items', card, element)
    }
  }
}

if (debug) console.log('CHECK PAGES')
for (const key in config.pages) {
  const page = config.pages[key]
  checkProp('name', page)
  checkProp('cardArray', page)
  page.cards = {}
  for (const card of page.cardArray) {
    // Create states object from nameState shaped fields
    card.states = {}
    for (const prop in card) {
      const splits = prop.split('State')
      if (splits.length > 1) {
        card.states[splits[0]] = card[prop]
      }
    }
    page.cards[card.cardid] = card
    card.card = config.cards[card.cardid]
    card.hidden = card.hidden || false
  }
}
// if (debug) console.log(config.pages)

export default config
