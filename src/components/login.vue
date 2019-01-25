<template>
  <div>
    <b-alert variant="danger"
             dismissible
             :show="showDismissibleAlert"
             @dismissed="showDismissibleAlert=false">
      {{ message_login }}
    </b-alert>

    <b-card class="text-left login-card">
      <b-form @submit="doLogin">
        <b-form-group id="email-login"
                      :label="$t('field_email_login') + ':'"
                      label-for="exampleInput1">
          <b-form-input id="email-login"
                        type="email"
                        v-model="form.email"
                        required
                        :placeholder="$t('field_email_login_placeholder')">
          </b-form-input>
        </b-form-group>
        <b-form-group id="passowrd-login"
                      :label="$t('field_password_login') + ':'"
                      label-for="exampleInput1">
          <b-form-input id="password-login"
                        type="password"
                        v-model="form.password"
                        required
                        :placeholder="$t('field_password_placeholder')">
          </b-form-input>
        </b-form-group>
        
        <b-button type="submit" variant="primary">{{ $t('button_login_submit') }}</b-button>
       {{ $t('or_login_with') }} 
       <fb-signin-button
          :params="fbSignInParams"
          @success="onSignInSuccess"
          @error="onSignInError">
          {{ $t('login_with_facebook') }}
        </fb-signin-button>
        
        <hr>

       <p>
        {{ $t('login_or_register_message') }} <b-button to="/register">{{ $t('menu_register') }}</b-button>
      </p>
      </b-form>      

    </b-card>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  data () {
    return {
      message_login: "",
      showDismissibleAlert: false,
      form: {
        email: '',
        password: ''
      },
      fbSignInParams: {
        scope: 'public_profile,email',
        return_scopes: true
      }
    }
  },
  methods: {
      onSignInSuccess (response) {
        FB.api('/me', dude => {
          // 
          localStorage.setItem('tokensession', dude.id)
          // console.log(`Good to see you, ${dude.name}.`)
          localStorage.setItem('user', dude)
          this.$router.push({ path: '/dashboard' })          
        })
      },
      onSignInError (error) {
        // console.log('OH NOES', error)
        this.message_login = this.$t('wrong_user_or_password')
        this.showDismissibleAlert = true
      },
      doLogin(evt) {
        evt.preventDefault()
        
        axios
          .post('http://localhost:3000/api/login', 
            this.form, 
            { "Content-Type": "application/x-www-form-urlencoded" }
          )
          .then(response => {
            localStorage.setItem('tokensession', response.data.token)
            localStorage.setItem('user', response.data.user)
            this.$router.push({ path: '/dashboard' })
          })
          .catch(err => {
            if (err.response.status == 403) {
              this.message_login = this.$t('wrong_user_or_password')
              this.showDismissibleAlert = true
            }
          })
  
      }
    }
}
</script>

<style>
.fb-signin-button {
  /* This is where you control how the button looks. Be creative! */
  display: inline-block;
  padding: 6px 10px;
  border-radius: 3px;
  background-color: #4267b2;
  color: #fff;
  vertical-align: middle;
  cursor: pointer;
}

.facebook-button {
  margin-top: 30px;
}

.card-text, .card-title {
  text-align: center;
}

@media (min-width: 576px) {
  .login-card {
    max-width: 100%;
    align-items: center;    
    margin: auto;
  }
}
</style>
