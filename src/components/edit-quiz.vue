<template>

<div>
    <b-form-group label-cols="4" label-cols-lg="2" :label="$t('admin_form_quiz_name')" label-for="quiz-name">
        <b-form-input id="quiz-name" v-model="quiz_name" />
    </b-form-group>

    <b-form-group label-cols="4" label-cols-lg="2" :label="$t('admin_form_quiz_open_date')" label-for="quiz-open-date">
        <b-form-input id="quiz-open-date" v-model="quiz_open_date" v-mask="'##/##/#### ##:##:##'" />
    </b-form-group>

    <b-form-group label-cols="4" label-cols-lg="2" :label="$t('admin_form_quiz_close_date')" label-for="quiz-close-date">
        <b-form-input id="quiz-close-date" v-model="quiz_close_date" v-mask="'##/##/#### ##:##:##'" />
    </b-form-group>

    <b-form-group label-cols="4" label-cols-lg="2" :label="$t('admin_form_quiz_case')" label-for="quiz-case">
        <b-form-textarea
            id="textarea"
            v-model="quiz_case"
            placeholder="..."
            rows="3"
            max-rows="6"
        />
    </b-form-group>
    
    <b-form-group label-cols="4" label-cols-lg="2" :label="$t('admin_form_add_question')" label-for="question">
        <b-form-input id="question" v-model="question" />
    </b-form-group>

    <b-form-group>
        Resposta correta:
     <b-form-select v-model="correct_answer" :options="options" />    
    </b-form-group>
     
    <b-form-group>
        <b-form-textarea
            id="textarea"
            v-model="comment"
            placeholder="Comentário..."
            rows="3"
            max-rows="6"
        />
    </b-form-group>

    <b-button variant="outline-success" @click="addItem">{{ $t('admin_form_add_question_button') }}</b-button>

    <hr> 
    
    <b-card :title="quiz_name">
        <b-card-text>
        {{ quiz_case }}
        </b-card-text>

        <b-card-text>

            <b-table striped hover :items="items" />
            
        </b-card-text>
    </b-card>
    
    <br>
    <b-form-group>
        <b-button variant="outline-success" @click="saveQuiz">{{ $t('admin_form_save_quiz') }}</b-button>
    </b-form-group>

</div>

</template>


<script>
import axios from 'axios'
import { settings } from '../config/settings.js'
import * as moment from 'moment'

export default {
    data() {
        return {
            quiz_name: "",
            quiz_case: "",
            quiz_open_date: "",
            quiz_close_date: "",
            items: [],
            question: "",
            correct_answer: "",
            comment: "",
            study_sugestion: "",
            study_sugestion_date: "",
            options: [{value: true, "text": "Verdadeiro"}, {value: false, "text": "Falso"}]
        }
    },
    methods: {
        addItem() {            
            this.items.push({ question: this.question, correct_answer: this.correct_answer, commented_answer: this.comment, action: 'X' })
        },
        saveQuiz() {
            
            axios
                .post(settings.restApi() + "/quiz/",
                {
                    name: this.quiz_name,
                    open_date: moment(this.quiz_open_date, 'DD/MM/YYYY HH:mm:ss').format('YYYY-MM-DD HH:mm:ss'),
                    close_date: moment(this.quiz_close_date, 'DD/MM/YYYY HH:mm:ss').format('YYYY-MM-DD HH:mm:ss'),
                    case: this.quiz_case,
                    sentences: this.items
                })
                .then(response => {
                    console.log(response)
                    
                })
                .catch(err => {
                    console.log('error')                    
                });

        }
    }


}

</script>

<style>

</style>