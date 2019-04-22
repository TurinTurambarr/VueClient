<template>
  <div>
     <v-img
                    :src="client.gender == 'Муж' ? 'http://localhost:8080/static/user.jpg' :  'http://localhost:8080/static/userJ.jpg'"
                    :gradient="gradient"
                     dark
                    height="200px"
                    >
                        
                        <v-layout
                            column
                            fill-height
                        >
                            <v-card-title>
                            <v-btn dark icon to="/allclients" class="primary">
                                <v-icon>chevron_left</v-icon>
                            </v-btn>

                            <v-spacer></v-spacer>

                             <news-client :filteredClient="client" :editTitle="false" :elem="client">

                             </news-client>
                          
                            </v-card-title>

                            <v-spacer></v-spacer>

                            <v-card-title class="white--text pl-4 pt-5">
                            <div class="d-1 pl-0 pt-3">{{client.lastname +' '+ client.firstname +' '+ client.fathername}}</div>
                            </v-card-title>
                        </v-layout>
                </v-img>
                <v-list>
                    <v-list-tile class="mb-3" @click="">
                        <v-list-tile-action>
                        <v-icon color="indigo">location_city</v-icon>
                        </v-list-tile-action>

                        <v-list-tile-content>
                        <v-list-tile-title>{{client.adres}}</v-list-tile-title>
                        <v-list-tile-sub-title>Адрес</v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    
                    <v-list-tile  @click="" class="mb-3">
                        <v-list-tile-action>
                        <v-icon color="indigo">school</v-icon>
                        </v-list-tile-action>
                      
                        <v-list-tile-content>
                        <v-list-tile-title>{{client.school}}</v-list-tile-title>
                        <v-list-tile-sub-title>Школа</v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile  @click="" class="mb-3">
                        <v-list-tile-action>
                        <v-icon color="indigo">date_range</v-icon>
                        </v-list-tile-action>
                      
                        <v-list-tile-content>
                        <v-list-tile-title>{{client.dateBorn}}</v-list-tile-title>
                        <v-list-tile-sub-title>День рождения</v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile  @click="" class="mb-3"> 
                      <v-list-tile>
                        <v-list-tile-action>
                        <v-icon color="indigo">wc</v-icon>
                        </v-list-tile-action>
                      
                        <v-list-tile-content>
                        <v-list-tile-title>{{client.gender}}</v-list-tile-title>
                        <v-list-tile-sub-title>Пол</v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>

                    <v-card-title>
                       Посмотреть посещаемые группы <v-btn @click.prevent="selected = !selected" icon><v-icon>{{selected ? 'chevron_left' : 'chevron_right'}}</v-icon></v-btn>
                    </v-card-title>
                     
                     <v-scroll-y-transition mode="out-in">
                    <div
                        v-if="selected"
                        class="title"
                        style="align-self: center;"
                    >
                     <v-list-tile v-for='(group, i) in client.print' :key="i" >
                      <v-list-tile-content>
                           

                        <v-list-tile-title>
                        <v-icon color="indigo">group</v-icon>
                          Группа <b>{{group.subtitle}}</b>   </v-list-tile-title>
                        <v-list-tile-sub-title> Направление <b>{{group.title}}</b></v-list-tile-sub-title>
                      </v-list-tile-content>
                     </v-list-tile>
                     </div>
                     </v-scroll-y-transition>
                </v-list>
                  <v-divider></v-divider>
                  
                     <v-card-title class="pl-4 pt-1">
                            <div class="d-1 pl-0 pt-3">Карточка сопровождающего</div>
                    </v-card-title>
                  <v-list>
                     <v-list v-for="(con, i) in client.convoir" :key="i">
                                            <v-list-tile>
                                                <v-list-tile-action>
                                                <v-icon color="indigo">people_outline</v-icon>
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
                                                <v-list-tile-sub-title>Соц.сети</v-list-tile-sub-title>
                                                </v-list-tile-content>
                                            </v-list-tile>
                                            <v-divider class="mt-3"></v-divider>
                                            </v-list>
                    </v-list>
  </div>
</template>

<script>
import NewsClient from '@/components/Client/ClientComponents/NewClient'

export default {
  components: {
    NewsClient
  },
  props: {
    client: {
      type: Object,
      required: true
    }
  },
  data(){
    return {
      selected: false,
      gradient: 'to top right, rgba(0,0,0, .4), rgba(25,32,72, .4)'
    }
  }
}
</script>

<style scoped>
.d-1 {
   font-size: 20px;
}
</style>