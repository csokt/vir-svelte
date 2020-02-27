const htmlInputMethods = {
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
    },
    select() {
      this.$el.select()
    },
    setSelectionRange() {
      this.$el.setSelectionRange()
    },
    setRangeText() {
      this.$el.setRangeText()
    }
  }
}

export default htmlInputMethods
