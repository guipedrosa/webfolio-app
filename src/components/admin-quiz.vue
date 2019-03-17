<template>
    <div>
        <b-list-group>
            <b-list-group-item><b-link to="/new-quiz"> Criar novo Quiz </b-link></b-list-group-item>
        </b-list-group>

        <QuizTable style="margin-top:20px;"></QuizTable>

    </div>
</template>


<script>
import QuizTable from './quiz-table.vue'

export default {
    components: {
        QuizTable
    },
}

</script>

<style>

</style>

