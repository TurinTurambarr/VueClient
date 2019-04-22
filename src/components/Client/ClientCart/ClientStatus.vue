<template>
    <div>
            

            <v-checkbox
            label="Особый статус клиента (Назначается при пробном занятии)"
            v-model="backPost.checkbox"
            ></v-checkbox>
            <v-btn class="ml-0 mt-0" color="primary" @click="checkbox = !checkbox">ответ клиента</v-btn>
            <div v-if="checkbox" class="mt-3">
                <h3 class="headline mb-2">{{backPosts.checkboxStatus ? 'Клиент купил абонимент' : 'Клиент не купил абонимент'}}</h3>
                <div>{{backPosts.responseStatus}}</div>
            </div>
            
            <v-scroll-y-transition mode="out-in">
                <v-stepper v-model="e1" v-if="!checkbox">
                    <v-stepper-header>
                    <v-stepper-step :complete="e1 > 1" step="1">Удалось ли довести клиента до продажи?</v-stepper-step>
                    <v-divider></v-divider>
                    <v-stepper-step :complete="e1 > 2" step="2">Описание ответа клиента</v-stepper-step>
                    </v-stepper-header>

                    <v-stepper-items>
                    <v-stepper-content step="1">
                        <v-card class="pl-3">
                            <v-checkbox
                                label="Была ли продажа?"
                                v-model="statusClient.checkboxStatus"
                                ></v-checkbox>
                        </v-card>

                        <v-btn class="mt-4" color="primary" @click="e1 = 2"> Вперед</v-btn>
                    </v-stepper-content>

                    <v-stepper-content step="2">
                        <v-card>
                            <v-textarea
                            name="input-7-1"
                            :label="statusClient.checkboxStatus ? 'Коментарий клиента (если был)': 'Что послужило причиной отказа?'"
                            v-model="statusClient.responseStatus"
                            ></v-textarea>
                        </v-card>

                        <v-btn @click="e1 = 1" flat>Назад</v-btn>
                        <v-btn
                        color="primary"
                        @click="newStatus()"
                        >
                        Сохранить
                        </v-btn>
                    </v-stepper-content>
                    </v-stepper-items>
                </v-stepper>
            </v-scroll-y-transition>
    </div>
</template>

<script>
import Vue from 'vue'

    export default {
        props: {
            id: {
                type: String,
                required: true
            }
        },
        data () {
            return {
                checkbox:true,
                idE: String,
                backPost : Object,
                statusClient : {
                    checkbox: true,
                    checkboxStatus: false,
                    responseStatus: undefined,
                    firstVisit: false
                },
                e1: 0
            }
        },
        computed: {
            backPosts () {
                return this.backPost ? this.backPost : this.statusClient
            }
        },
        methods: {
            newStatus () {
               const clientStatus = this.statusClient
               const id = this.id
               

                if(this.backPosts.firstVisit){
                    this.checkbox = true

                    Vue.$db.collection(`allclients/${id}/status`).doc(this.idE).update({
                        checkbox: this.backPost.checkbox,
                        checkboxStatus: clientStatus.checkboxStatus,
                        responseStatus: clientStatus.responseStatus ? clientStatus.responseStatus : 'Обратная связь не полученна'
                    })
                    .then(()=>{
                    })
                    .error((err)=>{console.log(err)})

                    this.$store.dispatch('GET_STATUS', id)
                    .then(()=>{
                         this.renderStatus()
                    })
                    .error((err)=>{
                        console.log(err)
                    })
                    
                    return
                }
                
                this.statusClient.firstVisit = true
                this.checkbox = true



                Vue.$db.collection(`allclients/${id}/status`).add(clientStatus)
                .then(()=>{
                })
                .error((err)=>{console.log(err)})

                this.$store.dispatch('GET_STATUS', id)
                    .then(()=>{
                         this.renderStatus()
                    })
                    .error((err)=>{
                        console.log(err)
                    })
            },
            renderStatus () {
                const id = this.id
            this.$store.dispatch('GET_STATUS', id)
                .then((payload)=>{
                    this.backPost = this.$store.getters.getStatus
                     this.idE = this.$store.getters.getId
                })
                .error((err)=>{
                    console.log(err)
                })
            }
        },
        mounted () {
            this.renderStatus()
        },
        created () {
            const id = this.id
            this.$store.dispatch('GET_STATUS', id)
                .then((payload)=>{
                    console.log(payload)
                })
                .error((err)=>{
                    console.log(err)
                })
        }
    }
</script>

<style scoped>

</style>