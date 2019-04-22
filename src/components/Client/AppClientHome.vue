<template>
    <div>
        <v-container fluid> 
            <v-layout row class="mt-4">
            <v-flex  xs12 sm6 offset-sm3>
                 <v-layout row>
                    <v-btn class="ml-0" color="primary" to="/newcollection">
                    <v-icon left>group_add</v-icon>
                    Направление</v-btn>
                    <news-client :filteredClient="filteredClient" :editTitle="true"></news-client>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" to="/ticher">
                        <v-icon left>school</v-icon>
                    Преподаватели</v-btn> 
                    <v-btn color="primary" to="/allclients">
                        <v-icon left>people</v-icon>
                        Все клиенты
                    </v-btn>
                </v-layout>

              <v-text-field
                     class="mt-2"
                     label="Поиск"
                     v-model="searchTerm" 
                >
                </v-text-field>
            </v-flex>
            </v-layout>  

            <div v-if="!clients" class="text-xs-center"> 
                <v-progress-circular
                    class="mt-5"
                    :size="70"
                    color="primary"
                    indeterminate
                    ></v-progress-circular>
                </div>
            <v-layout  v-else>  
                <v-flex xs12 sm6 offset-sm3
                > 
                    <v-card
                     class="mb-4"
                     v-for="client in filteredClient"
                     :key="client.id">
                    <v-layout row>
                        <v-flex xs6>
                            <v-img
                            :src="client.imageSrc"
                            height="250px"
                            >
                                <v-layout
                                    column
                                    fill-height
                                >
                                    <v-card-title>    
                                        <v-btn color="primary" icon class="mr-3">
                                            <v-icon>edit</v-icon>
                                        </v-btn>
                                    </v-card-title>

                                    <v-spacer></v-spacer>

                                    <v-card-title class="black--text">
                                        <div class="display-1 tc">{{client.title}}</div>
                                    </v-card-title>
                                </v-layout>
                            </v-img>

                            
                            <elem-tabs :price="client.price"></elem-tabs>
                        </v-flex>
                       
                        <v-flex xs6>
                        <h2 class="text-xs-center pt-2">Группы</h2>

                            <v-list 
                                v-for="(age, i) in client.ages"
                                :key="i"
                            >

                                <v-list-tile :to="{name: 'subclient', params: {id: client.id, keyId: client.collection[i]}}">
                                    <v-list-tile-action>
                                        <v-icon color="indigo">group</v-icon>
                                    </v-list-tile-action>
                                    
                                    <v-list-tile-content>
                                        <v-list-tile-title>{{age}}</v-list-tile-title>
                                    </v-list-tile-content>
                                    
                                    <v-list-tile-action>
                                        <v-icon color="indigo">arrow_forward_ios</v-icon>
                                    </v-list-tile-action>
                             
                                </v-list-tile>

                            </v-list>
                        </v-flex>

                    </v-layout>
                    </v-card>
                </v-flex>
            </v-layout>


        </v-container>             
    </div>
</template>

<script>
    import Vue from 'vue'
    import HelpersName from '@/helpers/name'
    import TabsElem from '@/components/Client/ClientComponents/ElemTabs'
    import NewsClient from '@/components/Client/ClientComponents/NewClient'

    export default {
        data () {
                return {
                    dateBorn: '',
                     date: new Date().toISOString().substr(0, 10),
                    dateFormatted: this.formatDate(new Date().toISOString().substr(0, 10)),
                    model: 'tab-2',
                    id: '',
                    flag: false,
                    clients: null,
                    groupChecked: undefined,
                    searchTerm: null
                }   
        },
        components: {
              'elem-tabs': TabsElem,
              'news-client': NewsClient
        },
        computed: {
            filteredClient(){
                let clientsFilter = this.clients
                if(this.searchTerm)
                    clientsFilter = clientsFilter.filter(t => t.title.toLowerCase().indexOf(this.searchTerm.toLowerCase()) >= 0 
                )
                  
                return clientsFilter
            }
        },
        methods: {
            formatDate (date) {
                if (!date) return null

                const [year, month, day] = date.split('-')
                return `${month}/${day}/${year}`
            }
        },
        created () {
          const cont = this
          const client = Vue.$db.collection('client')
          client
          .get()
          .then(QuerySnapshot => {
                let tasks = []
                QuerySnapshot.forEach(s => {
                    const data = s.data()
                    let task = {
                       id:  s.id,
                       ages: data.ages,
                       title: data.title,
                       collection: data.collection,
                       price: data.price,
                       lastmanager: data.lastmanager,
                       imageSrc: data.imageSrc
                    }

                    tasks.push(task)
                })

                return cont.clients = tasks
            })  
            .catch(error => console.log(error))
        }
    }
</script>


<style scoped>
    .tc {
        margin: 0 auto;
    }
</style>