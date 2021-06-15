<template>
  <v-container pa-0>
    <v-layout justify-space-around wrap>
      <BaseCard>
        <BaseMenu :items="showItems"/>
      </BaseCard>
    </v-layout>
  </v-container>
</template>

<script>
import { get } from 'vuex-pathify'
import { API, checkResponse } from '@/util'
import BaseCard from '@/components/core/BaseCard.vue'
import BaseMenu from '@/components/core/BaseMenu.vue'

export default {
  name: 'tablazatok',
  components: {
    BaseCard,
    BaseMenu
  },

  computed: {
    ...get(['user', 'views']),

    showItems () {
      return this.views.map(item => ({ path: '/table/' + item.id, title: item.label }))
    }
  },

  async created () {
    this.$store.set('pageTitle', 'Táblázatok')
    const response = await API.get('config/views/tablet/' + this.user.role)
    if (!checkResponse(response)) return
    this.$store.set('views', response.data)
  }
}
</script>
