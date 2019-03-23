import Vue from 'vue'
import BootstrapVue from "bootstrap-vue"
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

import VueRouter from 'vue-router'
import i18n from './i18n'
import VueTheMask from 'vue-the-mask'
import FBSignInButton from 'vue-facebook-signin-button'
import VueScrollTo from 'vue-scrollto'

Vue.use(VueTheMask)
Vue.use(BootstrapVue)
Vue.use(VueRouter)
Vue.use(FBSignInButton) 
Vue.use(VueScrollTo)

import Home from './components/home.vue'
import Register from './components/register.vue'
import QuizDashboard from './components/quiz-dashboard.vue'
import Quiz from './components/quiz.vue'
import Login from './components/login.vue'
import Dashboard from './components/dashboard.vue'
import AdminDashboard from './components/admin-dashboard.vue'
import AdminQuiz from './components/admin-quiz.vue'
import EditQuiz from './components/edit-quiz.vue'
import About from './components/about.vue'

const routes = [
  { path: '/', component: Home, name: 'Home', meta:{ breadcrumb: [ { name: 'Home' } ] } },
  { path: '/register', component: Register, name: 'Register', meta:{ breadcrumb: [ { name: 'Register' } ] } },
  
  { path: '/quiz-dashboard', component: QuizDashboard, name: "quiz-dashboard", 
    meta:{ 
      requiresAuth: true,
      breadcrumb: [ { name: 'Quiz Dashboard' } ] 
    } 
  },
  { path: '/quiz/:id', component: Quiz, name: "quiz", 
    meta:{ 
      requiresAuth: true,
      breadcrumb: [ 
          { name: 'Quiz Dashboard', link: '/quiz-dashboard' }, 
          { name: 'Quiz' } 
      ] 
    } 
  },
  { path: '/login', component: Login },
  { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true, breadcrumb: [ { name: 'Dashboard' } ] }, name: "dashboard" },
  { path: '/admin', component: AdminDashboard, meta: { requiresAuth: true, profile: "admin", breadcrumb: [ { name: 'Admin Dashboard' } ] }},
  { path: '/admin-quiz', component: AdminQuiz, 
    meta: { requiresAuth: true, profile: "admin", 
            breadcrumb: [ 
                { name: "Admin Dashboard", link: '/admin'},
                { name: 'Admin Quiz' } 
            ] }
  },  
  { path: '/edit-quiz', component: EditQuiz, 
    meta: { requiresAuth: true, profile: "admin", 
          breadcrumb: [ 
              { name: "Admin Dashboard", link: '/admin'},
              { name: 'Admin Quiz', link: '/admin-quiz' },
              { name: 'Edit Quiz' } 

          ] }
  }, 
  { path: '/about', component: About, name: "About", meta:{ breadcrumb: [ { name: 'About' } ] } },

]

const router = new VueRouter({
  routes
})

const user = JSON.parse(localStorage.getItem('user'))

// Check if user is password veryfied
router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('tokensession') == null) {
          next({
              path: '/login',
              params: { nextUrl: to.fullPath }
          })
      } else {
        // Admin user
        if(to.matched.some(record => record.meta.profile)) {
            if(user.profile == "admin"){
                next()
            }
            else{
                next({
                  path: '/dashboard',
                  params: { nextUrl: to.fullPath }
                })
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


/* 
 * Service Worker
 */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/serviceWorker.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}


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