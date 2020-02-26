<template>
  <div>
    <t-modal
      v-model="dialog"
      @close="onClose"
      :header="header"
      hide-close-button
    >
      <vue-qr-reader
        @code-scanned="onDecode"
        :use-back-camera="useBackCamera"
        :video-width="videoWidth"
        :video-height="videoHeight"
      />
    </t-modal>
  </div>
</template>

<script>
import VueQrReader from 'vue-qr-reader/dist/lib/vue-qr-reader.umd.js'
import TModal from '@/components/ui/TModal.vue'

export default {
  components: {
    VueQrReader,
    TModal
  },

  props: {
    header: {
      type: String,
      default: null
    },
    dialog: {
      type: Boolean,
      required: true
    },
    required: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    useBackCamera() {
      return !this.$screen.md
    },
    videoWidth() {
      return this.$screen.portrait ? 300 : 400
    },
    videoHeight() {
      return this.$screen.landscape ? 300 : 400
    }
  },

  methods: {
    onDecode(content) {
      if (content) this.$emit('input', content)
    },

    onClose() {
      if (!this.required) this.$emit('close')
    }
  }
}
</script>
