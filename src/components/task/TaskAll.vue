<template>
    <div>
        <v-layout row class="mt-4">
            <v-flex xs12 sm6 offset-sm3>
                <v-text-field
                     label="Поиск"
                     v-model="searchTerm"
                     :hint="filteredTask.length"
                >
                </v-text-field>
             
                <h1 class="mb-5">Ваши задачи</h1>
    
                    <v-card 
                        v-for="(task, i) in filteredTask"
                        :key="task.id"
                        class="mb-4"
                    >
                        <v-rating
                            v-model="task.rating"
                            length="5"
                            readonly
                            half-increments
                            class="mb-1"
                            color="yellow darken-3"
                            background-color="grey darken-1"
                        >
                        </v-rating>
                        <v-img
                            src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                            height="200px"
                        >
                         <v-progress-circular
                                    class="progress-task"
                                    :rotate="-90"
                                    :size="50"
                                    :width="7.5"
                                    :value="valueDeterminate(i)"
                                    color="white"
                                    >
                                    {{valueDeterminate(i) + '%'}}
                                    </v-progress-circular>
                        </v-img>

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
                        
                        <v-card-actions>
                        <v-btn flat :to="'/task/'+task.id">Открыть</v-btn>
                        <v-btn flat color="error" @click="deleteTask(task.id)">Удалить</v-btn>
                        <v-spacer></v-spacer>

                        <!-- <v-tooltip left> -->
                            <v-btn icon @click="task.isShow = !task.isShow">
                                
                                <v-icon>{{ task.isShow ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
                            </v-btn>
                            <!-- <span>Left tooltip</span>
                        </v-tooltip> -->
                        </v-card-actions>


                        <v-slide-y-transition>
                            <div v-show="task.isShow">
                                <v-list-tile 
                                        v-for="(sub, i) in task.subtask"
                                        :key="i" 
                                >
                                    <v-list-tile-action @click="checkTask(task.id, sub.valueChecked, i, task.subtask)">
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
                            </div>
                        </v-slide-y-transition>
                </v-card>

            </v-flex>
        </v-layout>            
    </div>
</template>

<script>

    import Vue from 'vue' 

    export default {
        data(){
            return {
                 show: false,
                 searchTerm: null,
                 checked : false 
            }
        },
        computed: {
            tasks () {
                return this.$store.getters.myTask
            },
            filteredTask(){
                let taskFilter = this.tasks
            
                if(this.searchTerm)
                    taskFilter = taskFilter.filter(t => t.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) >= 0 
                    || t.lastmanager.toLowerCase().indexOf(this.searchTerm.toLowerCase()) >= 0
                )
                  
                return taskFilter
            }
        },
        methods: {
            deleteTask(key){
                this.$store.dispatch('DELETE_TASK', key)
                    .then(()=>{
                        this.$store.dispatch('LOAD_TASK')
                    })
                    .catch((error) => {
                        console.error("Error removing document: ", error);
                    });
            },
            valueDeterminate (index) {
                let checked = 0
        
                for(let i =0; i < this.filteredTask[index].subtask.length; i++) {
                    if(this.filteredTask[index].subtask[i].valueChecked){
                       checked++                    
                    }
                }
          
               return Math.ceil((100 / this.filteredTask[index].subtask.length) * checked)     
            },
            checkTask (key, checked, index, arrayTask) {
                const tasks = arrayTask

                Vue.$db.collection("tasks").doc(key)
                .update({
                    subtask: tasks.filter(() => {
                        return firebase.firestore.FieldValue.arrayUnion(`${tasks.valueChecked} : ${checked}`)
                    })
                })


                // this.$store.dispatch('LOAD_TASKID', key)
                // .then(()=>{
                //     this.$store.dispatch('LOAD_TASK', key)
                // })
                // .catch(error=>console.log(error)) 
            },
            reverse(value){
                let str = value
                let i = 0;
                for(let j = str.length - 1; j > 0; j--){
                    for (i = 0;  i < j; i++) {
                    temp = str[i];
                    str[i] = str[j];
                    str[j] = temp;
                    }
                }
                return str
            }
        },
        created(){
              this.$store.dispatch('LOAD_TASK')
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