import Vue from 'vue'
import App from './App.vue'
import router from './router'
//解决Uncaught (in promise)
import Router from 'vue-router'
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/element-variables.scss'
import moment from 'moment'
import echarts from 'echarts'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$moment = moment;
Vue.prototype.$echarts = echarts 
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
