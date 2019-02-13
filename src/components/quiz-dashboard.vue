<template>
    <div>
        <h3>Quiz Dashboard</h3>

        <b-table striped hover :items="items" :fields="fields">
             <template slot="name" slot-scope="data">
               <router-link :to="{ path: '/quiz/' + data.item._id}" replace>{{ data.item.name }}</router-link>
            </template>    
        </b-table>    
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
                { key: 'name', label: this.$t('table_quiz_name'), formatter: 'linkToQuiz' }, 
                { key: 'close', label: this.$t('table_quiz_close_date') }
            ]
        }
    },    
    mounted() {
        axios
            .get(settings.restApi() + '/quiz')
            .then(response => {
                
                return this.items = response.data.data.map(function( elem, index, a ){    

                    return { _id: elem._id, name: elem.name, close: elem.close_date }
                })
            })
            .catch(err => {         
                
            })
    },
    methods: {
        linkToQuiz(value) {
            return `${value}`
        }
    }
    
}
</script>

<style>

</style>
