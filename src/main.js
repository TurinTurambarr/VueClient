import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import * as fb from 'firebase'
// import VueChartist from 'v-chartist';
import 'firebase/firestore'
// import { Query, QuerySnapshot } from '@firebase/firestore-types';
import 'vuetify/dist/vuetify.min.css'
import 'chartist/dist/chartist.min.css'
import 'vue-cal/dist/vuecal.css'


// Vue.use(VueCal)
// Vue.use(VueChartist)
Vue.use(Vuetify)

Vue.config.productionTip = false

const firebaseApp = fb.initializeApp({
 
})

const db = firebaseApp.firestore()
db.settings({
  timestampsInSnapshots: true
})

Vue.$db = db

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created () {
    fb.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoLoginUser', user)
      }
    })
  }
})
