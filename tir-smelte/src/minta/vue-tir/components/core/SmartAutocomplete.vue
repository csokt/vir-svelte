<template>
  <div>
    <v-autocomplete
      ref="element"
      :value="value"
      :items="items"
      :loading="isLoading"
      :search-input.sync="searchInput"
      clearable
      no-filter
      hide-no-data
      :item-text="itemText"
      :item-value="itemValue"
      :label="label"
      @input="$emit('input', $event)"
      @change="onChange"
    >
      <template
        slot="selection"
        slot-scope="{ item }"
      >
        <span class="mt-2">
          {{ item[itemText] }}
        </span>
      </template>
      <template
        slot="item"
        slot-scope="{ item }"
      >
        <span :class="itemClass">
          {{ item[itemText] }}
        </span>
      </template>
    </v-autocomplete>
    <ApiGet
      ref="apiget"
      v-model="items"
      :apiUrl="apiUrl"
      expect="array"
      @loading="isLoading = $event"
    />
  </div>
<!--
      @click:clear="items = []"
-->
</template>

<script>
import ApiGet from '@/components/core/ApiGet.vue'

export default {
  components: {
    ApiGet
  },

  props: {
    value: [String, Number],
    label: String,
    apiUrl: {
      type: String,
      required: true
    },
    itemText: {
      type: String,
      default: 'name'
    },
    itemValue: {
      type: String,
      default: 'id'
    },
    itemClass: {
      type: String,
      // default: 'title'
      default: 'subheading'
      // default: 'body-2'
      // default: 'body-1'
      // default: 'caption'
    }
  },

  data: () => ({
    isLoading: false,
    searchInput: null,
    items: []
  }),

  watch: {
    searchInput (content) {
      if (content) {
        this.$emit('searchInput', content)
      }
    }
  },

  methods: {
    onChange (content) {
      this.$refs.element.blur()
      const obj = this.items.find(o => o[this.itemValue] === content) || {}
      this.$emit('change', { ...obj })
    },

    reload () {
      this.$refs.apiget.reload()
    }
  }
}
</script>
