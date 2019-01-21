import Vue from 'vue'
import BootstrapVue from "bootstrap-vue"
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

import VueRouter from 'vue-router'
import i18n from './i18n'
import VueTheMask from 'vue-the-mask'
import FBSignInButton from 'vue-facebook-signin-button'

Vue.use(VueTheMask)
Vue.use(BootstrapVue)
Vue.use(VueRouter)
Vue.use(FBSignInButton) 

import Register from './components/register.vue'
import Quiz from './components/quiz.vue'
import Login from './components/login.vue'

const routes = [
  { path: '/', component: Login },
  { path: '/register', component: Register },
  { path: '/quiz', component: Quiz },
  { path: '/login', component: Login },
  
]

const router = new VueRouter({
  routes
})

new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')


window.fbAsyncInit = function() {
  FB.init({
    appId      : '431103770762225',
    cookie     : true,  // enable cookies to allow the server to access the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.8' // use graph api version 2.8
  });
};
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));