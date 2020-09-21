<template>
  <BaseCard title="Mobil alkalmazások">
    <v-card-text>
      <v-form v-model="valid" lazy-validation>
        <v-text-field
          v-model="username"
          :rules="usernameRules"
          prepend-icon="person"
          label="Név"
          required
        ></v-text-field>
        <v-text-field
          v-model="password"
          :rules="passwordRules"
          label="Jelszó"
          type="password"
          prepend-icon="lock"
          required
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" :disabled="!valid" @click="login">Bejelentkezés</v-btn>
    </v-card-actions>
  </BaseCard>
</template>

<script>
import { API, EventBus, getUser, getVirUser } from '@/util.js'
import BaseCard from '@/components/core/BaseCard.vue'
import Store from '@/store'

export default {
  name: 'loopbackLogin',
  components: {
    BaseCard
  },

  data: () => ({
    store: Store,
    valid: false,
    username: '',
    usernameRules: [
      v => !!v || 'Név megadása kötelező'
    ],
    password: '',
    passwordRules: [
      v => !!v || 'Jelszó megadása kötelező'
    ]
  }),

  methods: {
    async login () {
      EventBus.$emit('inform', { type: 'alert', variation: 'info', message: 'Kérés elküldve' })
      const response = await API.post('accounts/login', { username: this.username, password: this.password, ttl: 365 * 24 * 60 * 60 })
      if (response.ok) {
        const token = response.data.id
        localStorage.szefo_loopback_token = token
        API.setHeader('Authorization', token)
        // Store.pin = localStorage.szefo_pin
        Store.pin = ''
        localStorage.szefo_pin = ''
        getUser(this)
        getVirUser(this)
      } else {
        EventBus.$emit('inform', { type: 'alert', variation: 'error', message: 'Bejelentkezési hiba!' })
      }
    }
  }
}
</script>
