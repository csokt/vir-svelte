<template>
  <v-container pa-0>
    <v-layout justify-space-around wrap>
      <BaseCard>
        <v-card-text class="pb-0">
          <v-text-field
            ref="element"
            v-model="search"
            label="Cikkszám keresése"
            clearable
          />
        </v-card-text>
        <SmartList
          ref="seadocs"
          :apiUrl="apiUrl"
          itemkey = "fullpath"
          value="name"
          layout="list"
          @select="onSelect($event)"
          @change="onChange"
        />
      </BaseCard>
    </v-layout>
  </v-container>
<!--
-->
</template>

<script>
import { get } from 'vuex-pathify'
import { EventBus, Log } from '@/util'
import BaseCard from '@/components/core/BaseCard.vue'
import SmartList from '@/components/core/SmartList.vue'

export default {
  name: 'seasearch',
  components: {
    BaseCard,
    SmartList
  },

  data () {
    return {
      search: '',
      items: [],
      isLoading: false
    }
  },

  computed: {
    ...get(['defaults', 'user']),

    apiUrl () {
      if (!this.search || this.search.length < 5) return ''
      return 'tir/seafile/' + this.search + '/' + this.user.role
    }
  },

  methods: {
    onChange (content) {
      if (this.apiUrl) {
        Log('search', { string: this.search })
      }
      if (this.apiUrl && !content.length) {
        EventBus.$emit('inform', { type: 'alert', variation: 'warning', message: 'Nincs találat!' })
      }
    },

    onSelect (item) {
      Log('show', { file: item.fullpath })
      const publicUrl = 'https://mobilszefo.hopto.org:19540/d/a5008cf7b7484ef6b34e/'
      let win = window.open(publicUrl + 'files/?p=' + item.fullpath, '_blank')
      if (win) {
        win.focus()
      } else {
        alert('Engedélyezze a felugró ablakokat ezen az oldalon!')
      }
    }
  },

  created () {
    this.$store.set('pageTitle', 'Technológiai dokumentációk')
    this.$store.set('showFilterIcon', false)
    this.search = this.defaults.cikkszam
  }
}
</script>
