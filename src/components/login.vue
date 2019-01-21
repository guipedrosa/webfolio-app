<template>
  <div>
    <b-card :title="$t('welcome_short_message')"
          img-src="./src/assets/img/open-image.png"
          img-alt="Image"
          img-top
          tag="article"
          class="mb-2 card-title">
      <p class="card-text">
        {{ $t('welcome_long_message') }}
      </p>
    </b-card>
    
    <b-card class="text-left login-card">
      <b-form>
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

export default {
  data () {
    return {
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
          console.log(`Good to see you, ${dude.name}.`)
        })
      },
      onSignInError (error) {
        console.log('OH NOES', error)
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
