<template>
    <div>
        <b-list-group>
            <b-list-group-item><b-link to="/edit-quiz"> Criar novo Quiz </b-link></b-list-group-item>
        </b-list-group>

        <QuizTable style="margin-top:20px;" quiz-table-title="Edit Quiz" admin-edit="1"></QuizTable>

    </div>
</template>


<script>
import QuizTable from './quiz-table.vue'

export default {
    components: {
        QuizTable
    }
}

</script>

<style>

</style>