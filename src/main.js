import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './App.vue'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

const moment = require('moment');
require('moment/locale/ru');

Vue.use(ElementUI)
Vue.use(require('vue-moment'), {moment});

Vue.filter('lower', function(value) {
  return value.toLowerCase();
});

new Vue({
  render: h => h(App),
}).$mount('#app')
