<template>
  <v-list>
    <template v-for="(item, index) in items">
      <v-list-tile
        :key="item.title"
        :avatar="!!item.avatar"
        @click.stop="onClick(item)"
      >
        <v-list-tile-avatar v-if="item.avatar" tile>
          <img :src="item.avatar">
        </v-list-tile-avatar>
        <v-list-tile-action v-if="item.icon" tile>
          <v-icon v-html="item.icon"/>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title v-text="item.title"/>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider
        v-if="index + 1 < items.length"
        :key="index"
      />
    </template>
  </v-list>
<!--
          @click.stop="$emit('select', item)"
          @click.stop="$router.push(item.path)"
-->
</template>

<script>
export default {
  props: {
    items: Array
  },

  methods: {
    onClick (item) {
      this.$emit('select', item)
      if (item.path) this.$router.push(item.path)
    }
  }
}
</script>
