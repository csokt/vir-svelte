export default {
  home: {
    id: 'home',
    name: 'Termelés Információs Rend.',
    cardArray: [
      {
        cardid: 'tirlogin',
        // érvényes QR kód megadásakor
        onEvent: (cards, params) => {cards.home.card.fields.fullname.value = cards.tirlogin.card.fields.fullname.value},
        hiddenState: (cards) => { return !!cards.tirlogin.card.fields.fullname.value }
      },
      {
        cardid: 'home',
        // // logout button kattintásakor
        // onEvent: (cards, params) => {
        //   if (cards.home.card.fields.fullname.value) return
        //   cards.tirlogin.card.fields.qrcode.value = ''
        //   cards.tirlogin.card.fields.fullname.value = ''
        // },
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
      { cardid: 'atad' },
    ],
  },
  munkalap: {
    id: 'munkalap',
    name: 'Munkalap',
    cardArray: [
      { cardid: 'munkalap' },
    ],
  },
  seasearch: {
    id: 'seasearch',
    name: 'Dokumentációk',
    cardArray: [
      { cardid: 'seasearch' },
    ],
  },
  norma: {
    id: 'norma',
    name: 'Mai teljesítmény százalék',
    cardArray: [
      { cardid: 'norma' },
    ],
  },
  tablazatok: {
    id: 'tablazatok',
    name: 'Táblázatok',
    cardArray: [
      { cardid: 'tablazatok' },
    ],
  },
}
