import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import * as moment from 'moment/moment.js';
import App from './App.vue'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue();

Vue.use(ElementUI);

require('moment/locale/ru');
Vue.use(require('vue-moment'), { moment });

Vue.filter('lower', function (value) {
  if (value === undefined)
    return "";
  return value.toLowerCase();
});

new Vue({
  render: h => h(App),
}).$mount('#app')
