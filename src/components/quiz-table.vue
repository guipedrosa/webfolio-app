<template>
    <div>
        <h3> {{ quizTableTitle }} </h3>
        <b-alert :show="show_closed_quiz" dismissible>{{ $t('closed_quiz_message') }}</b-alert>

        <b-table striped hover :items="items" :fields="fields">
            <template slot="name" slot-scope="data">
               <router-link :to="resolveLink(data.item)" v-if="showLink(data.item)" replace>{{ data.item.name }}</router-link>
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
    props: ['quizTableTitle', 'adminEdit'],
    computed: {
        fields() {
            return  [
                { key: 'name', label: this.$t('table_quiz_name') }, 
                { key: 'close_date', label: this.$t('table_quiz_close_date') },
                { key: 'closed', label: this.$t('table_quiz_closed') }
            ]
        }
    },    
    mounted() {
        const practice_str = this.$t('on_practice_mode')
        const reviewed_str = this.$t('quiz_reviewed')
            
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

                    if (elem.reviewed) {
                        closed_str += " <br /> (" + reviewed_str + ")"
                    }

                    return { _id: elem._id, name: quiz_name, close_date: date_close, closed: closed_str, practice_mode: practice_mode, reviewed: elem.reviewed }
                })
            })
            .catch(err => {         
                
            })
    },
    methods: {
        showLink(item) {

            // if practice mode
            if (item.practice_mode != undefined && item.practice_mode === true) {
                return true
            }

            if (item.closed === 'Sim' && !item.reviewed) {
                return false
            }

            return true
        },
        resolveLink(item) {
            if (this.$props.adminEdit == "1") {
                return { path: '/admin/quiz/' + item._id}
            }

            return { path: '/quiz/' + item._id}
        }
    }
    
}
</script>

<style>

</style>
