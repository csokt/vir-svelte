<template>
  <div>
    <v-text-field v-model="munkalap.kartoninfo" label="Kartoninfo" readonly/>
    <v-text-field v-model="munkalap.itszam" label="IT azonosító" readonly/>
    <v-text-field v-model="munkalap.cikkszam" label="Cikkszám" readonly/>
    <v-text-field v-model="munkalap.cikkmegnevezes" label="Cikknév" readonly/>
    <v-text-field v-model="munkalap.kartonszam" label="Gyártási kartonszám" readonly/>
    <v-text-field v-model="gepfinomsag" label="Gépfinomság" readonly/>
    <v-text-field v-model="munkalap.alapanyag" label="Fonal összetétel" readonly/>
    <v-textarea v-model="munkalap.megjegyzes" label="Megjegyzés" rows="1" auto-grow readonly />
    <v-text-field v-model="mosott" label="Mosott" readonly/>
    <v-text-field v-model="munkalap.szinkod" label="Színszám" readonly/>
    <v-text-field v-model="munkalap.meret" label="Nagyság" readonly/>
    <v-text-field v-model="munkalap.db" label="Darabszám" readonly/>
    <v-text-field v-model="munkalap.ugyfelnev" label="Partner" readonly/>
    <v-text-field v-model="munkalap.partnerrendelesszam" label="Partner rendelésszám" readonly/>
    <v-text-field v-model="munkalap.partnercikk" label="Partner modellszám" readonly/>
  </div>
</template>

<script>
export default {
  props: {
    munkalap: Object
  },

  computed: {
    gepfinomsag () {
      return this.munkalap.kartoninfo ? this.munkalap.csoport4 + ' gg' : ''
    },
    mosott () {
      return this.munkalap.kartoninfo ? this.munkalap.mosott === 'I' ? 'igen' : 'nem' : ''
    }
  }
}
</script>
