<template>
  <v-container pa-0>
    <v-layout justify-space-around wrap>
      <BaseCard>
        <v-card-text>
          <BaseTime
            :value="kezdIdo"
            @input="$store.commit('kezdIdo', $event)"
            label="Munkaidő kezdete"
            :allowed-minutes="allowedMinutes"
          />
          <v-text-field
            v-model="aktIdo"
            label="Aktuális idő"
            readonly
          />
          <v-text-field
            v-model="elteltPerc"
            label="Eltelt idő (
            perc)" readonly
          />
          <v-text-field
            v-model="osszesNormaperc"
            label="Összes normaperc"
            readonly
          />
          <v-text-field
            v-model="teljesitmeny"
            label="Teljesítmény %"
            readonly
          />
        </v-card-text>
      </BaseCard>
    </v-layout>
  </v-container>
</template>

<script>
import { get } from 'vuex-pathify'
import { API, EventBus, Log } from '@/util'
import BaseCard from '@/components/core/BaseCard.vue'
import BaseTime from '@/components/core/BaseTime.vue'

export default {
  name: 'norma',
  components: {
    BaseCard,
    BaseTime
  },

  data () {
    return {
      aktIdo: new Date().toLocaleTimeString().slice(0, 5),
      osszesNormaperc: 0
    }
  },

  computed: {
    ...get(['user', 'kezdIdo']),

    elteltPerc: function () {
      return this.minutes(this.aktIdo) - this.minutes(this.kezdIdo)
    },
    teljesitmeny: function () {
      return Math.round(100 * this.osszesNormaperc / this.elteltPerc)
    }
  },

  methods: {
    minutes: (m) => {
      const a = m.split(':')
      return (+a[0]) * 60 + (+a[1])
    },

    allowedMinutes: (m) => m % 5 === 0,

    async sumNormaperc () {
      // Log('norma')
      const response = await API.get('tir/normaperc/' + this.user.belepokod)
      if (response.ok) {
        this.osszesNormaperc = Math.round(response.data.sum)
      } else {
        const message = 'Szerver hiba, értesítse a rendszergazdát!'
        EventBus.$emit('inform', { type: 'alert', variation: 'error', message: message })
        Log('message', { message: message })
      }
    }
  },

  created () {
    this.$store.set('pageTitle', 'Mai teljesítmény százalék')
    this.sumNormaperc()
  }
}
</script>
