/* eslint-disable prefer-destructuring,global-require */
import Vue from 'vue';
import axios from 'axios';
import GAuth from 'vue-google-oauth2';
import VeeValidate from 'patched-vee-validate';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';


const gauthOption = {
  clientId: '189837993104-m33001n0efpduueg3kp68mmv3qeu0967.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account',
};

if (process.env.NODE_ENV === 'development') {
  let apiUrl = null;
  const myEnv = require('@/env');

  if (myEnv !== null) {
    apiUrl = myEnv.apiUrl;
  }
  if (apiUrl) {
    axios.defaults.baseURL = apiUrl;
  }
}

router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    if (!localStorage.getItem('accessToken')) {
      router.push('/login');
      return;
    }
  }
  if (to.path === '/login') {
    if (localStorage.getItem('accessToken')) {
      router.push('/');
      return;
    }
  }
  next();
});

Vue.config.productionTip = false;

const veeConfig = {
  errorBagName: 'veeErrors',
  aria: true,
  classNames: {},
  classes: false,
  delay: 0,
  dictionary: null,
  i18nRootKey: 'validations',
  events: 'input|blur',
  fieldsBagName: 'fields',
  inject: true,
  locale: 'en',
  strict: true,
  validity: false,
};

Vue.use(VeeValidate, veeConfig);

Vue.use(GAuth, gauthOption);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app');
