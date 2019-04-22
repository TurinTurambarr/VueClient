<template>
    <div>
       <v-card>
            <v-card-title>
            Все клиенты
            <news-client class="ml-4" :filteredClient="filteredClient" :editTitle="true" ></news-client>
            
            <v-spacer></v-spacer>
            <v-text-field
                v-model="search"
                append-icon="search"
                label="Поиск"
                single-line
                hide-details
            ></v-text-field>
            </v-card-title>
    
            <div v-if="allClients == null" class="text-xs-center"> 
                <v-progress-circular
                class="mt-5"
                :size="70"
                color="primary"
                indeterminate
                ></v-progress-circular>
            </div>
            <v-data-table
            v-else
            :headers="headers"
            :items="allClients"
            :search="search"
            >
            <template slot="items" slot-scope="props">
                <td>{{props.item.lastname +' '+ props.item.firstname +' '+ props.item.fathername}}</td>
                <td class="text-xl-right">{{ props.item.gender }}</td>
                <td class="text-xl-right">{{ props.item.school }}</td>
                <td class="text-xl-right">{{ props.item.adres }}</td>
                <td class="text-xl-right">{{ props.item.dateBorn }}</td>
                <td class="text-xl-right">{{ props.item.dateCurrent }}</td>
                <td class="text-xl-right">
                <v-layout>
                <news-client :filteredClient="filteredClient" :editTitle="false" :elem="props.item"></news-client>
                 <v-btn icon color="primary">
                  <v-icon @click="dialogAlert = true; deleteID = props.item.id">delete</v-icon>
                </v-btn>
                <v-btn icon color="primary" :to="{name: 'position', params: {id: props.item.id}}">
                  <v-icon>arrow_right</v-icon>
                </v-btn>
                </v-layout>
        </td>
            </template>
            <v-alert slot="no-results" :value="true" color="error" icon="warning">
                Your search for "{{ search }}" found no results.
            </v-alert>
            </v-data-table>
        </v-card>

        <v-dialog
      v-model="dialogAlert"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">
          Удалить данного клиента?
            </v-card-title>
        <v-card-actions>
          <v-btn color="green darken-1" flat="flat"  @click="dialogAlert = false">Отменить</v-btn>  
          <v-btn color="green darken-1" flat="flat" @click="dialogAlert = false; deleteItem(deleteID); deleteID = null;">  Удалить </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </div>
</template>

<script>
    import Vue from 'vue'
    import NewsClient from '@/components/Client/ClientComponents/NewClient'

    export default {
    components: {
        'news-client': NewsClient
    },
    data () {
      return {
        deleteID: null,
        search: '',
        dialog: false,
        dialogAlert: false,
        filteredClient: null,
        headers: [
          {
            text: 'Полное Имя',
            align: 'left',
            sortable: false,
            value: 'fullname'
          },
          { text: 'Пол', value: 'gender' },
          { text: 'Школа', value: 'school' },
          { text: 'Адрес', value: 'adres' },
          { text: 'Дата Рождения', value: 'dateBorn' },
          { text: 'Дата Регистрации', value: 'dateCurrent' },
          { text: 'Actions', value: 'name', sortable: false }
        ],
      }
    },
     computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
      allClients () {
        return this.$store.getters.getAllClients
      }
    },
    watch: {
      dialog (val) {
        val || this.close()
      }
    },
    created () {
        this.$store.dispatch('SET_ALLCLIENTS')

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

                return cont.filteredClient = tasks
            })  
            .catch(error => console.log(error))
        
    }, 
    methods: {
      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      deleteItem (id) {
        this.$store.dispatch('DELETE_CLIENTS', id)
                    .then(()=>{
                         this.$store.dispatch('SET_ALLCLIENTS')
                    })
                    .catch((error) => {
                        console.error("Error removing document: ", error);
        });
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          this.desserts.push(this.editedItem)
        }
        this.close()
      }
    }
  }
</script>

<style scoped>

</style>