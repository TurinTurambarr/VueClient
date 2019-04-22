<template>
    <div>
         <v-card flat class="pr-4 pl-4 pb-4 pt-4">
             <h3 class="headline mb-2">Записаться на занятие</h3>

             <!-- <v-container fluid> -->
                    <v-layout row wrap>
                    <v-flex xs12 sm5>
                        <v-subheader v-text="'Выберите посещаемое направление'"></v-subheader>
                    </v-flex>
                    <v-flex xs12 sm6>
                        <v-select
                        :items="[1,2,3]"
                        :menu-props="{ maxHeight: '400' }"
                        label="Выберите посещаемое направление"
                        persistent-hint
                        ></v-select>
                    </v-flex>
                     
                    
                    <v-flex xs12 sm5>
                        <v-subheader v-text="'Выберите группу'"></v-subheader>
                    </v-flex>

                    <v-flex xs12 sm6>
                        <v-select
                        :items="[1,2,3]"
                        :menu-props="{ maxHeight: '400' }"
                        label="Посещаеммые группы"
                        persistent-hint
                        ></v-select>
                    </v-flex>

                    <v-flex xs12 sm5>
                        <v-subheader v-text="'Дата Занятия'"></v-subheader>
                    </v-flex>

                    <v-flex xs12 sm6>
                         <v-text-field
                        label="Введите цену"
                        chips
                        persistent-hint
                        ></v-text-field>
                    </v-flex>

                    <!-- <v-flex xs12 sm5>
                        <v-subheader v-text="'Количество занятий'"></v-subheader>
                    </v-flex> -->

                    <!-- <v-flex xs12 sm6>
                        <v-select
                        :items="[1,3,6,8,12,16]"
                        label="Число занятий"
                        chips
                        persistent-hint
                        ></v-select>
                    </v-flex> -->
                    <v-btn class="mt-4" color="primary" @click="newAboniment()">Оформить</v-btn>
                    </v-layout>
                <!-- </v-container> -->
        </v-card>

        

        <v-divider></v-divider>
         <v-card flat class="pr-4 pl-4 pb-4 pt-4">
             <client-status :id="id"></client-status>
         </v-card>
    </div>
</template>

<script>
    import ClientStatus from './ClientStatus'

    export default {
        props:{
            id: {
                type: String,
                required: true
            }
        },
        components: {
            ClientStatus
        },
        data () {
            return {
                
            }
        }
    }
</script>

<style scoped>

</style>