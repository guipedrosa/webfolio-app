<template>
  <b-card>
    
    <b-alert :variant="registerSuccess" :show="created_user_flag" dismissible>{{ created_user_msg }}</b-alert>

    <Login v-if="show_login"></Login>

    <b-form @submit="onSubmit" @reset="onReset" v-if="show_register">
      <b-form-group id="group1"
                    :label="$t('field_email_address') + ':'"
                    label-for="exampleInput1"
                    :description="$t('email_disclaimer')">
        <b-form-input id="exampleInput1"
                      type="email"
                      v-model="form.email"
                      required
                      :placeholder="$t('field_email_address_placeholder')">
        </b-form-input>
      </b-form-group>
      <b-form-group id="group2"
                    :label="$t('field_name') + ':'"
                    label-for="exampleInput2">
        <b-form-input id="exampleInput2"
                      type="text"
                      v-model="form.name"
                      required
                      :placeholder="$t('field_name_placeholder')">
        </b-form-input>
      </b-form-group>

      <b-form-group id="group3"
                    :label="$t('field_gender') +':'"
                    label-for="gender-select">
        <b-form-select id="gender-select"
                      :options="genders"
                      required
                      v-model="form.gender">
        </b-form-select>
      </b-form-group>
        
        <b-alert :show="dismissCountDown"
                dismissible
                variant="danger"
                @dismissed="dismissCountDown=0"
                @dismiss-count-down="countDownChanged">
          <p>{{ $t('password_not_equal') }}</p>
          <b-progress variant="danger"
                      :max="dismissSecs"
                      :value="dismissCountDown"
                      height="4px">
          </b-progress>
        </b-alert>

         <b-form-group id="group4"
                    :label="$t('field_password') + ':' "
                    label-for="password">
          <b-form-input id="password"
                        type="password"
                        v-model="form.password"
                        required>
          </b-form-input>
        </b-form-group>

       <b-form-group id="group5"
                    :label="$t('field_confirm_password') + ':' "
                    label-for="confirm-password">
        <b-form-input id="confirm-password"
                      type="password"
                      v-model="form.confirm_password"
                      required
                      v-on:input="verifySamePassword">
        </b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">{{ $t('button_register_submit') }}</b-button>
      <b-button type="reset" variant="danger">{{ $t('button_register_reset') }}</b-button>

    </b-form>
  </b-card>
</template>

<script>
import axios from 'axios';
import Login from './login.vue'
import { settings } from '../config/settings.js'

export default {
  data () {
    return {
      form: {
        email: '',
        name: '',
        gender: null
      },
      show_register: true,
      show_login: false,
      dismissSecs: 10,
      dismissCountDown: 0,
      created_user_flag: false,
      registerSuccess: 'danger',
      created_user_msg: ''
    }
  },
  components: {
    Login
  },
  computed: {
      genders() {
        return [
          { text: this.$t('select_gender_label'), value: null },
          { text: this.$t('select_gender_male'), value: 'm' },
          { text: this.$t('select_gender_female'), value: 'f' },
          { text: this.$t('select_gender_not_informed'), value: 'n' },

        ]
      }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault();
      
      if (this.verifySamePassword()) {

      delete this.form.confirm_password
      
      axios
        .post(settings.restApi() + '/users', 
          this.form, 
          { "Content-Type": "application/x-www-form-urlencoded" }
        )
        .then(response => {

          if (response.data.message === 'success') { // created success
            this.created_user_flag = true
            this.created_user_msg = this.$t('user_created_success')
            this.registerSuccess = 'success'            
            this.resetForm()

            // Show login after created user
            this.show_register = false;
            this.show_login = true;

          } else if (response.data.message === 'user-exists') { // user already exists (email key)
            this.registerSuccess = 'danger'
            this.created_user_msg = this.$t('user_already_exists')
            this.created_user_flag = true

            this.form.password = ''
            this.form.confirm_password = ''
          }                     

        })
        .catch(err => { // another types of error while trying to register user         
          this.created_user_flag = true
          this.registerSuccess = 'danger'
          this.created_user_msg = this.$t('user_created_fail')
          console.log(err)          
          
          this.form.password = ''
          this.form.confirm_password = ''
        })
      
      }

      // alert(JSON.stringify(this.form));
    },
    onReset (evt) {
      evt.preventDefault()
      this.resetForm()
    },
    verifySamePassword() {
       if (this.form.password !== this.form.confirm_password) {
         this.dismissCountDown = 6
         return false
       } else {
         this.dismissCountDown = 0
         return true
       }
    },
    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert () {
      this.dismissCountDown = this.dismissSecs
    },
    resetForm() {      
      this.form.email = ''
      this.form.name = ''         
      this.form.password = ''
      this.form.confirm_password = ''
      this.form.gender = ''
    }
  }
}
</script>

<style>

</style>
