import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/kodol',
      component: () => import(/* webpackChunkName: "kodol" */ './views/Kodol.vue')
    },
    {
      path: '/atad',
      component: () => import(/* webpackChunkName: "atad" */ './views/Atad.vue')
    },
    {
      path: '/munkalap',
      component: () => import(/* webpackChunkName: "munkalap" */ './views/Munkalap.vue')
    },
    {
      path: '/seasearch',
      component: () => import(/* webpackChunkName: "seasearch" */ './views/Seasearch.vue')
    },
    {
      path: '/norma',
      component: () => import(/* webpackChunkName: "norma" */ './views/Norma.vue')
    },
    {
      path: '/tablazatok',
      component: () => import(/* webpackChunkName: "tablazatok" */ './views/Tablazatok.vue')
    },
    {
      path: '/table/:id',
      component: () => import(/* webpackChunkName: "table" */ './views/Table.vue')
    // },
    // {
    //   path: '/targyi-eszkoz-erkeztetes',
    //   props: { sztorno: false },
    //   component: () => import(/* webpackChunkName: "targyi-eszkoz-erkeztetes" */ './views/targyi-eszkoz/Erkeztetes.vue')
    // },
    // {
    //   path: '/targyi-eszkoz-sztornozas',
    //   props: { sztorno: true },
    //   component: () => import(/* webpackChunkName: "targyi-eszkoz-sztornozas" */ './views/targyi-eszkoz/Erkeztetes.vue')
    }
  ]
})
