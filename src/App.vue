<template>
  <div id="app">
    <b-navbar toggleable="md" type="dark" variant="info">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand to="/">WebFolio</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item to="/login" v-if="!logged()">{{ $t('menu_login') }}</b-nav-item>
          <b-nav-item to="/register" v-if="!logged()">{{ $t('menu_register') }}</b-nav-item>
          <b-nav-item to="/quiz-dashboard">{{ $t('menu_quiz') }}</b-nav-item>
          <b-nav-item to="/about">{{ $t('menu_about') }}</b-nav-item>
          <b-nav-item @click="logout" v-if="logged()">{{ $t('menu_logout') }}</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown text="Lang" right>
            <b-dropdown-item href="#" @click="changeLang('en', $event)">EN</b-dropdown-item>
            <b-dropdown-item href="#" @click="changeLang('pt-br', $event)">BR</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>

      </b-collapse>
    </b-navbar>

    <div class="container container-main">
      <breadcrumbs v-if="this.$route.path !== '/' && this.$route.path !== '/login'"></breadcrumbs>
      <router-view></router-view>
    </div>
  
    
    <footer class="footer">
      <div class="container">
        <span>Webfolio 2019</span>
      </div>
    </footer>
    
  </div>
</template>

<script>
import Breadcrumbs from './components/breadcrumbs.vue'

export default {
  components: {
    Breadcrumbs
  },
  methods: {
    changeLang(ln, e) {
      e.preventDefault()
      this.$i18n.locale = ln
    },
    logged() {
      return (localStorage.getItem('tokensession') !== null)
    },
    logout() {
      localStorage.removeItem('tokensession')
      localStorage.removeItem('user')
      this.$router.push({ path: '/login' })
    }
  }

}
</script>

<style lang="scss">

/* Sticky footer styles
-------------------------------------------------- */
html {
  position: relative;
  min-height: 100%;
}
body {
  /* Margin bottom by footer height */
  margin-bottom: 60px;
}
.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  /* Set the fixed height of the footer here */
  height: 60px;
  line-height: 60px; /* Vertically center the text there */
  background-color: #107b8c;
  color: #fff;
  text-align: center;
}


/* Custom page CSS
-------------------------------------------------- */
/* Not required for template or sticky footer method. */

body > .container {
  padding: 60px 15px 0;
}

.footer > .container {
  padding-right: 15px;
  padding-left: 15px;
}

code {
  font-size: 80%;
}

.container-main {
  padding: 15px;
}

@media (min-width: 576px) {
  .container {
      max-width: 100%;
  }
}
</style>
