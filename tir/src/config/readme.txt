Svelte - smelte - deklaratív fejlesztő környezet
================================================

Alkotóelemek: Page[] -> Card[] -> elements
Mindegyik elemnek van azonosítója (id) és neve (name).
Két Card neve rögzített: 'home' és 'login'.
Egy Page-en lehet egy vagy több Card, egy Card-on egy vagy több element.
Az element-nek mindig van típusa (type), ezek a következők:

menu:
  path: az új oldal címe

line:
  class: 'pt-2' default
  hidden: számított attribútum, alapértelmezetten false.
  hiddenState(fields): a hidden státuszt állítja be, csak szinkron lehet, bool visszatérő értékkel.

button:
  onClick(): kattintásra ezt a függvényt hívja meg, lehet async is.
  attributes{}: Minden itt megadott attribútum át lesz adva a komponensnek.
  disabled: számított attribútum, alapértelmezetten false.
  disabledState(fields): a disabled státuszt állítja be, csak szinkron lehet, bool visszatérő értékkel.
  hidden: számított attribútum, alapértelmezetten false.
  hiddenState(fields): a hidden státuszt állítja be, csak szinkron lehet, bool visszatérő értékkel.

buttongroup:
  buttons[button]

checkbox:
  label: megjelenítendő név
  value: boolean
  attributes{}: Minden itt megadott attribútum át lesz adva a komponensnek.
  disabled: számított attribútum, alapértelmezetten false.
  disabledState(fields): a disabled státuszt állítja be, csak szinkron lehet, bool visszatérő értékkel.
  hidden: számított attribútum, alapértelmezetten false.
  hiddenState(fields): a hidden státuszt állítja be, csak szinkron lehet, bool visszatérő értékkel.
  onChange(): tartalom megváltozásakor ezt a függvényt hívja meg, lehet async is.

text:
  label: megjelenítendő név
  value: string
  attributes{}: Minden itt megadott attribútum át lesz adva a komponensnek.
  disabled: számított attribútum, alapértelmezetten false.
  disabledState(fields): a disabled státuszt állítja be, csak szinkron lehet, bool visszatérő értékkel.
  readonly: számított attribútum, alapértelmezetten undefined.
  readonlyState(fields): a readonly státuszt állítja be, csak szinkron lehet, null|true visszatérő értékkel.
  error: számított attribútum, alapértelmezetten false.
  errorState(fields): a error státuszt állítja be, csak szinkron lehet, false|string visszatérő értékkel.
  hidden: számított attribútum, alapértelmezetten false.
  hiddenState(fields): a hidden státuszt állítja be, csak szinkron lehet, bool visszatérő értékkel.
  onChange(): tartalom megváltozásakor ezt a függvényt hívja meg, lehet async is.

qrtext:
  Ugyanaz mint a text, csak lehetőség van QR kód beolvasására is.

tags:
  placeholder:
  value: [string]
  disabled: számított attribútum, alapértelmezetten false.
  disabledState(fields): a disabled státuszt állítja be, csak szinkron lehet, bool visszatérő értékkel.
  onChange(): tartalom megváltozásakor ezt a függvényt hívja meg, lehet async is.

select:
  label: megjelenítendő név
  value: string
  items[{value, text}]: ezekből lehet válogatni.
  attributes{}: Minden itt megadott attribútum át lesz adva a komponensnek.
  onChange(): tartalom megváltozásakor ezt a függvényt hívja meg, lehet async is.

simpleobject:
  value: javascript object
  fields[]: { label, field }

simpletable:
  value[]: táblázat adatok
  selected: kiválasztott táblázat sor
  rowClass(): (row) => {return <kalkulált class>}
  columns[]: { label, field, class }
  onSelect(): sor kiválasztáskor ezt a függvényt hívja meg, lehet async is.

simplelist:
  value[]: lista adatok
  selected: kiválasztott lista sor
  rowClass(): (row) => {return <kalkulált class>};    'py-2' default
  rows[]: { label, field, class }
  onSelect(): sor kiválasztáskor ezt a függvényt hívja meg, lehet async is.
