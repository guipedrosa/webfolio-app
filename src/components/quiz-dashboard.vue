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
import * as moment from 'moment'

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
            .get(settings.restApi() + '/quiz/')
            .then(response => {
                
                return this.items = response.data.data.map(function( elem, index, a ){    
                    let date_close = ''
                    if (elem.close_date != undefined) {
                        date_close = moment(elem.close_date).format("D/M/Y HH:mm:ss")
                    }
                    return { _id: elem._id, name: elem.name, close: date_close }
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
