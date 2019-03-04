<template>
    <div>
        <h3>Quiz Dashboard</h3>
        <b-alert :show="show_closed_quiz" dismissible>{{ $t('closed_quiz_message') }}</b-alert>

        <b-table striped hover :items="items" :fields="fields">
            <template slot="name" slot-scope="data">
               <router-link :to="{ path: '/quiz/' + data.item._id}" v-if="showLink(data.item)" replace>{{ data.item.name }}</router-link>
               <span v-if="!showLink(data.item)" style="color:grey;">{{ data.item.name }}</span>
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
            items: [],
            show_closed_quiz: false
        }
    },
    computed: {
        fields() {
            return  [
                { key: 'name', label: this.$t('table_quiz_name'), formatter: 'linkToQuiz' }, 
                { key: 'close_date', label: this.$t('table_quiz_close_date') },
                { key: 'closed', label: 'Fechado' }
            ]
        }
    },    
    mounted() {
        const practice_str = this.$t('on_practice_mode')

        axios
            .get(settings.restApi() + '/quiz/')
            .then(response => {
                
                return this.items = response.data.data.map(function( elem, index, a ){    
                    let date_close = ''
                    let closed_str = ''
                    
                    let practice_mode = false
                    if (elem.practice_mode != undefined && elem.practice_mode === true) {
                        practice_mode = true
                    }

                    if (elem.close_date != undefined) {
                        date_close = moment(elem.close_date).format("D/M/Y HH:mm:ss")                        
                        closed_str = (moment().isSameOrAfter(elem.close_date) ? 'Sim' : 'Não')
                    }

                    let quiz_name = elem.name                     
                    quiz_name = (practice_mode ? quiz_name + ' (' + practice_str + ')' : quiz_name)

                    return { _id: elem._id, name: quiz_name, close_date: date_close, closed: closed_str, practice_mode: practice_mode }
                })
            })
            .catch(err => {         
                
            })
    },
    methods: {
        linkToQuiz(value) {
            return `${value}`
        },
        showLink(item) {

            // if practice mode
            if (item.practice_mode != undefined && item.practice_mode === true) {
                return true
            }

            if (item.closed === 'Sim') {
                return false
            }

            return { path: '/quiz/' + item._id}
        },
    }
    
}
</script>

<style>

</style>
