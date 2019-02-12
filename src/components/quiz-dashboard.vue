<template>
    <div>
        <h3>Quiz Dashboard</h3>

        <b-table striped hover :items="items" :fields="fields"></b-table>    
    </div>
</template>

<script>
import axios from 'axios'
import { settings } from '../config/settings.js'

export default {
    data () {
        return {           
            items: []
        }
    },
    computed: {
        fields() {
            return  [
                { key: 'name', label: this.$t('table_quiz_name') }, 
                { key: 'close', label: this.$t('table_quiz_close_date') }
            ]
        }
    },    
    mounted() {
        axios
            .get(settings.restApi() + '/quiz')
            .then(response => {
                
                return this.items = response.data.data.map(function( elem, index, a ){    

                    return { name: elem.name, close: elem.close_date }
                })
            })
            .catch(err => {         
                
            })
    }
    
}
</script>

<style>

</style>
