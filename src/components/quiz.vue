<template>
  <div>
    <h3>Quiz - {{ quiz.name }}</h3>
     <b-alert variant="danger" :show="show_finish_time">{{ $t('quiz_timeout_message') }}</b-alert>
     <b-alert variant="success" :show="show_finish">{{ $t('quiz_finish_message') }}</b-alert>

    <b-list-group v-if="!show_finish && !show_finish_time">
      <b-list-group-item>{{ $t('quiz_time_to_answer') }}: {{ count_minute }}m {{ count_seconds }}s</b-list-group-item>
    </b-list-group>

    <p style="padding-top:20px;">{{ quiz.case }}</p>

    <b-card no-body v-if="answering && !show_finish">
      <b-tabs pills card vertical end v-model="tabIndex">
        <b-tab
          :title="'#' + (parseInt(index) + 1)"
          :active="index === 0"
          v-for="(sentence, index) in quiz.sentences"
          :key="sentence._id"              
        >{{ sentence.question }}
        
        <p style="margin-top:30px;" v-if="answered.indexOf(index) === -1">
          <b-button type="button" variant="primary" @click="answerQuestion(index, true)">Verdadeiro</b-button>
          <b-button type="button" @click="answerQuestion(index, false)">Falso</b-button>
        </p>

        <p v-if="answered.indexOf(index) !== -1">{{ $t('question_already_answered') }}</p>

        </b-tab>
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
      show_finish_time: false,
      show_finish: false,
      answer_mode: 'original',
      answered: [],
      tabIndex: 0
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

        if (this.count_minute >= 0) {
          this.count_seconds = this.count_seconds - 1          
          setTimeout(this.countSeconds, 1000)
        } else {
          this.count_seconds = 0;  
          this.count_minute = 0;
          localStorage.removeItem('quiz_answer_minute')
          localStorage.removeItem('quiz_answer_second')
          this.show_finish_time = true          
          // put finish warning        
        }

      }
    },
    answerQuestion(tab_index, question_answer) {
      const user = JSON.parse(localStorage.getItem('user'))

      axios
        .post(settings.restApi() + "/quiz/answer/" + this.$route.params.id + "/" + user._id,
          {
            answer: {
              'question_number': tab_index,
              'question_answer': question_answer,
              'answer_mode': this.answer_mode
            }
          })
          .then(response => {
              console.log(response)   
              this.answered.push(tab_index)
              this.tabIndex++
              
              if (this.quiz.sentences.length <= this.tabIndex) {
                this.show_finish = true
              }
              
              
          })
          .catch(err => {
            
          });
    },
    finishQuiz() {
      axios
        .post(settings.restApi() + "/quiz/finish/" + this.$route.params.id + "/" + user_id)
          .then(response => {

          })
          .catch(err => {
            
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
