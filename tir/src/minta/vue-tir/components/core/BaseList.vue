<template>
  <div>
    <v-textarea
      v-if="layout == 'fields'"
      v-for="item in items"
      :key="item[itemkey]"
      :value="itemvalue(item)"
      :label="itemlabel(item)"
      rows="1"
      auto-grow
      readonly
      @click.stop="$emit('select', item)"
    />
    <v-list v-if="layout == 'list'">
      <template v-for="(item, index) in items">
        <v-list-tile
          :key="item[itemkey]"
          @click.stop="$emit('select', item)"
        >
          <v-list-tile-content>
            <v-list-tile-title v-text="itemvalue(item)"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider
          v-if="index + 1 < items.length"
          :key="index"
        />
      </template>
    </v-list>
  </div>
</template>

<script>
export default {
  props: {
    items: Array,
    itemkey: {
      type: String,
      default: 'id'
    },
    value: {
      type: [String, Function],
      default: 'value'
    },
    label: {
      type: [String, Function],
      default: 'label'
    },
    layout: {
      type: String,
      default: 'fields' // fields, list
    }
  },

  methods: {
    itemvalue (item) {
      if (typeof this.value === 'string') {
        return item[this.value]
      } else {
        return this.value(item)
      }
    },

    itemlabel (item) {
      if (typeof this.label === 'string') {
        return item[this.label]
      } else {
        return this.label(item)
      }
    }
  }
}
</script>
