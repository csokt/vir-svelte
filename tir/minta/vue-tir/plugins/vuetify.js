import Vue from 'vue'
import {
  Vuetify,
  VAlert,
  VApp,
  VAutocomplete,
  VBtn,
  VCard,
  VCheckbox,
  VChip,
  VCombobox,
  VDataTable,
  VDivider,
  VDialog,
  VFooter,
  VForm,
  VGrid,
  VIcon,
  VImg,
  VList,
  VNavigationDrawer,
  VProgressCircular,
  VSelect,
  VSubheader,
  VTextarea,
  VTextField,
  VTimePicker,
  VToolbar,
  VTooltip,
  transitions
} from 'vuetify'

import {
  Resize,
  Touch
} from 'vuetify/lib/directives'

import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  components: {
    VAlert,
    VApp,
    VAutocomplete,
    VBtn,
    VCard,
    VCheckbox,
    VChip,
    VCombobox,
    VDataTable,
    VDivider,
    VDialog,
    VFooter,
    VForm,
    VGrid,
    VIcon,
    VImg,
    VList,
    VNavigationDrawer,
    VProgressCircular,
    VSelect,
    VSubheader,
    VTextarea,
    VTextField,
    VTimePicker,
    VToolbar,
    VTooltip,
    transitions
  },
  directives: {
    Resize,
    Touch
  }
})
