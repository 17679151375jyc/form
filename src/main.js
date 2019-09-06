import Vue from 'vue'
import App from './App'
import router from './router'
import vant from 'vant'
import 'vant/lib/index.css'
Vue.use(vant)
import './assets/css/index.css'
import vConsole from 'vconsole'
new vConsole()
import './Api_axios/api'
Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
