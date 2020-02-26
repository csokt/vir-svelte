<template>
  <div class="max-w-sm mt-4">
    <label :class="computedClasses" class="mt-4">
      <input
        @change="
          $emit('input', $event.target.checked)
          $emit('change', $event.target.checked)
        "
        @focus="onFocus"
        @blur="onBlur"
        :checked="value"
        :disabled="readonly || disabled"
        :class="computedClasses"
        class="mr-2 leading-tight"
        type="checkbox"
      />
      <span class="text-gray-800">{{ label }} </span>
    </label>
  </div>
</template>

<script>
import htmlInput from '@/mixins/htmlInput.js'

export default {
  mixins: [htmlInput],

  computed: {
    computedClasses() {
      return {
        'opacity-75 cursor-not-allowed': this.disabled
      }
    }
  }
}
</script>
