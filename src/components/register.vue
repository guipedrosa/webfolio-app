<template>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group id="exampleInputGroup1"
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
      <b-form-group id="exampleInputGroup2"
                    :label="$t('field_name') + ':'"
                    label-for="exampleInput2">
        <b-form-input id="exampleInput2"
                      type="text"
                      v-model="form.name"
                      required
                      :placeholder="$t('field_name_placeholder')">
        </b-form-input>
      </b-form-group>
      <b-form-group id="born-date"
                    :label="$t('field_born_date') + ':' "
                    label-for="born-date-input">
        <b-form-input id="born-date-input"
                      type="text"
                      v-mask="$t('born_date_mask')"
                      v-model="form.born_date"
                      required
                      :placeholder="$t('born_date_pattern')">
        </b-form-input>
      </b-form-group>
      <b-form-group id="gender-choice"
                    :label="$t('field_gender') +':'"
                    label-for="gender-select">
        <b-form-select id="gender-select"
                      :options="genders"
                      required
                      v-model="form.gender">
        </b-form-select>
        
      </b-form-group>
      <b-button type="submit" variant="primary">{{ $t('button_register_submit') }}</b-button>
      <b-button type="reset" variant="danger">{{ $t('button_register_reset') }}</b-button>
    </b-form>
    
</template>

<script>
export default {
  data () {
    return {
      form: {
        email: '',
        name: '',
        gender: null
      },
      show: true
    }
  },
  computed: {
      genders() {
        return [
          { text: this.$t('select_gender_label'), value: null },
          { text: this.$t('select_gender_male'), value: 'm' },
          { text: this.$t('select_gender_female'), value: 'f' }
        ]
      }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.form));
    },
    onReset (evt) {
      evt.preventDefault();
      /* Reset our form values */
      this.form.email = '';
      this.form.name = '';
      this.form.food = null;
      this.form.checked = [];
      /* Trick to reset/clear native browser form validation state */
      this.show = false;
      this.$nextTick(() => { this.show = true });
    }
  }
}
</script>

<style>

</style>
