<template>
  <v-flex xs12 sm8 md5>
    <v-card :elevation="elevation" tile>
      <v-card-title v-if="title">
        <div class="title grey--text">
          {{title}}
        </div>
      </v-card-title>
      <slot></slot>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  props: {
    title: String,
    elevation: {
      type: Number,
      default: 3
    }
  }
}
</script>
