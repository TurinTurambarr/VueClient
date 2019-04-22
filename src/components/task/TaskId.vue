<template>
    <div>
           <v-layout row class="mt-4">
            <v-flex xs12 sm6 offset-sm3>

                    <v-card 
                        class="mb-4"
                    >
                       <v-layout row>
                        <v-rating
                            v-model="task.rating"
                            length="5"
                            half-increments
                            readonly
                            class="mb-1"
                            color="yellow darken-3"
                            background-color="grey darken-1"
                        >
                        </v-rating>

                        <v-spacer></v-spacer>
               

                        <v-dialog v-model="dialog" persistent max-width="600px">
                            <v-btn slot="activator" color="primary" dark>Редактировать</v-btn>
                            <v-spacer></v-spacer>

                        <v-card>
                            <v-card-title>
                                <span class="headline">Редактировать</span>
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
                                    <v-text-field label="Создание списка задач" v-model="taskR.value"></v-text-field>
                                </v-flex>
                                <v-flex xs4>
                                    <v-btn color="primary" dark @click.prevent="pushTask(taskR.value)">Добавить задачу</v-btn>
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
                                        v-for="(tasked, i) in taskR.taskAll"
                                        :key="i">
                                        <b>{{i+1}}: </b> {{tasked.value}}
                                    </div>
                                </v-flex>
                                </v-layout>
                            </v-container>
                            <small>*Обязательные к заполнению поля</small>
                            </v-card-text>
                            <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" flat @click.prevent="dialog = !dialog">Закрыть</v-btn>
                            <v-btn color="green darken-1"  dark @click.prevent="checkList(task.id)"><v-icon dark right>check_circle</v-icon>Сохранить</v-btn>
                            </v-card-actions>
                        </v-card>
                        </v-dialog>

                        </v-layout>
                        
                        <v-img
                            src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                            height="200px"
                        >
                         <v-progress-circular
                                    class="progress-task"
                                    :rotate="-90"
                                    :size="50"
                                    :width="7.5"
                                    :value="valueDeterminate"
                                    color="white"
                                    >
                                    {{valueDeterminate + '%'}}
                                    </v-progress-circular>
                        </v-img>
                        <!-- {{oneTask}} <br>
                        {{task}} -->
                        <v-card-title primary-title>
                        <div>
                            <div class="headline">
                                {{task.name}}
                            </div>
                            <v-flex>
                                <div class="mt-3 mb-3"><span class="grey--text">Постановщик:</span> <span class="black--text">{{task.manager}}</span>  <span class="grey--text">— Исполнитель:</span> <span class="black--text">{{task.lastmanager}}</span></div>
                                <div clas="mt-3"><span class="grey--text">Срок выполнения задачи:</span> <span class="black--text">{{task.date}}</span></div>
                            </v-flex>
                        </div>
                        </v-card-title>
    
                        <v-list-tile 
                            v-for="(sub, i) in task.subtask"
                            :key="i" 
                        >
                                    <v-list-tile-action @click="checkTask(task.id, sub.valueChecked, i)">
                                    <v-checkbox
                                        v-model="sub.valueChecked"
                                    ></v-checkbox>
                                    </v-list-tile-action>

                                    <v-list-tile-content>
                                        <v-list-tile-sub-title>{{sub.value}}</v-list-tile-sub-title>
                                    </v-list-tile-content>
                                </v-list-tile>
                                <v-card-text>
                                {{task.comment}}
                                </v-card-text>
                     

                        <v-card-actions>
                             <v-btn icon to="/task" color="primary"> <v-icon dark center>arrow_back</v-icon></v-btn>
                            <v-spacer></v-spacer>
                            <v-btn flat color="red" dark @click="deleteTask(task.id)"><v-icon dark left>remove_circle</v-icon>Удалить</v-btn>
                        </v-card-actions>
                          
            
                        <!-- <v-btn @click="checkList(task.id)">Тест</v-btn> -->
                </v-card>

                {{task.subtask.length}}

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
    </div>
</template>

<script>
    import Vue from 'vue' 
    import firebase from 'firebase'

    export default {
        props: ['id'],
        data(){
            return {
                oneTask: null,
                dateDialog: false,
                dialog: false,
                rating: '',
                name: '',
                manager: '',
                lasttmanager: '',
                picker: '',
                landscape: false,
                picker: new Date().toISOString().substr(0, 10),
                reactive: false,
                tasks: [],
                taskR: {
                    value: '',
                    taskAll: []
                },
                comment: null,
                
            }
        },
        computed: {
            task () {
              const id = this.id 
              return this.oneTask === null ? this.$store.getters.taskById(id) : this.oneTask
            },
             valueDeterminate () {
                let checked = 0
        
                for(let i =0; i < this.task.subtask.length; i++) {
                    if(this.task.subtask[i].valueChecked){
                       checked++                    
                    }
                }
          
               return Math.ceil((100 / this.task.subtask.length) * checked)     
            }
        },
        methods: {
            pushTask(value){
                if(value!==''){
                    this.taskR.taskAll.push({
                        value,
                        valueChecked: false
                    })
                    this.taskR.value = null
                }
            },
            checkTask (key, checked, index) {
                const tasks = this.task.subtask

                Vue.$db.collection("tasks").doc(key)
                .update({
                    subtask: tasks.filter(() => {
                        return firebase.firestore.FieldValue.arrayUnion(`${tasks.valueChecked} : ${checked}`)
                    })
                })


                this.$store.dispatch('LOAD_TASKID', key)
                .then(()=>{
                    this.$store.dispatch('LOAD_TASK', key)
                })
                .catch(error=>console.log(error)) 
            },
            deleteTask(key){
                this.$store.dispatch('DELETE_TASK', key)
                    .then(()=>{
                         this.$router.push('/task')
                    })
                    .catch((error) => {
                        console.error("Error removing document: ", error);
                    });
            },
            async checkList(key){ 
                 const newTask = [...this.task.subtask, ...this.taskR.taskAll];
                 const taskNew = {
                    subtask: newTask
                 }
        
                 if (this.rating) {taskNew.rating = this.rating}
                 if (this.name) {taskNew.name = this.name}
                 if (this.manager) {taskNew.manager = this.manager}
                 if (this.picker) {taskNew.data = this.picker}
                 if (this.lastmanager) {taskNew.lastmanager = this.lastmanager}
                 if (this.comment) {taskNew.comment = this.comment}

                let elem = Vue.$db.collection("tasks").doc(key)

                await elem.update(taskNew)    

                this.$store.dispatch('LOAD_TASKID', key)

                .then(()=>{
                     this.$store.dispatch('LOAD_TASK', key)
                    // var obj = this.$store.getters.taskRerender
                    this.dialog = false
                    // return this.oneTask = obj
                })
                .catch(error=>console.log(error)) 
            }
        }
    }
</script>

<style scoped>
    .progress-task{
        position: absolute;
        /* background: #fff; */
        border-radius: 50%;
        top:15px;
        right:15px;
        box-shadow: 1px 1px 35px rgba(255,255,255, 1)
    }
</style>