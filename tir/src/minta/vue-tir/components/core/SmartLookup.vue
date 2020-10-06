<template>
  <div>
    <v-text-field
      v-if="!qrcode"
      ref="textfield"
      :value="value"
      :label="label"
      :type="type"
      :readonly="readonly"
      :clearable="!readonly"
      @input="$emit('input', $event)"
      @change="reload"
      @click:clear="reload"
      @keyup.enter="$emit('enter')"
    />
    <BaseQfield
      v-if="qrcode"
      ref="textfield"
      :value="value"
      :label="label"
      :type="type"
      :readonly="readonly"
      @input="$emit('input', $event)"
      @change="reload"
    />
    <ApiGet
      ref="apiget"
      :apiUrl="apiUrl"
      :watchApiUrl="false"
      expect="object"
      @input="onApiInput"
    />
  </div>
</template>

<script>
import { EventBus } from '@/util'
import ApiGet from '@/components/core/ApiGet.vue'
import BaseQfield from '@/components/core/BaseQfield.vue'

export default {
  components: {
    ApiGet,
    BaseQfield
  },

  props: {
    value: String, // v-text-field BaseQfield
    label: String, // v-text-field BaseQfield
    type: String, // v-text-field BaseQfield
    qrcode: { // v-text-field BaseQfield
      type: Boolean,
      default: false
    },
    apiUrl: { // ApiGet
      type: String,
      required: true
    },
    readonly: Boolean,
    notFoundMessage: {
      type: String,
      default: 'A keresett adat nem található!'
    }
  },

  methods: {
    onApiInput (content) {
      this.$emit('change', content)
      if (this.value && Object.keys(content).length === 0) {
        EventBus.$emit('inform', { type: 'alert', variation: 'warning', message: this.notFoundMessage })
      }
    },

    reload () {
      this.$refs.apiget.reload()
    },

    focus () {
      this.$refs.textfield.focus()
    },

    blur () {
      this.$refs.textfield.blur()
    }
  }
}
</script>
