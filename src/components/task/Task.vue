<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <v-dialog v-model="dialog" persistent max-width="600px">
                    <v-btn class="ml-0" slot="activator" color="primary" dark>Добавить задание</v-btn>
                    <v-spacer></v-spacer>

                <v-card>
                    <v-card-title>
                        <span class="headline">Добавить задание</span>
                    </v-card-title>
                    <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                        <v-flex xs12>
                            <div class="text-xs-center">
                                    <v-rating
                                    v-model="rating"
                                    half-increments
                                    color="yellow darken-3"
                                    background-color="grey darken-1"
                                    empty-icon="$vuetify.icons.ratingFull"
                                    hover
                                    ></v-rating>
                            </div>
                        </v-flex>
                        <v-flex xs12 sm12>
                            <v-text-field label="Название задачи*" required hint="Ваша задача должна быть тут!" v-model="name"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6>
                            <v-text-field label="Постановщик задачи" v-model="manager"></v-text-field>
                        </v-flex>
                            <v-flex xs12 sm6>
                            <v-text-field label="Исполнитель задачи" v-model="lastmanager"></v-text-field>
                        </v-flex>
                        <v-flex xs9>
                            <v-text-field label="Дата исполнения" :value="picker" v-model="picker"></v-text-field>
                        </v-flex>
                        <v-flex xs3>
                        <v-btn color="primary" dark @click="dateDalog = !dateDalog">Выбрать дату</v-btn>
                        </v-flex>
                        <v-flex xs8>
                            <v-text-field label="Создание списка задач" v-model="task.value"></v-text-field>
                        </v-flex>
                        <v-flex xs4>
                            <v-btn color="primary" dark @click.prevent="pushTask(task.value)">Добавить задачу</v-btn>
                        </v-flex>
                        <v-flex xs12>
                            <v-textarea
                            label="Комментарии, дополнительные материалы"
                            hint="Добавьте ваш текс сюда"
                            v-model="comment"
                            ></v-textarea>
                        </v-flex>
                        <v-flex xs12>
                            <div 
                                v-for="(tasks, i) in task.taskAll"
                                :key="i">
                                <b>{{i+1}}: </b>  {{tasks.value}}
                            </div>
                        </v-flex>
                        </v-layout>
                    </v-container>
                    <small>*Обязательные к заполнению поля</small>
                    </v-card-text>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click.prevent="dialog = !dialog">Закрыть</v-btn>
                    <v-btn color="green darken-1"  dark @click.prevent="addTask"><v-icon dark right>check_circle</v-icon>Сохранить</v-btn>
                    <v-snackbar v-model="snackbar" bottom light color="error">
                        <v-icon>warning</v-icon> {{snackbarText}}
                    </v-snackbar>
                    </v-card-actions>
                </v-card>
                </v-dialog>
                
               
               

                 <v-dialog
                            v-model="dateDalog"
                            max-width="290"
                            >
                            <v-card>
                                <v-card-title class="headline">Выберите дату</v-card-title>
                                <v-date-picker v-model="picker" :landscape="landscape" :reactive="reactive"></v-date-picker>
                                <v-btn color="green darken-1" flat="flat" @click="dateDalog = !dateDalog" > Закрыть </v-btn>
                                <v-btn color="green darken-1" flat="flat" @click="dateDalog = !dateDalog"> Выбрать дату </v-btn>
                            </v-card>
                </v-dialog>
            </v-flex>
        </v-layout>

        <app-task-all></app-task-all>
    </v-container>
</template>

<script>
    import TaskAll from './TaskAll'
    import Vue from 'vue'
    
    export default {
        data(){
            return {
                dialog: false,
                name: '',
                manager: '',
                lastmanager: '',
                dateDalog: false,
                comment:'',
                picker: new Date().toISOString().substr(0, 10),
                landscape: false,
                reactive: false,
                rating: 4.5,
                task: {
                    value: '',
                    taskAll: []
                },
                snackbar: false,
                snackbarText:null

            }
        },
        components: {
           'app-task-all': TaskAll
        },
        methods: {
            frfr() {

            },
            pushTask(value){
                if(value!==''){
                    this.task.taskAll.push({
                        value,
                        valueChecked: false
                    })
                    this.task.value = null
                }
            },
            addTask(){
                let taskAll = this.$store.getters.myTask.task
               
                const taskNew = {
                    rating: this.rating,
                    name: this.name,
                    manager: this.manager,
                    lastmanager: this.lastmanager,
                    date: this.picker,
                    comment: this.comment, 
                    subtask: this.task.taskAll
                }

                 this.$store.dispatch('NEW_TASK', taskNew)
                        .then(() => {
                            this.$store.dispatch('LOAD_TASK')
                            this.dialog = false
                        })
                        .catch(error=>console.log(`error  ${error}`))
            },
            updated(){
            console.log('updated')
                this.frfr()
            },
            mounted() {
                console.log('mounted')
                this.frfr()
            }
        }
    }
</script>

<style scoped>

</style>