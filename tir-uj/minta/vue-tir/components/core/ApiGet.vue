<script>
import { API, checkResponse } from '@/util'

export default {
  props: {
    expect: {
      type: String,
      required: true,
      // default: 'array',
      validator: function (value) {
        return [
          'array',
          'object'
        ].indexOf(value) !== -1
      }
    },
    apiUrl: String,
    watchApiUrl: {
      type: Boolean,
      default: true
    }
  },

  watch: {
    apiUrl: function () {
      if (this.watchApiUrl) {
        this.apiGet()
      }
    }
  },

  methods: {
    emitEmptyData () {
      if (this.expect === 'array') {
        this.$emit('input', [])
        this.$emit('length', 0)
      } else if (this.expect === 'object') {
        this.$emit('input', {})
      } else {
        this.$emit('input', null)
      }
    },

    async apiGet () {
      await this.$nextTick()
      if (!this.apiUrl) {
        this.emitEmptyData()
        return
      }
      this.$emit('loading', true)
      const response = await API.get(this.apiUrl)
      this.$emit('loading', false)
      if (!checkResponse(response)) {
        this.emitEmptyData()
        return
      }
      const data = response.data
      if (this.expect === 'array') {
        if (Array.isArray(data)) {
          this.$emit('input', data)
          this.$emit('length', data.length)
        } else {
          this.$emit('input', [data])
          this.$emit('length', 1)
        }
      } else if (this.expect === 'object') {
        if (Array.isArray(data) && data.length) {
          this.$emit('input', data[0])
        } else if (typeof data === 'object' && data.constructor === Object) {
          this.$emit('input', data)
        } else {
          this.$emit('input', {})
        }
      } else {
        this.$emit('input', null)
      }
    },

    reload () {
      this.apiGet()
    }
  },

  created () {
    this.apiGet()
  },

  render: function (h) {
    return h() // avoid warning message
  }
}
</script>
