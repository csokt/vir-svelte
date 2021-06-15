<template>
  <SmartLookup
    ref="smartlookup"
    :value="value"
    :label="label"
    type="number"
    :readonly="readonly"
    :qrcode="!readonly"
    :apiUrl="apiUrl"
    @input="$emit('input', $event)"
    @change="$emit('change', $event)"
  />
</template>

<script>
import SmartLookup from '@/components/core/SmartLookup.vue'

export default {
  components: {
    SmartLookup
  },

  props: {
    value: String,
    model: String,
    readonly: Boolean
  },

  computed: {
    label () {
      switch (this.model) {
        case 'dolgozo':
          return 'Dolgozó kód'
        case 'hely':
          return 'Átadási helykód'
        case 'munkalap':
          return 'Munkalap'
        case 'uzem':
          return 'Üzemkód'
        default:
          return 'Ismeretlen'
      }
    },

    apiUrl () {
      let value
      switch (this.model) {
        case 'dolgozo':
          if (!this.value || this.value.length !== 5) {
            return ''
          }
          value = parseInt(this.value) - 20000
          return 'tir/dolgozok/' + value.toString()
        case 'hely':
          if (!this.value || this.value.length !== 5) {
            return ''
          }
          return 'tir/vonalkodok/' + this.value
        case 'munkalap':
          if (!this.value || this.value.length !== 8) {
            return ''
          }
          return 'tir/munkalapok/' + this.value
        case 'uzem':
          if (!this.value || this.value.length !== 5) {
            return ''
          }
          value = parseInt(this.value) - 54000
          return 'tir/uzemekvkod/' + value.toString()
        default:
          return ''
      }
    }
  },

  methods: {
    reload () {
      this.$refs.smartlookup.reload()
    },

    focus () {
      this.$refs.smartlookup.focus()
    },

    blur () {
      this.$refs.smartlookup.blur()
    }
  }
}
</script>
