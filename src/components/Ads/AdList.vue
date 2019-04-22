<template>
<div>
            <v-layout row >
                 <v-flex xs12 sm6 offset-sm3>
                     <v-btn dark color="primary" icon to="/clients">
                            <v-icon>chevron_left</v-icon>
                    </v-btn> 
                    <v-dialog v-model="dialog" persistent max-width="1200px">
                    <v-btn slot="activator" color="primary" dark left>Новый клиент</v-btn>
                    <v-card>
                        <v-card-title>
                        <span class="headline">Новый Клиент</span>
                        </v-card-title>
                        <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                            <v-flex xs12 sm6 md4>
                                <v-text-field label="Фамилия*"  box v-model="lastname" required></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-text-field label="Имя*"  box v-model="firstname" required></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-text-field label="Отчество"  box v-model="fathername"></v-text-field>
                            </v-flex>
                            </v-layout>
                            <v-layout>
                                 <v-flex xs12 md3>
                                    <v-select
                                     box
                                    :items="itemsG"
                                    v-model="gender"
                                    label="Выберите пол"
                                    ></v-select>
                                </v-flex>
                                <v-flex xs12 md3>
                                    <v-text-field
                                     box
                                    v-model="school"
                                    label="№ школы"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 md6>
                                    <v-text-field
                                     box
                                    v-model="adres"
                                    label="Адрес места жительства"
                                    ></v-text-field>
                                </v-flex>
                            </v-layout>

                             <v-layout wrap>
                                  <v-flex xs12 md6>
                                    <v-subheader>Карточка родителя</v-subheader>
                                    <v-text-field label="ФИО сопровождающего*"  box v-model="escort" class="mb-2" required></v-text-field>
                                    <v-text-field label="Степень родства"  box v-model="degree" class="mb-2" ></v-text-field>
                                    <v-text-field label="Контактный телефон*"  box v-model="phone" class="mb-2" required></v-text-field>
                                    <v-text-field label="Ссылка соц сети"  box v-model="email"></v-text-field>
                                    <v-btn class="success"
                                           @click.prevent="addEscort()">
                                        Добавить
                                    </v-btn>
                                </v-flex>

                                <v-flex xs12 md6 class="pl-2">
                                    {{convoir}}


                                    <v-list v-for="(con, i) in convoir" :key="i">

                                    <v-list-tile>
                                        <v-list-tile-action>
                                        <v-icon color="indigo"></v-icon>
                                        </v-list-tile-action>

                                        <v-list-tile-content>
                                        <v-list-tile-title>{{con.escort}}</v-list-tile-title>
                                        <v-list-tile-sub-title>{{con.degree}}</v-list-tile-sub-title>
                                        </v-list-tile-content>
                                    </v-list-tile>    
                                    
                                    
                                    <v-list-tile>
                                        <v-list-tile-action>
                                        <v-icon color="indigo">phone</v-icon>
                                        </v-list-tile-action>

                                        <v-list-tile-content>
                                        <v-list-tile-title>{{con.phone}}</v-list-tile-title>
                                        <v-list-tile-sub-title>Контактный Телефон</v-list-tile-sub-title>
                                        </v-list-tile-content>

                                    </v-list-tile>

                                    <v-list-tile>
                                        <v-list-tile-action>
                                        <v-icon color="indigo">mail</v-icon>
                                        </v-list-tile-action>

                                        <v-list-tile-content>
                                        <v-list-tile-title>{{con.email}}</v-list-tile-title>
                                        <v-list-tile-sub-title>Personal</v-list-tile-sub-title>
                                        </v-list-tile-content>
                                    </v-list-tile>

                                    </v-list>
                                </v-flex>
                           
                            </v-layout>
                        </v-container>
                        <small>*Карточка нового Клиента</small>
                        </v-card-text>
                        <v-card-actions>
                        <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" flat @click="dialog = false">Закрыть</v-btn>
                            <v-btn color="blue darken-1" flat @click="addNewsubclient(id, keyId)">Сохранить</v-btn>
                        </v-card-actions>
                    </v-card>
                    </v-dialog>
                </v-flex>
            </v-layout>

            <v-layout row>
                <v-flex xs12 sm6 offset-sm3 class="mt-5">
                <v-card 
                    class="mb-4 elevation-4"
                    v-for="(client, i) in subclient"
                    :key="client.id"
                >
                    <v-layout
                        column
                    >
                        <v-card-title class="pl-5 pt-5">
                        <div class="display-1 pl-2 pt-0">{{client.lastname +' '+ client.firstname +' '+ client.fathername}}</div>
                        </v-card-title>
                    </v-layout>

                    <v-list two-line>
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

                        <v-card-title>
                        <v-btn color="primary"  class="mr-3" :to="{name: 'position', params: {id: client.id, idCollection: id, idPosition: keyId}}">
                            Открыть
                        </v-btn>

                        <v-spacer></v-spacer>
                 
                        <v-btn color="red" 
                                dark 
                                icon 
                                @click="deleteClient(client.id)">
                            <v-icon>delete</v-icon>
                        </v-btn>
                        </v-card-title>
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
            addEscort() {
                if(!this.escort && (this.phone || this.email)){
                    return false 
                }

                let newEscort = {
                    escort : this.escort,
                    degree: this.degree,
                    email: this.email,
                    phone: this.phone
                } 
                
                this.convoir.push(newEscort)

                this.escort = '';  this.degree = ''; this.email = ''; this.phone = ''
            },
            addNewsubclient (key, subcey) {
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

</style>