<template>
   <div>
       {{idCollection}}
       <v-layout row> 
            <v-flex xs3>
               <client-left-bar :client="client"></client-left-bar>
            </v-flex>
            <v-flex xs9>
                    <v-tabs
                        left
                        max
                        color="primary"
                        dark
                        icons-and-text
                    >
                        <v-tabs-slider color="yellow"></v-tabs-slider>

                        <v-tab href="#tab-1">
                        Ближайшая запись
                        <v-icon>alarm_add</v-icon>
                        </v-tab>

                        <v-tab href="#tab-2">
                        Абонименты
                        <v-icon>credit_card</v-icon>
                        </v-tab>

                        <v-tab href="#tab-3">
                        Счет
                        <v-icon>attach_money</v-icon>
                        </v-tab>

                        <v-tab href="#tab-4">
                        Аналитика
                        <v-icon>insert_chart</v-icon>
                        </v-tab>

                        <v-tab-item
                        :value="'tab-1'"
                        >
                         <client-registration-tab :id="id"></client-registration-tab>
                        </v-tab-item>
                         <v-tab-item
                        :value="'tab-2'"
                        >
                        <v-card flat>
                           <client-subscription :client="client"></client-subscription>
                        </v-card>
                        </v-tab-item>
                         <v-tab-item
                        :value="'tab-3'"
                        >
                        <v-card flat>
                         <v-text>3 таб</v-text>  
                        </v-card>
                        </v-tab-item>

                         <v-tab-item
                        :value="'tab-4'"
                        >
                        <v-card flat>
                            <div>
                            <client-record-tab></client-record-tab>
                            </div>
                        </v-card>
                        </v-tab-item>
                    </v-tabs>
               
            </v-flex>
       </v-layout>         
    </div>
</template>

<script>
    import ClientLeftBar from './ClientCart/ClientLeftBar'
    import ClientRecordTab from './ClientCart/ClientRecordTab'
    import ClientRegistrationTab from './ClientCart/ClientRegistrationTab'
      import ClientSubscription from './ClientCart/ClientSubscription'
    
    export default {
        components: {
            ClientLeftBar,
            ClientRecordTab,
            ClientRegistrationTab,
            ClientSubscription
        },
        props: {
            id: {
                type: String,
                required: true
            },
            idCollection: {
                type: String
            },
            idPosition: {
                type: String
            }
        },
        data () {
            return {
                 selected: false,
                 oneClient: null,
                 gradient: 'to top right, rgba(0,0,0, .7), rgba(25,32,72, .7)'
            }
        },
        computed: {
            client () {
              const id = this.id 
              return this.oneClient === null ? this.$store.getters.allClientById(id) : this.oneClient
            }
        }
    }
</script>

<style scoped>
.d-1 {
   font-size: 24px;
}
</style>