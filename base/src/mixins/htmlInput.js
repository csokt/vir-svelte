const htmlInput = {
  props: {
    autofocus: {
      type: Boolean,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: null
    },
    readonly: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'text'
    },
    value: {
      type: [String, Number, Boolean],
      default: null
    }
  },

  data() {
    return {
      focused: false
    }
  },

  methods: {
    onBlur(e) {
      this.focused = false
      this.$emit('blur', e)
    },

    onFocus(e) {
      this.focused = true
      this.$emit('focus', e)
    },

    blur() {
      this.$el.blur()
    },
    click() {
      this.$el.click()
    },
    focus() {
      this.$el.focus()
    }
  }
}

export default htmlInput
