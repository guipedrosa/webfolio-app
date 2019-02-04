<template>
    <div>
        <h2>Quiz</h2>

        <b-card no-body>
            <b-tabs pills card vertical end>
                <b-tab title="#1" active>
                    <b-form-group label="Pergunta sobre o caso 1, escolha uma resposta!">
                        <b-form-radio-group buttons stacked button-variant="primary" v-model="selected" name="butons1" :options="options">
                        </b-form-radio-group>
                    </b-form-group>                 
                    <b-button type="submit" variant="success">Responder</b-button>
                </b-tab>
            </b-tabs>
        </b-card>

        <br>
        <p>Você já respondeu 2/6 <b-button type="submit" variant="primary" disabled>Finalizar</b-button></p>
    </div>
</template>

<script>
export default {
  data () {
    return {
      selected: null, // Must be an array reference!
      options: [
        {text: 'Orange', value: 'orange'},
        {text: 'Apple', value: 'apple'},
        {text: 'Pineapple', value: 'pineapple'},
        {text: 'Grape', value: 'grape'}
      ]
    }
  }
}
</script>

<style>

</style>
