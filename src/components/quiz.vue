<template>
    <div>
        <h3>Quiz - {{ quiz.name }}</h3>
        <b-list-group>
            <b-list-group-item>{{ $t('quiz_time_to_answer') }}: {{ quiz.time_to_answer }}m</b-list-group-item>            
        </b-list-group>        
        <p style="padding-top:20px;">{{ quiz.case }}</p>
        <b-card no-body>
            <b-tabs pills card vertical end>                
                <b-tab :title="'#' + (parseInt(index) + 1)" :active="index === 0" v-for="(sentence, index) in quiz.sentences" :key="sentence._id">
                    {{ sentence.question }}
                </b-tab>
            </b-tabs>
        </b-card>

        <br>
        <p>Você já respondeu 2/6 <b-button type="submit" variant="primary" disabled>Finalizar</b-button></p>
    </div>
</template>

<script>
import axios from 'axios'
import { settings } from '../config/settings.js'

export default {
  data () {
    return {
        quiz: {}
    }
  },
  mounted() {
      console.log('kalsjdlkajsdlkjaksjdlas')
        axios
            .get(settings.restApi() + '/quiz/5c58943266147c1198fa9232')
                .then(response => {
                    this.quiz = response.data.data
                    console.log(response)
                })
                .catch(err => { // another types of error while trying to register user         
                   
                })
  }
}
</script>

<style>

</style>
