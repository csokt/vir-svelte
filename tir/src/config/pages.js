export default {
  home: {
    id: 'home',
    name: 'Termelés Információs Rend.',
    cardArray: [
      {
        cardid: 'tirlogin',
        // onChange: (cards) => {console.log(cards.tirlogin.card.fields.qrcode.value)},
        onChange: (cards) => {console.log(cards)},
        hiddenState: (cards) => { return !!cards.tirlogin.card.fields.fullname.value }
      },
      {
        cardid: 'home',
        hiddenState: (cards) => { return !cards.tirlogin.card.fields.fullname.value }
      },
    ],
  },
  kodol: {
    id: 'kodol',
    name: 'Kódolás',
    cardArray: [
      { cardid: 'card1' },
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
