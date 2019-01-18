import Vue from 'vue'
import axios from "axios";
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'

Vue.config.productionTip = false

const axi = axios.create({
  baseURL: "http://127.0.0.1:8088",
  crossdomain: true
});
Vue.prototype.$axi = axi;
Vue.prototype.$bus = new Vue();

const moment = require('moment');
require('moment/locale/ru');

Vue.use(ElementUI);
Vue.use(require('vue-moment'), { moment });

Vue.filter('lower', function (value) {
  return value.toLowerCase();
});

new Vue({
  render: h => h(App),
}).$mount('#app')
