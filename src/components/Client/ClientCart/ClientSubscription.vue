<template>
    <div>
        <v-card flat class="pr-4 pl-4 pb-4 pt-4">
             <h3 class="headline mb-2">Купить Абонимент</h3>
<!-- {{client}}

{{client.id}} -->


                <v-container fluid>
                    <v-layout row wrap align-center>
                    <v-flex xs12 sm5>
                        <v-subheader v-text="'Выберите направление'"></v-subheader>
                    </v-flex>
                    <v-flex xs12 sm6>
                        <v-select
                        :items="direction"
                        v-model="current.title"
                        :menu-props="{ maxHeight: '400' }"
                        label="Выберите посещаемое направление"
                        persistent-hint
                        ></v-select>
                    </v-flex>
                     
                    
                    <v-flex xs12 sm5 v-if="current.title">
                        <v-subheader v-text="'Выберите группу'"></v-subheader>
                    </v-flex>

                    <v-flex xs12 sm6 v-if="current.title">
                        <v-select
                        :items="groups"
                        v-model="current.group"
                        :menu-props="{ maxHeight: '400' }"
                        label="Посещаеммые группы"
                        persistent-hint
                        ></v-select>
                    </v-flex>

                    <v-flex xs12 sm5>
                        <v-subheader v-text="'Цена абонимент'"></v-subheader>
                    </v-flex>

                    <v-flex xs12 sm6>
                         <v-text-field
                        v-model="current.price"
                        label="Введите цену"
                        chips
                        persistent-hint
                        ></v-text-field>
                    </v-flex>

                    <v-flex xs12 sm5>
                        <v-subheader v-text="'Количество занятий'"></v-subheader>
                    </v-flex>

                    <v-flex xs12 sm6>
                        <v-select
                        :items="[1,3,6,8,12,16]"
                        v-model="current.count"
                        label="Число занятий"
                        chips
                        persistent-hint
                        ></v-select>
                    </v-flex>
                    <v-btn class="mt-4" color="primary" @click="newAboniment()">Оформить</v-btn>
                    </v-layout>
                </v-container>
                 <v-layout>
                        <v-flex>
                            <v-layout>
                            <v-flex xs6>
                             <h3 class="headline mb-2">Список купленных абониментов</h3>
                            </v-flex>
                            <v-flex xs6>
                                <v-btn @click="allPrice()" class="primary">Посмотреть общую сумму</v-btn>
                                <v-title class="ml-5"  right v-if="priceE">Общая сумма: <b>{{priceE}} рублей</b></v-title>
                            </v-flex>
                            </v-layout>

                            <v-list  two-line class="mt-2">
                                <template v-for="(item, index) in allSubscription">
                                    <v-list-tile
                                    :key="item.id"
                                    avatar
                                    ripple
                                    >
                                    <v-list-tile-content>
                                        <v-list-tile-title>{{'Направление:  ' + item.title }}</v-list-tile-title>
                                        <v-list-tile-sub-title class="text--primary">{{ 'Группа:  ' + item.group }}</v-list-tile-sub-title>
                                    </v-list-tile-content>

                                    <v-list-tile-content>
                                        <v-list-tile-title>{{ 'Колличество: ' + item.count }}</v-list-tile-title>
                                    </v-list-tile-content>
                                    <v-list-tile-content>
                                        <v-list-tile-title>{{ 'Цена: ' + item.price }}</v-list-tile-title>
                                    </v-list-tile-content>

                                    <v-list-tile-action>
                                        <v-list-tile-action-text>{{ item.date }}</v-list-tile-action-text>
                                        <v-btn icon @click="deleteSubscrib(item.id)">
                                        <v-icon
                                        color="yellow darken-2"
                                        >
                                        delete
                                        </v-icon>
                                        </v-btn>
                                    </v-list-tile-action>

                                    </v-list-tile>

                                    <v-divider
                                    v-if="index + 1 < allSubscription.length"
                                    :key="index"
                                    ></v-divider>
                                </template>
                            </v-list>
                        </v-flex>
                </v-layout>
        </v-card>
    </div>
</template>

<script>

    import Vue from 'vue'

    export default {
        props:{
            client: {
                type: Object,
                required: true
            }
        },
        data(){
            return {
                current: {
                    title: '',
                    group: '',
                    price: '',
                    count: Number
                },
                priceE : 0,
                odlArray: this.client.print,
                backObj: {},
                group: '',
                states: [1,2,3],
            }
        },
        computed: {
            direction () {
                return this.client.print.map(element => { return element.title });                
            },
            groups () {
                let map = []
                this.client.print.map(element => {
                    if(element.title.toLowerCase() == this.current.title.toLowerCase()){
                        return map.push(element.subtitle)
                    } 
                })
                return map
            },
            allSubscription () {
                return this.$store.getters.getAllSubscription
            }
        },
        methods: {
            newAboniment () {
                const id = this.client.id
                const newSubscription = this.current

                this.$store.dispatch('NEW_SUBSCRIPTION', {newSubscription, id})
                .then(()=>{
                    console.log('ура все ок')
                })
                .catch((err)=>{
                    console.log(err.messange)
                })
            },
            deleteSubscrib(idSub){
               const id = this.client.id

               this.$store.dispatch('DELETE_SUBSCRIPTION', {id, idSub}) 
                .then(()=>{
                    
                })
                .catch((err)=>{
                    console.log(err)
                })
            },
            allPrice () {
                let endPrice = 0

                for(let item of this.allSubscription){
                    if(item.price){
                        endPrice += item.price
                    }
                }
                
                return this.priceE = endPrice
            }
        },
        created(){
           const id = this.client.id

           this.$store.dispatch('GET_ALLSUBSCRIPTION', id)
                .then(()=>{
                    
                })
                .catch((err)=>{
                    console.log(err.messange)
            })
        },
        beforeDestroy(){
            this.priceE = 0
        }
    }
</script>

<style scoped>

</style>