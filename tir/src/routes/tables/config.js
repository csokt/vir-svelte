'use strict';

const yaml = require('js-yaml')
let configYaml = `

views:
###############################################################################  Tablet  ###
-
  id:         kodolasok
  database:   SzefoModulKeszlet
  name:       monitor_kodolasok
  label:      Kódolások a munkalapon
  device:     tablet
  roles:
  - szabó
  - logisztikus
  - varró
  - varró2
  - kódoló
  - meo
  - varrodavezető
  order:      '[Üzemkód], [Művelet], [Kódolás ideje]'
  head_after: 15
  limit:      500
  fields:
  - name:     Üzemkód
    label:    Üzem kód
    type:     number
#    filter:   egyenlő
#    default:  uzem
  - name:     Üzemnév
  - name:     Munkalap kód
    type:     number
    filter:   egyenlő
    default:  munkalapazonosito
  - name:     Cikk
  - name:     IT
  - name:     Diszpó
  - name:     Szín
  - name:     Csomag
  - name:     Méret
  - name:     Darab
  - name:     Művelet
  - name:     Művelet név
  - name:     Norma perc
  - name:     Dolgozó név
  - name:     Kódolás ideje
  - name:     Kódoló

-
  id:         napikodolas
  database:   SzefoModulKeszlet
  name:       monitor_napikodolas
  label:      Mai napi kódolások
  device:     tablet
  roles:
  - szabó
  - logisztikus
  - varró
  - varró2
  - varrodavezető
  refresh:    60
  order:      '[Kódolás ideje] DESC'
  head_after: 15
  limit:      100
#  tablefontsize:  14px
#  headfontsize:   10px
#  bodyfontsize:   10px
  sum:
  - Összes normaperc
  fields:
  - name:     Dolgozó kód
    type:     number
    filter:   egyenlő
    default:  belepokod
    readonly: true
  - name:     Cikkszám
    label:    Cikk
    filter:   egyenlő
    search:   cikkszam
#    fontsize: 24px
  - name:     IT
    filter:   egyenlő
  - name:     Diszpó
  - name:     Szín
  - name:     csomag
    label:    Csom.
  - name:     Méret
  - name:     darab
  - name:     Művelet
  - name:     Művelet név
  - name:     Normaperc
    label:    Norma perc
  - name:     Összes normaperc
  - name:     Megjegyzés
  - name:     Kódoló
  - name:     Kódolás ideje

-
  id:         havikodolas
  database:   SzefoModulKeszlet
  name:       monitor_havikodolas
  label:      Aktuális havi kódolások
  device:     tablet
  roles:
  - szabó
  - logisztikus
  - varró
  - varró2
  - varrodavezető
  order:      '[Kódolás ideje] DESC'
  head_after: 15
  limit:      1000
  fields:
  - name:     Dolgozó kód
    type:     number
    filter:   egyenlő
    default:  belepokod
    readonly: true
  - name:     Cikkszám
    label:    Cikk
    filter:   egyenlő
    search:   cikkszam
  - name:     IT
    filter:   egyenlő
  - name:     Diszpó
  - name:     Szín
  - name:     csomag
    label:    Csom.
  - name:     Méret
  - name:     darab
  - name:     Művelet
  - name:     Művelet név
  - name:     Normaperc
    label:    Norma perc
  - name:     Megjegyzés
  - name:     Kódoló
  - name:     Kódolás ideje

-
  id:         napiteljesitmeny
  database:   SzefoModulKeszlet
  name:       monitor_napiteljesitmeny
  label:      Teljesítmény % (napi becsült)
  device:     tablet
  roles:
  - szabó
  - logisztikus
  - varró
  - varró2
  - varrodavezető
  order:      '[Dátum] desc'
  head_after: 15
  limit:      300
  fields:
  - name:     Dolgozó kód
    type:     number
    filter:   egyenlő
    default:  belepokod
    readonly: true
  - name:     Dátum
  - name:     Teljesítmény %

-
  id:         havilezartteljesitmeny
  database:   SzefoModulKeszlet
  name:       monitor_havilezartteljesitmeny
  label:      Teljesítmény % (havi lezárt)
  device:     tablet
  roles:
  - szabó
  - logisztikus
  - varró
  - varró2
  - varrodavezető
  order:      '[Év] desc, [Hónap] desc'
  head_after: 15
  limit:      60
  fields:
  - name:     Dolgozó kód
    type:     number
    filter:   egyenlő
    default:  belepokod
    readonly: true
  - name:     Dátum
  - name:     Teljesítmény %

-
  id:         cikknormai
  database:   SzefoModulKeszlet
  name:       monitor_cikknormai
  label:      Konfekció normalapok
  device:     tablet
  roles:
  - admin
  - szabó
  - logisztikus
  - varró
  - varró2
  - kódoló
  - meo
  - varrodavezető
  order:      Műveletkód
  head_after: 15
  limit:      500
  fields:
  - name:     Cikkszám
    label:    Cikk
    filter:   egyenlő
    default:  cikkszam
    search:   cikkszam
  - name:     Műveletkód
    type:     number
    filter:   egyenlő
  - name:     Megnevezés
  - name:     Normaperc
    label:    Norma perc
  - name:     Előkészítő
  - name:     Normatípus
  - name:     Gép

-
  id:         szabaszatleadas_tablet
  database:   SzefoModulKeszlet
  name:       monitor_szegedszabaszatleadas
  label:      Szeged szabászat napi leadás
  device:     tablet
  roles:
  - admin
  - szabó
  - logisztikus
  - meo
  - varrodavezető
  where:
  order:      Cikkszám
  head_after: 15
  limit:      100
  sum:
  - Rendelt db
  - Előzőleg leadott db
  - Tervezett db
  - Leadott db
  - Eltérés a tervtől
  - Hibák száma
  - Hátralék
  fields:
  - name:     Cikkszám
    label:    Cikk
    search:   cikkszam
  - name:     IT
  - name:     Megnevezés
  - name:     Megrendelő
  - name:     Rendelt db
    label:    Rendelt
  - name:     Előzőleg leadott db
    label:    Előzőleg leadott
  - name:     Hátralék
    label:    Gyártandó
    positive: red
    zero:     green
    negative: green
  - name:     Tervezett db
    label:    Mai terv
  - name:     Leadott db
    label:    Ma leadott
  - name:     Eltérés a tervtől
    label:    Eltérés
    positive: green
    zero:     green
    negative: red
  - name:     Hibák száma
    label:    Hibák

-
  id:         varrodaleadas_tablet
  database:   SzefoModulKeszlet
  name:       monitor_szegedvarrodaleadas
  label:      Szeged varroda napi leadás
  device:     tablet
  roles:
  - admin
  - varró
  - meo
  - varrodavezető
  where:
  order:      Cikkszám
  head_after: 15
  limit:      100
  sum:
  - Rendelt db
  - Előzőleg leadott db
  - Tervezett db
  - Leadott db
  - Eltérés a tervtől
  - Hibák száma
  - Hátralék
  fields:
  - name:     Cikkszám
    label:    Cikk
    search:   cikkszam
  - name:     IT
  - name:     Megnevezés
  - name:     Megrendelő
  - name:     Rendelt db
    label:    Rendelt
  - name:     Előzőleg leadott db
    label:    Előzőleg leadott
  - name:     Hátralék
    label:    Gyártandó
    positive: red
    zero:     green
    negative: green
  - name:     Tervezett db
    label:    Mai terv
  - name:     Leadott db
    label:    Ma leadott
  - name:     Eltérés a tervtől
    label:    Eltérés
    positive: green
    zero:     green
    negative: red
  - name:     Hibák száma
    label:    Hibák

-
  id:         aktualishetigyartasiterv_tablet
  database:   SzefoModulKeszlet
  name:       monitor_aktualishetigyartasiterv
  label:      Gyártási terv - aktuális hét
  device:     tablet
  roles:
  - admin
  - szabó
  - logisztikus
  - varró
  - meo
  - varrodavezető
  where:      Fércelő = 0
  order:      '[Cikkszám], [IT szám], [Szín]'
  head_after: 15
  limit:      100
  sum:
  - Gyártandó mennyiség
  - Gyártásra vár
  - Átnéző
  - Mosoda
  - Fércelő
  - Félkész vasaló
  - Szabászat
  - Logisztika
  - Hímző/Szitanyomó
  - Szeged varroda
  - Orosháza varroda
  - Hódmezővásárhely Petőfi u
  fields:
  - name:     Cikkszám
    label:    Cikk
    filter:   egyenlő
    search:   cikkszam
  - name:     IT szám
    label:    IT
  - name:     Szín
  - name:     Kiszállítás dátuma
    label:    Kiszáll. dátum
    fontsize: 14px
  - name:     Megnevezés
    fontsize: 14px
    filter:   tartalmazza
  - name:     Sürgős
    fontsize: 14px
  - name:     Gyártandó mennyiség
    label:    Gyárt. menny.
  - name:     Gyártásra vár
    label:    Gyárt. vár
  - name:     Átnéző
    label:    Átn.
  - name:     Mosoda
    label:    Mos.
  - name:     Fércelő
    label:    Férc.
  - name:     Félkész vasaló
    label:    Félk. vas.
  - name:     Szabászat
    label:    Szab.
  - name:     Logisztika
    label:    Log.
  - name:     Hímző/Szitanyomó
    label:    Hímző
  - name:     Szeged varroda
    label:    Szeged varr.
  - name:     Orosháza varroda
    label:    Orosh. varr.
  - name:     Hódmezővásárhely Petőfi u
    label:    Hmvh. varr.

-
  id:         kovetkezohetigyartasiterv_tablet
  database:   SzefoModulKeszlet
  name:       monitor_kovetkezohetigyartasiterv
  label:      Gyártási terv - következő hét
  device:     tablet
  roles:
  - admin
  - szabó
  - logisztikus
  - varró
  - meo
  - varrodavezető
  where:
  order:      '[Cikkszám], [IT szám], [Szín]'
  head_after: 15
  limit:      100
  sum:
  - Gyártandó mennyiség
  - Gyártásra vár
  - Átnéző
  - Mosoda
  - Fércelő
  - Félkész vasaló
  - Szabászat
  - Logisztika
  - Hímző/Szitanyomó
  - Szeged varroda
  - Orosháza varroda
  - Hódmezővásárhely Petőfi u
  fields:
  - name:     Cikkszám
    label:    Cikk
    search:   cikkszam
  - name:     IT szám
    label:    IT
  - name:     Szín
  - name:     Kiszállítás dátuma
    label:    Kiszáll. dátum
    fontsize: 14px
  - name:     Megnevezés
    fontsize: 14px
  - name:     Sürgős
    fontsize: 14px
  - name:     Gyártandó mennyiség
    label:    Gyárt. menny.
  - name:     Gyártásra vár
    label:    Gyárt. vár
  - name:     Átnéző
    label:    Átn.
  - name:     Mosoda
    label:    Mos.
  - name:     Fércelő
    label:    Férc.
  - name:     Félkész vasaló
    label:    Félk. vas.
  - name:     Szabászat
    label:    Szab.
  - name:     Logisztika
    label:    Log.
  - name:     Hímző/Szitanyomó
    label:    Hímző
  - name:     Szeged varroda
    label:    Szeged varr.
  - name:     Orosháza varroda
    label:    Orosh. varr.
  - name:     Hódmezővásárhely Petőfi u
    label:    Hmvh. varr.

-
  id:         mitkodoltamma
  database:   SzefoModulKeszlet
  name:       monitor_napikodolas
  label:      Mit kódoltam ma?
  device:     tablet
  roles:
  - kódoló
  order:      '[Kódolás ideje] DESC'
  head_after: 15
  limit:      100
  fields:
  - name:     Kódoló kód
    type:     number
    filter:   egyenlő
    default:  belepokod
    readonly: true
  - name:     Cikkszám
    label:    Cikk
    filter:   egyenlő
  - name:     IT
    filter:   egyenlő
  - name:     Diszpó
  - name:     Szín
  - name:     csomag
    label:    Csom.
  - name:     Méret
  - name:     darab
  - name:     Művelet
  - name:     Művelet név
  - name:     Normaperc
    label:    Norma perc
  - name:     Megjegyzés
  - name:     Dolgozó
  - name:     Kódolás ideje

-
  id:         muveletosszegzese
  database:   SzefoModulKeszlet
  name:       monitor_muveletekosszegzese
  label:      Bekódolt műveletek összegzése
  device:     tablet
  roles:
  - admin
  - varrodavezető
  order:      Művelet
  head_after: 15
  limit:      500
  fields:
  - name:     Cikkszám
    label:    Cikk
    filter:   egyenlő
  - name:     IT
    filter:   egyenlő
  - name:     Művelet
    type:     number
    filter:   egyenlő
  - name:     Megnevezés
  - name:     darab
    label:    Összes bekódolt db.

-
  id:         utovasaloleadas_tablet
  database:   SzefoModulKeszlet
  name:       monitor_szegedutovasaloleadas
  label:      Szeged utóvasaló napi leadás
  device:     tablet
  roles:
  - admin
  - meo
  where:
  order:      '[Cikk/IT]'
  head_after: 15
  limit:      100
  sum:
  - Rendelt db
  - Előzőleg leadott db
  - Tervezett db
  - Leadott db
  - Eltérés a tervtől
  - Hibák száma
  - Hátralék
  fields:
  - name:     Cikk/IT
  - name:     Megnevezés
  - name:     Megrendelő
  - name:     Rendelt db
    label:    Rendelt
  - name:     Előzőleg leadott db
    label:    Előzőleg leadott
  - name:     Hátralék
    label:    Gyártandó
  - name:     Tervezett db
    label:    Mai terv
  - name:     Leadott db
    label:    Ma leadott
  - name:     Eltérés a tervtől
    label:    Eltérés
    positive: red
    zero:     green
    negative: green
  - name:     Hibák száma


###############################################################################  TV  ###
-
  id:         aktualishetigyartasiterv_tv
  database:   SzefoModulKeszlet
  name:       monitor_aktualishetigyartasiterv
  label:      Gyártási terv - aktuális hét
  device:     tv
  refresh:    70
  roles:
  - admin
  - varrodavezető
  where:
  order:      '[Cikkszám], [IT szám], [Szín]'
  head_after: 100
  limit:      50
#  tablefontsize:  14px
  headfontsize:   16px
#  bodyfontsize:   10px
  sum:
  - Gyártandó mennyiség
  - Gyártásra vár
  - Átnéző
  - Mosoda
  - Fércelő
  - Félkész vasaló
  - Szabászat
  - Logisztika
  - Hímző/Szitanyomó
  - Szeged varroda
  - Orosháza varroda
  - Hódmezővásárhely Petőfi u
  fields:
  - name:     Cikkszám
    label:    Cikk
  - name:     IT szám
    label:    IT
  - name:     Szín
  - name:     Kiszállítás dátuma
    label:    Kiszállítás
    fontsize: 16px
  - name:     Megnevezés
    fontsize: 16px
  - name:     Sürgős
    fontsize: 16px
  - name:     Gyártandó mennyiség
    label:    Gyártandó
  - name:     Gyártásra vár
    label:    Gyárt.vár
  - name:     Átnéző
    label:    Átn.
  - name:     Mosoda
    label:    Mos.
  - name:     Fércelő
    label:    Férc.
  - name:     Félkész vasaló
    label:    Félk.vas.
  - name:     Szabászat
    label:    Szab.
  - name:     Logisztika
    label:    Log.
  - name:     Hímző/Szitanyomó
    label:    Hímző
  - name:     Szeged varroda
    label:    Szeged
  - name:     Orosháza varroda
    label:    Orosh.
  - name:     Hódmezővásárhely Petőfi u
    label:    Hmvh.

-
  id:         kovetkezohetigyartasiterv_tv
  database:   SzefoModulKeszlet
  name:       monitor_kovetkezohetigyartasiterv
  label:      Gyártási terv - következő hét
  device:     tv
  refresh:    70
  roles:
  - admin
  - varrodavezető
  where:
  order:      '[Cikkszám], [IT szám], [Szín]'
  head_after: 100
  limit:      50
  headfontsize:   16px
#  bodyfontsize:   14px
  sum:
  - Gyártandó mennyiség
  - Gyártásra vár
  - Átnéző
  - Mosoda
  - Fércelő
  - Félkész vasaló
  - Szabászat
  - Logisztika
  - Hímző/Szitanyomó
  - Szeged varroda
  - Orosháza varroda
  - Hódmezővásárhely Petőfi u
  fields:
  - name:     Cikkszám
    label:    Cikk
  - name:     IT szám
    label:    IT
  - name:     Szín
  - name:     Kiszállítás dátuma
    label:    Kiszállítás
    fontsize: 16px
  - name:     Megnevezés
    fontsize: 16px
  - name:     Sürgős
    fontsize: 16px
  - name:     Gyártandó mennyiség
    label:    Gyártandó
  - name:     Gyártásra vár
    label:    Gyárt.vár
  - name:     Átnéző
    label:    Átn.
  - name:     Mosoda
    label:    Mos.
  - name:     Fércelő
    label:    Férc.
  - name:     Félkész vasaló
    label:    Félk.vas.
  - name:     Szabászat
    label:    Szab.
  - name:     Logisztika
    label:    Log.
  - name:     Hímző/Szitanyomó
    label:    Hímző
  - name:     Szeged varroda
    label:    Szeged
  - name:     Orosháza varroda
    label:    Orosh.
  - name:     Hódmezővásárhely Petőfi u
    label:    Hmvh.

-
  id:         aktualishetigyartasiterv_osszes_tv
  database:   SzefoModulKeszlet
  name:       monitor_aktualishetigyartasiterv
  label:      Gyártási terv - aktuális hét - összes
  device:     tv
  refresh:    70
  roles:
  - admin
  - varrodavezető
  where:
  order:      Rendelésszám
  head_after: 100
  limit:      50
  fontsize:   14px
  sum:
  - Gyártandó mennyiség
  - Gyártásra vár
  - Átnéző
  - Mosoda
  - Fércelő
  - Félkész vasaló
  - Szabászat
  - Logisztika
  - Hímző/Szitanyomó
  - Szeged varroda
  - Orosháza varroda
  - Hódmezővásárhely Petőfi u
  fields:
  - name:     Cikkszám
  - name:     Rendelésszám
  - name:     Partner rendelésszám
  - name:     Ütem
  - name:     Kiszállítás dátuma
  - name:     IT szám
  - name:     Megnevezés
  - name:     Finomság
  - name:     Modellszám
  - name:     Cikktípus
  - name:     Sürgős
  - name:     Rendelt mennyiség
  - name:     Szín
  - name:     Gyártandó mennyiség
  - name:     Telephely
  - name:     Fonalhiány
  - name:     Rontott
  - name:     Gyártásra vár
  - name:     Átnéző
  - name:     Mosoda
  - name:     Fércelő
  - name:     Félkész vasaló
  - name:     Szabászat
  - name:     Logisztika
  - name:     Hímző/Szitanyomó
  - name:     Szeged varroda
  - name:     Orosháza varroda
  - name:     Külső gyártók
  - name:     Kiskunhalas varroda
  - name:     Hódmezővásárhely Bocskai u
  - name:     Hódmezővásárhely Petőfi u
  - name:     Olaszország
  - name:     Készáru vasaló
  - name:     Meo
  - name:     Kivezetve
  - name:     Kiszállítva

-
  id:         varrodaleadas_tv
  database:   SzefoModulKeszlet
  name:       monitor_szegedvarrodaleadas
  label:      Szeged varroda napi leadás
  device:     tv
  refresh:    70
  roles:
  - admin
  - varrodavezető
  where:
  order:      '[Cikk/IT]'
  head_after: 100
  limit:      50
  sum:
  - Rendelt db
  - Előzőleg leadott db
  - Tervezett db
  - Leadott db
  - Eltérés a tervtől
  - Hibák száma
  - Hátralék
  fields:
  - name:     Cikk/IT
  - name:     Megnevezés
  - name:     Megrendelő
  - name:     Rendelt db
    label:    Rendelt
  - name:     Előzőleg leadott db
    label:    Előzőleg leadott
  - name:     Hátralék
    label:    Gyártandó
    positive: red
    zero:     green
    negative: green
  - name:     Tervezett db
    label:    Mai terv
  - name:     Leadott db
    label:    Ma leadott
  - name:     Eltérés a tervtől
    label:    Eltérés
    positive: green
    zero:     green
    negative: red
  - name:     Hibák száma
    label:    Hibák

-
  id:         kotodeleadas_tv
  database:   SzefoModulKeszlet
  name:       monitor_szegedkotodeleadas
  label:      Szeged kötöde napi leadás
  device:     tv
  refresh:    300
  roles:
  - admin
  - kötödevezető
  where:
  order:      '[Cikk/IT]'
  head_after: 100
  limit:      50
  sum:
  - Rendelt db
  - Előzőleg leadott db
  - Tervezett db
  - Leadott db
  - Eltérés a tervtől
  - Hibák száma
  - Hátralék
  fields:
  - name:     Cikk/IT
  - name:     Megnevezés
  - name:     Megrendelő
  - name:     Rendelt db
    label:    Rendelt
  - name:     Előzőleg leadott db
    label:    Előzőleg leadott
  - name:     Hátralék
    label:    Gyártandó
  - name:     Tervezett db
    label:    Mai terv
  - name:     Leadott db
    label:    Ma leadott
  - name:     Eltérés a tervtől
    label:    Eltérés
    positive: red
    zero:     green
    negative: green
  - name:     Hibák száma

-
  id:         elovasaloleadas_tv
  database:   SzefoModulKeszlet
  name:       monitor_szegedelovasaloleadas
  label:      Szeged elővasaló napi leadás
  device:     tv
  refresh:    300
  roles:
  - admin
  - elővasalóvezető
  where:
  order:      '[Cikk/IT]'
  head_after: 100
  limit:      50
  sum:
  - Rendelt db
  - Előzőleg leadott db
  - Tervezett db
  - Leadott db
  - Eltérés a tervtől
  - Hibák száma
  - Hátralék
  fields:
  - name:     Cikk/IT
  - name:     Megnevezés
  - name:     Megrendelő
  - name:     Rendelt db
    label:    Rendelt
  - name:     Előzőleg leadott db
    label:    Előzőleg leadott
  - name:     Hátralék
    label:    Gyártandó
  - name:     Tervezett db
    label:    Mai terv
  - name:     Leadott db
    label:    Ma leadott
  - name:     Eltérés a tervtől
    label:    Eltérés
    positive: red
    zero:     green
    negative: green
  - name:     Hibák száma

-
  id:         szabaszatleadas_tv
  database:   SzefoModulKeszlet
  name:       monitor_szegedszabaszatleadas
  label:      Szeged szabászat napi leadás
  device:     tv
  refresh:    300
  roles:
  - admin
  - szabászatvezető
  where:
  order:      '[Cikk/IT]'
  head_after: 100
  limit:      50
  sum:
  - Rendelt db
  - Előzőleg leadott db
  - Tervezett db
  - Leadott db
  - Eltérés a tervtől
  - Hibák száma
  - Hátralék
  fields:
  - name:     Cikk/IT
  - name:     Megnevezés
  - name:     Megrendelő
  - name:     Rendelt db
    label:    Rendelt
  - name:     Előzőleg leadott db
    label:    Előzőleg leadott
  - name:     Hátralék
    label:    Gyártandó
    positive: red
    zero:     green
    negative: green
  - name:     Tervezett db
    label:    Mai terv
  - name:     Leadott db
    label:    Ma leadott
  - name:     Eltérés a tervtől
    label:    Eltérés
    positive: green
    zero:     green
    negative: red
  - name:     Hibák száma
    label:    Hibák

-
  id:         utovasaloleadas_tv
  database:   SzefoModulKeszlet
  name:       monitor_szegedutovasaloleadas
  label:      Szeged utóvasaló napi leadás
  device:     tv
  refresh:    300
  roles:
  - admin
  - utóvasalóvezető
  where:
  order:      '[Cikk/IT]'
  head_after: 100
  limit:      50
  sum:
  - Rendelt db
  - Előzőleg leadott db
  - Tervezett db
  - Leadott db
  - Eltérés a tervtől
  - Hibák száma
  - Hátralék
  fields:
  - name:     Cikk/IT
  - name:     Megnevezés
  - name:     Megrendelő
  - name:     Rendelt db
    label:    Rendelt
  - name:     Előzőleg leadott db
    label:    Előzőleg leadott
  - name:     Hátralék
    label:    Gyártandó
  - name:     Tervezett db
    label:    Mai terv
  - name:     Leadott db
    label:    Ma leadott
  - name:     Eltérés a tervtől
    label:    Eltérés
    positive: red
    zero:     green
    negative: green
  - name:     Hibák száma

-
  id:         kotodeleadasszinszerint_tv
  database:   SzefoModulKeszlet
  name:       monitor_szegedkotodeleadasszinszerint
  label:      Szeged kötöde napi leadás szín szerint
  device:     tv
  refresh:    300
  roles:
  - admin
  - kötödevezető
  where:
  order:      '[Cikk/IT]'
  head_after: 100
  limit:      50
  sum:
  - Rendelt db
  - Előzőleg leadott db
  - Tervezett db
  - Leadott db
  - Eltérés a tervtől
  - Hibák száma
  - Hátralék
  fields:
  - name:     Cikk/IT
  - name:     Megnevezés
  - name:     Megrendelő
  - name:     Szín
  - name:     Rendelt db
    label:    Rendelt
  - name:     Előzőleg leadott db
    label:    Előzőleg leadott
  - name:     Hátralék
    label:    Gyártandó
  - name:     Tervezett db
    label:    Mai terv
  - name:     Leadott db
    label:    Ma leadott
  - name:     Eltérés a tervtől
    label:    Eltérés
    positive: red
    zero:     green
    negative: green
  - name:     Hibák száma

-
  id:         elovasaloleadasszinszerint_tv
  database:   SzefoModulKeszlet
  name:       monitor_szegedelovasaloleadasszinszerint
  label:      Szeged elővasaló napi leadás szín szerint
  device:     tv
  refresh:    300
  roles:
  - admin
  - elővasalóvezető
  where:
  order:      '[Cikk/IT]'
  head_after: 100
  limit:      50
  sum:
  - Rendelt db
  - Előzőleg leadott db
  - Tervezett db
  - Leadott db
  - Eltérés a tervtől
  - Hibák száma
  - Hátralék
  fields:
  - name:     Cikk/IT
  - name:     Megnevezés
  - name:     Megrendelő
  - name:     Szín
  - name:     Rendelt db
    label:    Rendelt
  - name:     Előzőleg leadott db
    label:    Előzőleg leadott
  - name:     Hátralék
    label:    Gyártandó
  - name:     Tervezett db
    label:    Mai terv
  - name:     Leadott db
    label:    Ma leadott
  - name:     Eltérés a tervtől
    label:    Eltérés
    positive: red
    zero:     green
    negative: green
  - name:     Hibák száma

-
  id:         szabaszatleadasszinszerint_tv
  database:   SzefoModulKeszlet
  name:       monitor_szegedszabaszatleadasszinszerint
  label:      Szeged szabászat napi leadás szín szerint
  device:     tv
  refresh:    300
  roles:
  - admin
  - szabászatvezető
  where:
  order:      '[Cikk/IT]'
  head_after: 100
  limit:      50
  sum:
  - Rendelt db
  - Előzőleg leadott db
  - Tervezett db
  - Leadott db
  - Eltérés a tervtől
  - Hibák száma
  - Hátralék
  fields:
  - name:     Cikk/IT
  - name:     Megnevezés
  - name:     Megrendelő
  - name:     Szín
  - name:     Rendelt db
    label:    Rendelt
  - name:     Előzőleg leadott db
    label:    Előzőleg leadott
  - name:     Hátralék
    label:    Gyártandó
    positive: red
    zero:     green
    negative: green
  - name:     Tervezett db
    label:    Mai terv
  - name:     Leadott db
    label:    Ma leadott
  - name:     Eltérés a tervtől
    label:    Eltérés
    positive: green
    zero:     green
    negative: red
  - name:     Hibák száma

-
  id:         utovasaloleadasszinszerint_tv
  database:   SzefoModulKeszlet
  name:       monitor_szegedutovasaloleadasszinszerint
  label:      Szeged utóvasaló napi leadás szín szerint
  device:     tv
  refresh:    300
  roles:
  - admin
  - utóvasalóvezető
  where:
  order:      '[Cikk/IT]'
  head_after: 100
  limit:      50
  sum:
  - Rendelt db
  - Előzőleg leadott db
  - Tervezett db
  - Leadott db
  - Eltérés a tervtől
  - Hibák száma
  - Hátralék
  fields:
  - name:     Cikk/IT
  - name:     Megnevezés
  - name:     Megrendelő
  - name:     Szín
  - name:     Rendelt db
    label:    Rendelt
  - name:     Előzőleg leadott db
    label:    Előzőleg leadott
  - name:     Hátralék
    label:    Gyártandó
  - name:     Tervezett db
    label:    Mai terv
  - name:     Leadott db
    label:    Ma leadott
  - name:     Eltérés a tervtől
    label:    Eltérés
    positive: red
    zero:     green
    negative: green
  - name:     Hibák száma

###############################################################################  playlists  ###
playlists:
-
  id:         varroda
  label:      Varroda
  roles:
  - admin
  - varrodavezető
  views:
  - id:       aktualishetigyartasiterv_tv
    interval: 60
  - id:       kovetkezohetigyartasiterv_tv
    interval: 60
  - id:       varrodaleadas_tv
    interval: 60

-
  id:         szabaszat
  label:      Szabászat
  roles:
  - admin
  - szabászatvezető
  views:
  - id:       aktualishetigyartasiterv_tv
    interval: 300
  - id:       kovetkezohetigyartasiterv_tv
    interval: 300
  - id:       szabaszatleadasszinszerint_tv
    interval: 300

###############################################################################  tvlist  ###
tvlist:
-
  id:         tv1
  label:      TV 1 - Varroda II
  ip:         172.17.135.187
  mac:        a0:6f:aa:5f:e2:17
  group:      varroda2
  roles:
  - admin
  - varrodavezető
-
  id:         tv2
  label:      TV 2 - Varroda II
  ip:         172.17.135.185
  mac:        a0:6f:aa:60:64:68
  group:      varroda2
  roles:
  - admin
  - varrodavezető
-
  id:         tv3
  label:      TV 3 - Varroda II
  ip:         172.17.135.188
  mac:        a0:6f:aa:56:33:3b
  group:      varroda2
  roles:
  - admin
  - varrodavezető
-
  id:         tv4
  label:      TV 4 - Varroda I
  ip:         172.17.135.244
  mac:        20:3d:bd:33:5a:4f
  group:      varroda1
  roles:
  - admin
  - varrodavezető
-
  id:         tv5
  label:      TV 5 - Szabászat
  ip:         172.17.135.246
  mac:        20:3d:bd:33:5a:2a
  group:      szabaszat
  roles:
  - admin
  - szabászatvezető
-
  id:         tv6
  label:      TV 6 - Logisztika
  ip:         172.17.135.226
  mac:        20:3d:bd:33:5a:44
  group:      logisztika
  roles:
  - admin
  - logisztikavezető
-
  id:         tv7
  label:      TV 7 - Rendszergazda
  ip:         172.17.135.225
  mac:        a0:6f:aa:5c:46:57
  group:      teszt
  roles:
  - admin
`

function prepareViews(views) {
  for (let view of views) {
    view.version = view.version || 1
    let schema = {fields: []}
    let json_schema = { title: 'Szűrő', type: 'object', properties: {}}
    let vuetify_schema = {}
    for (let field of view.fields) {
      if (!field.label) { field.label = field.name }
      if (!field.filter) { continue }
      let schemafield = {
        type: 'input',
        inputType: field.type === 'number' ? 'number' : 'text',
        label: (field.label || field.name) + ' ' + field.filter,
        model: field.name
      }
      let json_schemafield = {
        type: field.type === 'number' ? 'number' : 'text',
        title: field.label + ' ' + field.filter,
      }
      let vuetify_schemafield = {
        type: field.type === 'number' ? 'number' : 'text',
        label: field.label + ' ' + field.filter,
        flex: 12
      }
      if (field.readonly) {
        schemafield.readonly = true
        json_schemafield.readonly = true
        vuetify_schemafield.readonly = true
      }
      schema.fields.push(schemafield)
      json_schema.properties[field.name] = json_schemafield
      vuetify_schema[field.name] = vuetify_schemafield
    }
    view.schema = schema
    view.json_schema = json_schema
    view.vuetify_schema = vuetify_schema
  }
}

let Config = null
try {
  Config = yaml.safeLoad(configYaml)
  prepareViews(Config.views)
}
catch (err) {
  console.log(err)
}

module.exports = Config
