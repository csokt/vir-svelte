<template>
  <v-dialog
    ref="dialog"
    v-model="modal2"
    :return-value.sync="time"
    persistent
    lazy
    full-width
    width="290px"
  >
    <v-text-field
      slot="activator"
      v-model="time"
      :label="label"
      prepend-icon="access_time"
      readonly
    ></v-text-field>
    <v-time-picker
      v-if="modal2"
      v-model="time"
      :allowed-hours="allowedHours"
      :allowed-minutes="allowedMinutes"
      :format="format"
      full-width
    >
      <v-spacer></v-spacer>
      <v-btn
        flat
        color="primary"
        @click="modal2 = false"
      >
        Elvet
      </v-btn>
      <v-btn
        flat
        color="primary"
        @click="onSave"
      >
        Ment
      </v-btn>
    </v-time-picker>
  </v-dialog>
<!--
      <v-btn flat color="primary" @click="$refs.dialog.save(time); $emit('input', time)">Ment</v-btn>
-->
</template>

<script>

export default {
  props: {
    value: String,
    label: String,
    format: String,
    allowedHours: Function,
    allowedMinutes: Function
  },

  data () {
    return {
      time: this.value,
      modal2: false
    }
  },

  methods: {
    onSave () {
      this.$refs.dialog.save(this.time)
      this.$emit('input', this.time)
    }
  }
}
</script>
