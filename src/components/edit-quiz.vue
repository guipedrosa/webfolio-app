<template>

<div>
    <b-form-group label-cols="4" label-cols-lg="2" :label="$t('admin_form_quiz_name')" label-for="quiz-name">
        <b-form-input id="quiz-name" v-model="quiz_name" />
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

export default {
    data() {
        return {
            quiz_name: "",
            quiz_case: "",
            items: [],
            question: "",
            correct_answer: "",
            comment: "",
            options: [{value: true, "text": "Verdadeiro"}, {value: false, "text": "Falso"}]
        }
    },
    methods: {
        addItem() {            
            this.items.push({ sentence: this.question, correct_answer: this.correct_answer, comment: this.comment, action: 'X' })
        },
        saveQuiz() {

            axios
                .post(settings.restApi() + "/quiz/",
                {
                    name:name,
                    open_date: open_date,
                    close_date: close_date,
                    time_to_answer: time_to_answer,
                    study_sugestion: study_sugestion,
                    study_sugestion_date: study_sugestion_date,
                    case: quiz_case,
                    sentences: items
                })
                .then(response => {
                    
                    
                })
                .catch(err => {
                    
                });

        }
    }


}

</script>

<style>

</style>