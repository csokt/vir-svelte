<template>
    <div>
      <v-alert
        v-model="alert"
        dismissible
        :type="type"
        transition="scale-transition"
      >
        {{message}}
      </v-alert>
    </div>
</template>

<script>
import { EventBus } from '@/util.js'

export default {
  name: 'inform',
  data () {
    return {
      alert: false,
      type: 'success',
      message: ''
    }
  },

  created () {
    EventBus.$on('inform', event => {
      if (event.type === 'alert') {
        this.message = event.message
        this.type = event.variation
        this.alert = true
        setTimeout(() => { this.alert = false }, event.variation === 'error' ? 10000 : 2000)
      }
    })
  }
}
</script>
