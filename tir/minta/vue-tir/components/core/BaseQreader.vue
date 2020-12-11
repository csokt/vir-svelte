<template>
  <v-dialog
    v-if="dialog"
    v-model="dialog"
    persistent
    max-width="400"
  >
    <v-card>
      <v-card-title
        class="title grey--text"
        @click.stop="onBack"
      >
        <v-icon v-if="!required">
          arrow_back
        </v-icon>
        {{label}}
      </v-card-title>
      <v-img :contain="false">
        <vue-qr-reader
          @code-scanned="onDecode"
          :use-back-camera="useBackCamera"
          :video-width="videoWidth"
          :video-height="videoHeight"
          :responsive="false"
        />
      </v-img>
    </v-card>
  </v-dialog>
<!--
        <QrcodeReader
          :camera="camera"
          :paused="!dialog"
          :track="false"
          @decode="onDecode"
        />
-->
</template>

<script>
// import { QrcodeReader } from 'vue-qrcode-reader'
import VueQrReader from 'vue-qr-reader/dist/lib/vue-qr-reader.umd.js'
// import VueQrReader from '@/components/core/VueQrReader.vue'

export default {
  components: {
    // QrcodeReader
    VueQrReader
  },

  props: {
    label: String,
    dialog: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    camera () {
      if (this.$vuetify.breakpoint.smAndDown) {
        return {}
      }
      return { facingMode: 'user' }
    },
    useBackCamera () {
      return this.$vuetify.breakpoint.smAndDown
    },
    videoWidth () {
      return this.$vuetify.breakpoint.smAndDown ? 300 : 400
    },
    videoHeight () {
      return this.$vuetify.breakpoint.smAndDown ? 400 : 300
    }
  },

  methods: {
    onDecode (content) {
      if (content) this.$emit('input', content)
    },

    onBack () {
      if (!this.required) this.$emit('back')
    }
  }
}
</script>
