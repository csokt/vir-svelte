<template>
  <v-container pa-0>
    <v-layout justify-space-around wrap>
      <BaseCard>
        <v-card-text>
          <LookupModel v-model="munkalapazonosito" model="munkalap" @change="onChange"/>
          <BaseMunkalapInfo :munkalap="munkalap"/>
        </v-card-text>
        <v-card-actions>
          <v-btn
            :disabled="!munkalap.munkalapazonosito"
            color="primary"
            @click="$router.push('/table/kodolasok')"
          >
            Kódolások a munkalapon
          </v-btn>
        </v-card-actions>
      </BaseCard>
    </v-layout>
  </v-container>
</template>

<script>
import { get } from 'vuex-pathify'
import { Log } from '@/util'
import BaseCard from '@/components/core/BaseCard.vue'
import LookupModel from '@/components/LookupModel.vue'
import BaseMunkalapInfo from '@/components/BaseMunkalapInfo.vue'

export default {
  name: 'munkalap',
  components: {
    BaseCard,
    LookupModel,
    BaseMunkalapInfo
  },

  data () {
    return {
      munkalapazonosito: '',
      munkalap: {}
    }
  },

  computed: get(['defaults']),

  methods: {
    onChange (item) {
      this.munkalap = item
      this.$store.set('defaults@munkalapazonosito', this.munkalap.munkalapazonosito)
      this.$store.set('defaults@cikkszam', this.munkalap.cikkszam)
      if (this.munkalapazonosito) {
        Log('munkalap', { munkalap: this.munkalapazonosito })
      }
    }
  },

  created () {
    this.$store.set('pageTitle', 'Gyártási információk')
    this.munkalapazonosito = this.defaults.munkalapazonosito
  }
}
</script>
