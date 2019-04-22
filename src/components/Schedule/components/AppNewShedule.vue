<template>
    <div>
        <v-container fluid>
            <v-layout>
                <v-flex xs8>
                    <v-layout>
                        <v-flex xs12>
                            <v-btn class="primary" @click="newEvent()">Создание нового события</v-btn> 
                            <v-btn class="primary" @click="currentEvent()">Просмотр текущий событий</v-btn> 
                        </v-flex>
                        <v-flex xs12>
                             <v-text-field 
                  name="title" 
                  label="Название Коллекции" 
                  type="text"
                  :rules="[v => !!v || 'Название Коллекции обязательно']"
                  v-model="title"
                  required
                  >
                  </v-text-field>
                        </v-flex>
                    </v-layout>
                </v-flex>

                <v-flex xs4>
                    
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                event: {
                    start: '2019-02-19 10:35',
                    end: '2019-02-19 11:30',
                    title: 'Doctor appointment',
                    content: '<i class="v-icon material-icons">local_hospital</i>',
                    class: 'blue-event'
                }
            }
        },
        computed: {

        },
        methods: {
            newEvent () {

            },
            currentEvent () {

            }
         },
        created () {

        }
    }
</script>

<style scoped>

</style>