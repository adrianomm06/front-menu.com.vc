import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueTheMask from 'vue-the-mask'
import money from 'v-money'
import moement from 'vue-moment'

Vue.config.productionTip = false
Vue.use(VueTheMask)
Vue.use(money)
Vue.use(moement)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
