<template>
<div>
            <v-layout row>
                   <v-btn dark color="primary" class="back" icon to="/clients">
                                    <v-icon>chevron_left</v-icon>
                 </v-btn> 
                <v-flex xs12 sm6 offset-sm3 class="mt-4">
                <v-card 
                    class="mb-3 elevation-4"
                    v-for="(client, i) in subclient"
                    :key="client.id"
                    @mouseleave="show(i, false)"
                >
                    <v-layout
                        column
                    >
                            <v-card-title class="pl-1 pt-2 pb-1" @mouseover="show(i, true)">
                            <div class="display-1 pl-3 pt-0">{{client.lastname +' '+ client.firstname +' '+ client.fathername}}</div>
                            <v-spacer></v-spacer>
                            <v-btn dark color="primary" icon :to="{name: 'position', params: {id: client.id, idCollection: id, idPosition: keyId}}">
                                <v-icon>chevron_right</v-icon>
                            </v-btn>
                            </v-card-title>
                    </v-layout>

                    <v-slide-y-transition>
                        <v-list two-line v-if="client.isShow">
                        <v-list-tile>
                                <v-list-tile-action>
                                <v-icon color="indigo">phone</v-icon>
                                </v-list-tile-action>

                                <v-list-tile-content>
                                <v-list-tile-title>{{client.phone}}</v-list-tile-title>
                                <v-list-tile-sub-title>Мама</v-list-tile-sub-title>
                                </v-list-tile-content>

                                <v-list-tile-action>
                                <v-icon>chat</v-icon>
                                </v-list-tile-action>
                            </v-list-tile>

                            <v-divider inset></v-divider>

                            <v-list-tile @click="">
                                <v-list-tile-action>
                                <v-icon color="indigo">mail</v-icon>
                                </v-list-tile-action>

                                <v-list-tile-content>
                                <v-list-tile-title>{{client.email}}</v-list-tile-title>
                                <v-list-tile-sub-title>Personal</v-list-tile-sub-title>
                                </v-list-tile-content>
                            </v-list-tile>
                            </v-list>
                         </v-slide-y-transition>
                    </v-card>
                </v-flex>
            </v-layout>
        </div>
</template>

<script>
    export default {
        props: {
            id: {
                type: String,
                required: true
            },
            keyId: {
                type: String,
                required: true
            }
        },
        data () {
          return {
                itemsG:['Муж', 'Жен'],
                dialog: false,
                school: '',
                firstname: '',
                lastname:'',
                fathername: '',
                escort: '',
                degree: '',
                phone: '',
                email: '',
                gender: '',
                convoir: []
          }
        },
        computed: {
            subclient () {
                return this.$store.getters.getAllPositionClient
            }
        },
        methods: {
            show (index, bool) {
                this.subclient[index].isShow = bool
            },
            addNewsubclient (key, subcey) {
                // перенести в главный компонент
                let subclient = {
                    firstname: this.firstname,
                    lastname: this.lastname,
                    fathername: this.fathername,
                    phone: this.phone,
                    email: this.email,
                    gender: this.gender
                }


                this.$store.dispatch('ADD_SUBCLIENT', {subclient, key, subcey})
                .then(()=>{
                    this.dialog = false
                })
                .catch((error)=>{
                    console.log(error)
                })

                this.firstname = ''
                this.lastname = ''
                this.fathername = ''
                this.phone = ''
                this.email = ''
            },
            deleteClient (id) {
                const key = this.id
                const subcollection = this.keyId
                const elID = id

                this.$store.dispatch('DELETE_SUBCLIENT', {key, subcollection, elID})
                 .then(()=>{
                     this.$store.dispatch('SET_SUBCLIENT', {key, subcollection})
                    console.log('Усспех')
                 })
                 .catch((error)=>{
                     console.log(error.messange)
                 })
            }
        },
        created () {
            const key = this.id
            const subcollection = this.keyId
            this.$store.dispatch("SET_SUBCLIENT", {key, subcollection})
        }
    }
</script>

<style scoped>
    .back {
        position: fixed;
        left:40px;
        top:100px
    }
</style>