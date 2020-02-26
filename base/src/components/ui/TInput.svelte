<template>
  <div class="max-w-sm mt-4">
    <div v-if="label" class="text-xs text-gray-600">
      <label v-if="value || (focused && !readonly)"> {{ label }} </label>
      &nbsp;
    </div>
    <div class="flex w-full">
      <input
        @input="$emit('input', $event.target.value)"
        @change="$emit('change', $event.target.value)"
        @focus="onFocus"
        @blur="onBlur"
        :value="value"
        :type="type"
        :placeholder="focused && !readonly ? '' : placeholder || label"
        :readonly="readonly"
        :disabled="disabled"
        :class="computedClasses"
        class="flex-grow bg-transparent border-b border-gray-700 w-auto mb-px text-gray-800 pb-1 focus:outline-none focus:border-b-2 focus:border-blue-400 focus:mb-0"
      />
      <button v-if="qrcode" @click="dialog = true" class="text-xl">
        &#x1f532;
      </button>
      <TQread
        :dialog="dialog"
        @input="
          dialog = false
          $emit('input', $event)
        "
        @close="dialog = false"
        :header="label"
      >
      </TQread>
    </div>
  </div>
  <!-- class="bg-transparent border-b border-gray-700 w-full mb-px text-gray-800 pb-1 focus:outline-none focus:border-b-2 focus:border-blue-400 focus:mb-0" -->
</template>

<script>
import htmlInput from '@/mixins/htmlInput.js'
import TQread from '@/components/ui/TQread.vue'

export default {
  components: {
    TQread
  },
  mixins: [htmlInput],

  props: {
    qrcode: {
      type: Boolean,
      default: false
    }
    // type: {
    //   type: String,
    //   default: 'text',
    //   validator(value) {
    //     return ['number', 'password', 'search', 'text'].includes(value)
    //   }
    // },
    // value: { type: String, required: true }
  },

  data() {
    return { dialog: false }
  },

  computed: {
    computedClasses() {
      return {
        'opacity-75 cursor-not-allowed': this.disabled
      }
    }
  },

  methods: {
    log(msg) {
      // eslint-disable-next-line
      console.log(msg)
    },

    onInput(event) {
      this.$emit('input', event.target.value)
    }
  }
}
</script>
