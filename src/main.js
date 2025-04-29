import Vue from 'vue';
import App from './App.vue';
import router from "./router"; // Импортируем роутер
import store from './store';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import VueTheMask from 'vue-the-mask';

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueTheMask);

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app');
