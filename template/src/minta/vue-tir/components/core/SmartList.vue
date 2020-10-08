<template>
  <div>
    <BaseList
      :items="items"
      :itemkey="itemkey"
      :value="value"
      :label="label"
      :layout="layout"
      @select="$emit('select', $event)"
    />
    <ApiGet
      ref="apiget"
      v-model="items"
      :apiUrl="apiUrl"
      expect="array"
      @input="onApiInput"
      @length="$emit('length', $event)"
    />
</div>
</template>

<script>
import BaseList from '@/components/core/BaseList.vue'
import ApiGet from '@/components/core/ApiGet.vue'

export default {
  components: {
    BaseList,
    ApiGet
  },

  props: {
    itemkey: String, // BaseList
    value: [String, Function], // BaseList
    label: [String, Function], // BaseList
    layout: String, // BaseList
    apiUrl: String // ApiGet
  },

  data () {
    return {
      items: [] // BaseList ApiGet
    }
  },

  methods: {
    onApiInput (content) {
      this.$emit('change', content)
    },

    reload () {
      this.$refs.apiget.reload()
    }
  }
}
</script>
