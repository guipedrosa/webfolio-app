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
import Dashboard from './components/dashboard.vue'

const routes = [
  { path: '/', component: Login },
  { path: '/register', component: Register },
  { path: '/quiz', component: Quiz },
  { path: '/login', component: Login },
  { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true }, name: "dashboard" },
]

const router = new VueRouter({
  routes
})

// Check if user is password veryfied
router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
      if (localStorage.getItem('tokensession') == null) {
          next({
              path: '/login',
              params: { nextUrl: to.fullPath }
          })
      } else {
        let user = localStorage.getItem('user')
        if(to.matched.some(record => record.meta.is_admin)) {
            if(user.is_admin == 1){
                next()
            }
            else{
                next()
            }
        } else {
            next()
        }
    }
  }  else {

    // Redirect to dashboard if logged in
    if (to.matched.some(record => record.path == '/login')) {
      if (localStorage.getItem('tokensession') !== null) {
        router.push({ path: '/dashboard'})
      }
    }

    next()
  }
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