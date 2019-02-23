<template>
  <div>
    <h3>Quiz - {{ quiz.name }}</h3>
     <b-alert variant="danger" dismissible :show="show_finish">{{ $t('quiz_timeout_message') }}</b-alert>
    <b-list-group>
      <b-list-group-item>{{ $t('quiz_time_to_answer') }}: {{ count_minute }}m {{ count_seconds }}s</b-list-group-item>
    </b-list-group>

    <p style="padding-top:20px;">{{ quiz.case }}</p>

    <b-card no-body v-if="answering">
      <b-tabs pills card vertical end>
        <b-tab
          :title="'#' + (parseInt(index) + 1)"
          :active="index === 0"
          v-for="(sentence, index) in quiz.sentences"
          :key="sentence._id"
        >{{ sentence.question }}</b-tab>
      </b-tabs>
    </b-card>

    <p v-if="!answering">
      <span>Deseja responder agora?</span>
      <br>
      <b-button type="button" variant="primary" @click="startAnswer">Sim</b-button>
      <b-button type="button">Não</b-button>
    </p>
  </div>
</template>

<script>
import axios from "axios";
import { settings } from "../config/settings.js";

export default {
  data() {
    return {
      quiz: {},
      answering: false,
      count_minute: 2,
      count_seconds: 0,
      show_finish: false
    };
  },
  mounted() {
    axios
      .get(settings.restApi() + "/quiz/" + this.$route.params.id)
      .then(response => {
        this.quiz = response.data.data;

        if (localStorage.getItem('quiz_answer_minute') && localStorage.getItem('quiz_answer_second')) { // user return to quiz after stop time
          this.answering = true
          this.count_minute = localStorage.getItem('quiz_answer_minute')
          this.count_seconds = localStorage.getItem('quiz_answer_second')

          this.countSeconds();
        }
      
      })
      .catch(err => {
        // another types of error while trying to register user
      });
  },
  methods: {
    startAnswer() {
      this.answering = true
      this.countSeconds();
    },
    countSeconds() {
      if(this.answering){
        
        if (this.count_seconds == 0) {   
          this.count_seconds = 60       
          this.count_minute = this.count_minute - 1
        }

        if (this.count_minute > 0) {
          this.count_seconds = this.count_seconds - 1
          setTimeout(this.countSeconds, 1000)
        } else {
          this.count_seconds = 0;  
          this.count_minute = 0;
          localStorage.removeItem('quiz_answer_minute')
          localStorage.removeItem('quiz_answer_second')
          this.show_finish = true
          // put finish warning        
        }

      }
    },
    answerQuestion() {
      axios
      .post(settings.restApi() + "/quiz/answer/")
      .then(response => {
        this.quiz = response.data.data;

        if (localStorage.getItem('quiz_answer_minute') && localStorage.getItem('quiz_answer_second')) { // user return to quiz after stop time
          this.answering = true
          this.count_minute = localStorage.getItem('quiz_answer_minute')
          this.count_seconds = localStorage.getItem('quiz_answer_second')

          this.countSeconds();
        }
      
      })
      .catch(err => {
        // another types of error while trying to register user
      });
    }
  },
  beforeRouteLeave(to, from, next) {
    // stop time when user leaves the quiz
    if (this.answering && this.count_minute > 0) {
      localStorage.setItem('quiz_answer_minute', this.count_minute)
      localStorage.setItem('quiz_answer_second', this.count_seconds)
    }
    next()
  }
};
</script>

<style>
</style>
