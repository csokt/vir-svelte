Svelte - smelte - deklaratív fejlesztő környezet
================================================

Alkotóelemek: Page[] -> Card[] -> elements
Mindegyik elemnek van azonosítója (id) és neve (name).
Két Card neve rögzített: 'home' és 'login'.
Egy Page-en lehet egy vagy több Card, egy Card-on egy vagy több element.
Az element-nek mindig van típusa (type), ezek a következők:

menu:
  path: az új oldal címe

list:
  value[]: megjelenítendő lista
  labelid: label mező neve
  valueid: value mező neve

button:
  onClick(): kattintásra ezt a függvényt hívja meg, lehet async is.
  attributes{}: Minden itt megadott attribútum át lesz adva a komponensnek.
  disabledState(): a disabled státuszt álltja be, csak szinkron lehet, bool visszatérő értékkel.
  disabled: számított attribútum, alapértelmezetten false.

buttongroup:
  buttons[button]

checkbox:
  label: megjelenítendő név
  value: boolean
  attributes{}: Minden itt megadott attribútum át lesz adva a komponensnek.
  disabledState(): a disabled státuszt álltja be, csak szinkron lehet, bool visszatérő értékkel.
  disabled: számított attribútum, alapértelmezetten false.
  onChange(): tartalom megváltozásakor ezt a függvényt hívja meg, lehet async is.

text:
  label: megjelenítendő név
  value: string
  attributes{}: Minden itt megadott attribútum át lesz adva a komponensnek.
  disabledState(): a disabled státuszt álltja be, csak szinkron lehet, bool visszatérő értékkel.
  disabled: számított attribútum, alapértelmezetten false.
  onChange(): tartalom megváltozásakor ezt a függvényt hívja meg, lehet async is.

qrtext:
  Ugyanaz mint a text, csak lehetőség van QR kód beolvasására is.

select:
  label: megjelenítendő név
  value: string
  items[{value, text}]: ezekből lehet válogatni.
  attributes{}: Minden itt megadott attribútum át lesz adva a komponensnek.
  onChange(): tartalom megváltozásakor ezt a függvényt hívja meg, lehet async is.
