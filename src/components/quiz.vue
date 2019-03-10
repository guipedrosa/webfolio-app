<template>
  <div v-if="show_all">
    <h3>Quiz - {{ quiz.name }}</h3>
     <b-alert variant="danger" :show="show_finish_time">{{ $t('quiz_timeout_message') }}</b-alert>
     <b-alert variant="success" :show="show_finish">{{ $t('quiz_finish_message') }}</b-alert>
     <b-alert :show="show_practice_mode && !show_correct_answers">{{ $t('quiz_in_practice_mode') }}</b-alert>

     <!-- Quiz correction alert -->
     <b-alert variant="warning" :show="show_reviewed">{{ $t('quiz_show_reviewed') }}</b-alert>
     <p v-if="show_reviewed && !show_correct_answers">
      <span>{{ $t('quiz_show_reviewed_answers') }}</span>
      <br>
      <b-button type="button" variant="primary" @click="startToSeeCorrection">Sim</b-button>
    </p>


    <b-list-group v-if="!show_finish && !show_finish_time && !show_correct_answers">
      <b-list-group-item>{{ $t('quiz_time_to_answer') }}: {{ count_minute }}m {{ count_seconds }}s</b-list-group-item>
    </b-list-group>

    <p style="padding-top:20px;">{{ quiz.case }}</p>

    <b-card no-body v-if="(answering && !show_finish) || show_correct_answers">
      <b-tabs pills card vertical end v-model="tabIndex">
        <b-tab
          :title="'#' + (parseInt(index) + 1)"
          :active="index === 0"
          v-for="(sentence, index) in quiz.sentences"
          :key="sentence._id"              
        >{{ sentence.question }}

        <p v-if="show_correct_answers">
          <br />
          <br />
          -------
          <br />
          Resposta correta: <b-badge :variant='sentence.correct_answer ? "success" : "secondary"'>{{ sentence.correct_answer ? "Verdadeiro" : "Falso" }} </b-badge><br />
          Comentário: {{ sentence.commented_answer }}
        </p>
        
        <p style="margin-top:30px;" v-if="answered.indexOf(index) === -1 && !show_finish && !show_finish_time && !show_reviewed">
          <b-button type="button" variant="primary" @click="answerQuestion(index, true)">Verdadeiro</b-button>
          <b-button type="button" @click="answerQuestion(index, false)">Falso</b-button>
        </p>

        <p v-if="answered.indexOf(index) !== -1">{{ $t('question_already_answered') }}</p>

        </b-tab>
      </b-tabs>
    </b-card>

    <p v-if="!answering && !show_finish && !show_finish_time && !show_correct_answers" id="initial-question">
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
      show_all: false,
      quiz: {},
      answering: false,
      count_minute: 2,
      count_seconds: 0,
      show_finish_time: false,
      show_finish: false,
      answer_mode: 'original',
      answered: [],
      tabIndex: 0,
      show_practice_mode: false,
      show_reviewed: false,
      show_correct_answers: false
    };
  },
  created() {
    const user = JSON.parse(localStorage.getItem('user'))

    axios
        .get(settings.restApi() + "/quiz/" + this.$route.params.id + '/' + user._id)
        .then(response => {
          this.quiz = response.data.data;  
          
          if (this.quiz.practice_mode != undefined && this.quiz.practice_mode === true) {
            this.answer_mode = 'practice'
            this.show_practice_mode = true
          }

          if (this.quiz.reviewed != undefined && this.quiz.reviewed === true) {
            this.show_reviewed = true
          } 
          
          // if answered, close Quiz
          if (response.data.message == 'answered' && this.answer_mode == 'original') {
            this.show_finish = true
          }

          if (localStorage.getItem('quiz_answer_minute') && localStorage.getItem('quiz_answer_second')) { // user return to quiz after stop time
            this.answering = true
            this.count_minute = localStorage.getItem('quiz_answer_minute')
            this.count_seconds = localStorage.getItem('quiz_answer_second')

            this.countSeconds();
          }
          this.show_all = true
        })
        .catch(err => {
          // another types of error while trying to register user
        });
  },
  methods: {
    startAnswer() {
      this.answering = true
      this.countSeconds()
    },
    startToSeeCorrection() {
      this.show_correct_answers = true
      this.$scrollTo('#initial-question', 500)      
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
              this.answered.push(tab_index)
              this.tabIndex++
              
              if (this.quiz.sentences.length <= this.tabIndex) {
                this.show_finish = true
              }
              
              
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
