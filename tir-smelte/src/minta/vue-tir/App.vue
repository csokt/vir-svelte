<template>
  <v-app>
    <v-toolbar color="blue darken-1" dark app>
      <v-icon @click.stop="$router.go(-1)">
        arrow_back
      </v-icon>
      <v-spacer></v-spacer>
      <v-toolbar-title v-text="this.pageTitle"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat v-if="showFilterIcon" @click.stop="$store.set('showFilter', !showFilter)">
        Szűrő
      </v-btn>
    </v-toolbar>

    <v-content>
      <router-view/>
    </v-content>

    <v-footer app height=36 color="grey lighten-3" fixed>
      <v-layout column>
        <SmartInform/>
        <div style="text-align: center;">
          <span>
            {{user.name}}
            {{version}}
          </span>
        </div>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
import { get } from 'vuex-pathify'
// import { API, checkResponse } from '@/util'
import { API, Log } from '@/util'
import SmartInform from '@/components/core/SmartInform.vue'
import Home from '@/views/Home.vue'

export default {
  name: 'App',
  components: {
    SmartInform
  },

  data () {
    return {
    }
  },

  computed: {
    ...get(['version', 'pageTitle', 'showFilterIcon', 'showFilter', 'user']),

    title () {
      return this.pageTitle
    }
  },

  methods: {
    async getUser (token) {
      if (token) {
        const response = await API.post('accounts/pulltoken/' + token)
        if (response.ok) {
          API.setHeader('Authorization', response.data.loopback_token)
          Home.methods.gotUserQR.call(this, response.data.user.tir_azonosito)
        }
      } else {
        const response = await API.post('tir/login')
        if (response.ok) {
          API.setHeader('Authorization', response.data.id)
        }
      }
      this.$router.replace('/')

      window.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection // compatibility for Firefox and chrome
      const pc = new RTCPeerConnection({ iceServers: [] })
      const noop = function () {}
      pc.createDataChannel('') // create a bogus data channel
      pc.createOffer(pc.setLocalDescription.bind(pc), noop) // create offer and set local description
      const that = this
      pc.onicecandidate = function (ice) {
        if (ice && ice.candidate && ice.candidate.candidate) {
          const myIP = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(ice.candidate.candidate)[1]
          that.$store.set('privateIP', myIP)
          pc.onicecandidate = noop
        }
      }
      const response = await API.get('accounts/ip')
      this.$store.set('publicIP', response.data.ip)
    }
  },

  created () {
    this.$router.afterEach((to, from) => {
      Log('navigate')
    })
    this.getUser(this.$route.query.token_uid)
  },

  mounted () {
    // console.log('NODE_ENV', process.env.NODE_ENV)
    // console.log('breakpoint', this.$vuetify.breakpoint)
    window.oncontextmenu = function (event) {
      event.preventDefault()
      event.stopPropagation()
      return false
    }
  }
}
</script>
