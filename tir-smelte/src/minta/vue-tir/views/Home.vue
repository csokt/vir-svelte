<template>
  <v-container pa-0>
    <v-layout justify-space-around wrap>
      <BaseCard v-if="user.name">
        <BaseMenu :items="showItems"/>
        <v-card-actions>
          <v-btn
            color="primary"
            @click="logout"
          >
            Másik felhasználó választása
          </v-btn>
        </v-card-actions>
      </BaseCard>

      <BaseCard v-if="!user.name" title="Kérem jelentkezzen be!">
        <v-card-text>
          <BaseQfield
            v-model="qrcode"
            type="number"
            :readonly="production"
            @change="gotUserQR"
          />
        </v-card-text>
      </BaseCard>
    </v-layout>
  </v-container>
<!--
      <v-btn color="primary" @click="restartBackend">Restart backend</v-btn>
-->
</template>

<script>
import { get } from 'vuex-pathify'
import { API, checkResponse, Log } from '@/util'
import BaseCard from '@/components/core/BaseCard.vue'
import BaseMenu from '@/components/core/BaseMenu.vue'
import BaseQfield from '@/components/core/BaseQfield.vue'

export default {
  name: 'home',
  components: {
    BaseCard,
    BaseMenu,
    BaseQfield
  },

  data () {
    return {
      qrcode: '',
      dolgozo: {}
    }
  },

  computed: {
    ...get(['user', 'production']),

    kodolhat () {
      return this.user.role !== 'meo' && this.user.role !== 'kötő'
    },

    atadhat () {
      return this.user.role === 'kódoló'
    },

    teljesithet () {
      return ['varró', 'varró2', 'szabó'].includes(this.user.role)
    },

    showItems () {
      if (!this.user.name) return []
      const items = [
        { show: this.kodolhat, path: '/kodol', icon: 'speaker_phone', title: 'Kódolás' },
        { show: this.atadhat, path: '/atad', icon: 'speaker_phone', title: 'Átadás' },
        { show: true, path: '/munkalap', icon: 'info', title: 'Munkalap információk' },
        { show: true, path: '/seasearch', icon: 'search', title: 'Dokumentációk' },
        { show: this.teljesithet, path: '/norma', icon: 'trending_up', title: 'Mai teljesítmény %' },
        { show: this.teljesithet, path: '/table/napiteljesitmeny', icon: 'trending_up', title: 'Teljesítmény % (napi becsült)' },
        { show: this.teljesithet, path: '/table/havilezartteljesitmeny', icon: 'trending_up', title: 'Teljesítmény % (havi lezárt)' },
        { show: true, path: '/tablazatok', icon: 'grid_on', title: 'Táblázatok' }
      ]
      return items.filter(item => item.show)
    }
  },

  methods: {
    async gotUserQR (value) {
      if (!value) {
        return
      }
      let response = await API.post('tir/belep/' + value)
      if (!checkResponse(response)) return
      if (response.ok) {
        this.$store.set('defaults', { 'belepokod': value })
        this.$store.set('user', response.data.user)
        this.$store.set('kodol', response.data.kodol)
        this.$store.set('kodolasok', [])
        this.$store.set('atadasok', [])
        Log('login', this.user)

        response = await API.get('config/views/tablet/' + this.user.role)
        if (checkResponse(response)) {
          this.$store.set('views', response.data)
        } else {
          this.$store.set('views', [])
        }
      }
    },

    logout () {
      Log('logout', this.user)
      this.$store.set('user', {})
    }
  },

  async created () {
    this.$store.set('pageTitle', 'Termelés Információs Rendsz.')
  }
}
</script>
