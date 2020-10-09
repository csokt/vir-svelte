export default {
  home: {
    id: 'home',
    name: 'Termelés Információs Rend.',
    cardArray: [
      {
        cardid: 'tirlogin',
        onChange: (cards) => {cards.home.card.fields.fullname.value = cards.tirlogin.card.fields.fullname.value},
        hiddenState: (cards) => { return !!cards.tirlogin.card.fields.fullname.value }
      },
      {
        cardid: 'home',
        onChange: (cards) => {
          if (cards.home.card.fields.fullname.value) return
          cards.tirlogin.card.fields.qrcode.value = ''
          cards.tirlogin.card.fields.fullname.value = ''
        },
        hiddenState: (cards) => { return !cards.tirlogin.card.fields.fullname.value }
      },
    ],
  },
  kodol: {
    id: 'kodol',
    name: 'Teljesítmény kódolás',
    cardArray: [
      { cardid: 'kodol' },
    ],
  },
  atad: {
    id: 'atad',
    name: 'Átadás',
    cardArray: [
      { cardid: 'card1' },
      { cardid: 'card2' }
    ],
  },
  munkalap: {
    id: 'munkalap',
    name: 'Munkalap',
    cardArray: [
      { cardid: 'card1' },
    ],
  },
  seasearch: {
    id: 'seasearch',
    name: 'Dokumentációk',
    cardArray: [
      { cardid: 'card1' },
    ],
  },
  norma: {
    id: 'norma',
    name: 'Mai teljesítmény %',
    cardArray: [
      { cardid: 'card1' },
      { cardid: 'card2' },
    ],
  },
  tablazatok: {
    id: 'tablazatok',
    name: 'Táblázatok',
    cardArray: [
      { cardid: 'card1' },
      { cardid: 'card2' },
      { cardid: 'card3' },
    ],
  },
}
