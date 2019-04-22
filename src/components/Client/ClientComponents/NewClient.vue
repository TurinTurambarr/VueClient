<template>
    <div>
                <v-dialog v-model="newClient.dialog" class="ml-0" 
                        fullscreen
                        hide-overlay
                        transition="dialog-bottom-transition"
                        scrollable>
                            <v-btn  slot="activator" color="primary" dark ref="editor" @click="newVectors()"><v-icon left>{{editTitle ? 'person_add' : 'edit' }}</v-icon>{{editTitle ? 'Новый клиент' : ''}}</v-btn>
                            <v-card>
                                <v-toolbar card dark color="primary">
                                <v-btn flat @click="closeModal()">
                                <v-icon>close</v-icon>
                                </v-btn>
                                <v-toolbar-title>{{elem ? 'Редактировать клиента' : 'Новый Клиент' }}</v-toolbar-title>
                                <v-spacer></v-spacer>
                                <v-toolbar-items>
                                <v-btn v-if="!elem" flat @click="addNewsubclient()">
                                    <v-icon left>save</v-icon>
                                    Сохранить</v-btn>
                                 <v-btn v-else flat @click="updateClient()">
                                    <v-icon left>save</v-icon>
                                    Изменить</v-btn>
                                </v-toolbar-items>
                            </v-toolbar>
                                <v-card-text>
                                <v-container grid-list-md>
                                    <v-layout wrap>
                                    <!-- {{elem}}{{idE}} -->
                                    <v-flex xs12 sm6 md4>
                                        <v-text-field label="Фамилия*"  box v-model="newClient.lastname" required></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md4>
                                        <v-text-field label="Имя*"  box v-model="newClient.firstname" required></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md4>
                                        <v-text-field label="Отчество"  box v-model="newClient.fathername"></v-text-field>
                                    </v-flex>
                                    </v-layout>
                                    <v-layout>
                                        <v-flex xs12 md2>
                                            <v-select
                                            box
                                            :items="newClient.itemsG"
                                            v-model="newClient.gender"
                                            label="Выберите пол"
                                            ></v-select>
                                        </v-flex>
                                        <v-flex xs12 md2>
                                            <v-text-field
                                            box
                                            v-model="newClient.school"
                                            label="№ школы"
                                            ></v-text-field>
                                        </v-flex>
                                        <v-flex xs12 md4>
                                            <v-text-field
                                            box
                                            v-model="newClient.adres"
                                            label="Адрес места жительства"
                                            ></v-text-field>
                                        </v-flex>
                                
                                         <v-flex xs12 md4>
                                            <v-menu
                                            :close-on-content-click="false"
                                            v-model="menu"
                                            :nudge-right="40"
                                            lazy
                                            transition="scale-transition"
                                            offset-y
                                            full-width
                                            max-width="290px"
                                            min-width="290px"
                                            >
                                             <v-text-field
                                                slot="activator"
                                                v-model="date"
                                                label="День рождения"
                                                prepend-icon="event"
                                                readonly
                                                ></v-text-field>
                                                <v-date-picker
                                                ref="picker"
                                                v-model="date"
                                                min="1950-01-01"
                                                @change="save"
                                                ></v-date-picker>
                                            </v-menu>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout>
                                        <v-flex xs12 md4>
                                             <v-title-header class="mr-5">Выберите направление
                                                 <v-btn icon @click.prevent="back()">
                                                    <v-icon>arrow_left</v-icon>
                                                </v-btn>
                                             </v-title-header>
                                             
                                            <v-select v-if="!Boolean(curentEl)"
                                            box
                                            :items="vectors"
                                            v-model="groupChecked"
                                            :label="flag ? 'Такого направления не существует' : 'Например Английский язык'"
                                            ></v-select>
                                            <v-select v-else
                                            box
                                            :items="curentEl"
                                            v-model="requiredEl"
                                            label="Выберите группу"
                                            ></v-select>
                                        </v-flex>
                                        <v-flex xs12 md2 class="pt-3 elem">
                                            <v-btn v-if="!Boolean(curentEl)" class="success mt-4" @click.prevent="groupCheckeds()">Проверить</v-btn>
                                            <v-btn v-else class="success mt-4" @click.prevent="addNewClientInGroup()">Добавить</v-btn>    
                                        </v-flex>
                                        <v-flex xs12 md6> 
                                                 <v-list 
                                                        v-for="(collection, i) in printNewCollection"
                                                        :key="i"
                                                    >

                                                        <v-list-tile>
                                                            <v-list-tile-action>
                                                                <v-icon color="indigo">group</v-icon>
                                                            </v-list-tile-action>
                                                            
                                                            <v-list-tile-content>
                                                                <v-list-tile-title>{{i+1}}) Направление: <b>{{collection.title}}</b>, Группа: <b>{{collection.subtitle}}</b>   <v-icon class="ml-4" icon float right @click="deleteEscort(printNewCollection, i)">delete</v-icon></v-list-tile-title>
                                                            </v-list-tile-content> 
                                                        </v-list-tile>

                                                    </v-list>
                                        </v-flex>
                                    </v-layout>

                                    <v-layout wrap>
                                        <v-flex>  
                                         <v-tabs
                                            color="primary"
                                            dark
                                            fixed-tabs
                                            icons-and-text
                                        >
                                            <v-tabs-slider color="yellow"></v-tabs-slider>

                                            <v-tab href="#tab-1">
                                            Карточка родителя
                                            </v-tab>

                                            <v-tab href="#tab-2">
                                            Братья сестры
                                            </v-tab>
                                        <v-tab-item
                                              :id="'tab-1'"
                                        >
                                         <v-layout>   
                                        <v-flex xs6 md6>
                                            <v-subheader>Карточка родителя</v-subheader>
                                            <v-text-field label="ФИО сопровождающего*"  box v-model="newClient.escort" class="mb-2" required></v-text-field>
                                            <v-select :items="['мама', 'папа', 'бабушка', 'дедушка', 'тетя', 'дядя', 'сестра', 'брат', 'иное лицо']" label="Степень родства"  box v-model="newClient.degree" class="mb-2" ></v-select>
                                            <v-text-field  label="Контактный телефон*"  box v-model="newClient.phone" class="mb-2" required></v-text-field>
                                            <v-text-field label="Ссылка соц сети"  box v-model="newClient.email"></v-text-field>
                                            <v-btn class="success"
                                                @click.prevent="addEscort()">
                                                Добавить
                                            </v-btn>
                                        </v-flex>

                                        <v-flex xs6 md6 class="pt-5 pl-5">
                                            <v-list v-for="(con, i) in newClient.convoir" :key="i" class="mb-2">
                                                <v-flex>
                                                    <v-subtitle>Сопровождающий {{i+1}}</v-subtitle>
                                                    <v-btn icon float left @click="deleteEscort(newClient.convoir, i)"><v-icon color="primary">delete</v-icon></v-btn>
                                                </v-flex>
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
                                            </v-list>
                                        </v-flex>
                                        </v-layout>
                                        </v-tab-item>
                                        <v-tab-item
                                              :id="'tab-2'"
                                        >
                                            <h2>Братья и сестры</h2>

                                            
                                        </v-tab-item> 
                                    </v-tabs>
                                    </v-flex>
                                    </v-layout>
                                </v-container>
                                <!-- <small>*Карточка нового Клиента</small> -->
                                </v-card-text>

                            </v-card>

                            <v-snackbar
                            v-model="snackbar"
                            :multi-line="'multi-line'"
                            :right="'right'"
                            :timeout="5000"
                            :top="'top'"
                            
                            >
                            {{ text }}
                            <v-btn
                                color="pink"
                                flat
                                @click="snackbar = false"
                            >
                                Закрыть 
                            </v-btn>
                            </v-snackbar>
                            </v-dialog>
    </div>
</template>

<script>
    import Vue from 'vue' 

    export default {
        props: {
            filteredClient: {
                type: Object,
                required: true
            },
            editTitle: {
                type: Boolean,
                default: false
            },
            elem: {
                type: Object,
                default: null
            }
        },
        data(){
            return { 
                date: this.elem ? this.elem.dateBorn : '',
                menu: false,
                idE: this.elem ? this.elem.id : '',
                id: null,
                backObj: this.elem ? this.elem.createdNewCollection : [],
                vectors: [],
                snackbar: false,
                text: 'Ошибок нет',
                requiredEl: '',
                collectionEl: '',
                collectionNewAdd: [],
                printNewCollection: this.elem ? this.elem.print : [],
                agesEl: '',
                curentEl: undefined,
                flag: false,
                groupChecked: undefined,
                newClient: {
                            itemsG:['Муж', 'Жен'],
                            dialog: false,
                            school: this.elem ? this.elem.school : '',
                            firstname: this.elem ? this.elem.firstname : '',
                            lastname: this.elem ? this.elem.lastname : '',
                            fathername: this.elem ? this.elem.fathername : '',
                            adres: this.elem ? this.elem.adres : '',
                            escort: '',
                            degree: '',
                            phone: '',
                            email: '',
                            gender:  this.elem ? this.elem.gender : '',
                            convoir: this.elem ? this.elem.convoir : [],
                }
            }
        },
        computed: {
         formTitle () {
            return this.editedIndex === -1 ? 'Новый Клиент' : 'Режим редактирования'
         }
        },
        methods: {
            formatDate (date) {
                if (!date) return null

                const [year, month, day] = date.split('-')
                return `${month}/${day}/${year}`
            },
            parseDate (date) {
                if (!date) return null

                const [month, day, year] = date.split('/')
                return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
            },
             addNewClientInGroup () {
                let currentArray = this.agesEl
                let searchName = this.requiredEl;
                let index = currentArray.findIndex(el => el === searchName);
                let collection = this.collectionEl
                let addCollectionChild = collection[index]

                this.collectionNewAdd = addCollectionChild

                this.printNewCollection.push({
                   subtitle: this.requiredEl,
                   title: this.groupChecked
                })
                this.backObj.push({
                    id: this.id,
                    group: addCollectionChild
                })
                this.requiredEl =  null; this.collectionEl = null; this.agesEl = null; this.curentEl = undefined; this.groupChecked = null 
            },
            deleteEscort(array, index) {
                if(array == this.printNewCollection){
                   this.backObj.splice(index, 1)
                }

                return array.splice(index, 1)
            },
            addEscort() {
                if(!this.newClient.escort && (this.newClient.phone || this.newClient.email)){
                    this.snackbar = true 
                    this.text = 'Заполните все обязательные поля'
                    return  
                }

                const newEscort = {
                    escort: this.newClient.escort,
                    degree: this.newClient.degree,
                    phone: this.newClient.phone,
                    email: this.newClient.email
                }

                this.newClient.convoir.push(newEscort)

                this.newClient.email = null, this.newClient.degree = null, this.newClient.phone = null, this.newClient.escort = null
            },
            async updateClient () {
                const updateClient = {}

                 if (this.newClient.school) {updateClient.school = this.newClient.school}
                 if (this.newClient.firstname) {updateClient.firstname = this.newClient.firstname}
                 if (this.newClient.lastname) {updateClient.lastname = this.newClient.lastname}
                 if (this.newClient.fathername) {updateClient.fathername = this.newClient.fathername}
                 if (this.newClient.adres) {updateClient.adres = this.newClient.adres}
                 if (this.newClient.gender) {updateClient.gender = this.newClient.gender}
                 if (this.newClient.convoir) {updateClient.convoir = this.newClient.convoir} 
                 if (this.printNewCollection) {updateClient.print = this.printNewCollection} 
                 if (this.backObj) {updateClient.createdNewCollection = this.backObj} 
                 if (this.date) {updateClient.dateBorn = this.date} 

                const key = this.idE
                const elem = Vue.$db.collection("allclients").doc(key)
                await elem.update(updateClient)    

                this.$store.dispatch('SET_ALLCLIENTS')
                .then(()=>{
                    this.newClient.dialog = false
                })
                .catch(error=>console.log(error)) 
            },
            addNewsubclient() {
                const dataBase = []
                
                const convoir = this.newClient.convoir
                const newCollection = this.backObj

                if(!this.newClient.firstname || !this.newClient.lastname){
                    this.snackbar = true
                    this.text = "поля с именем и фамилией должны быть заполнены"
                    return false 
                }

                if(!convoir.length){
                     this.snackbar = true
                      this.text = 'Должен быть хотя бы один сопровождающий'
                    return false 
                }

                let newEscort = {
                    firstname: this.newClient.firstname,
                    lastname: this.newClient.lastname,
                    fathername: this.newClient.fathername,
                    gender: this.newClient.gender,
                    school: this.newClient.school,
                    adres: this.newClient.adres,
                    dateBorn: this.date,
                    dateCurrent: new Date().toISOString().substr(0, 10),
                    convoir: this.newClient.convoir,
                    print: this.printNewCollection,
                    createdNewCollection: newCollection
                } 

                this.$store.dispatch('NEW_CLIENTDATA', newEscort)
                        .then(() => {
                            this.newClient.dialog = false
                        })
                        .catch(error=>console.log(`error  ${error}`))
 
                // this.newClient.convoir.push(newEscort)

                // this.newClient.escort = '';  this.newClient.degree = ''; this.newClient.email = ''; this.newClient.phone = ''
            },
             formatDate (date) {
                if (!date) return null

                const [year, month, day] = date.split('-')
                return `${month}/${day}/${year}`
            },
            back () {
               return this.flag = false
            }, 
            groupCheckeds () { 
                const error = 'Такое направления не существует!'
                const data = this.filteredClient
                const elem = this.groupChecked

                if(!elem) {
                    this.flag = true 
                    this.snackbar = true
                    this.text = error
                    return
                }


                for (let i = 0; i < data.length; i++){
                    let obj = data[i]
                    for (let key in obj) {
                        let serchTitle = String(obj[key]).toLowerCase().trim()
                        if(serchTitle ==  String(elem).toLowerCase().trim()){
                            this.flag = false
                            this.collectionEl = obj.collection
                            this.id = obj.id
                            this.agesEl = obj.ages 
                            return this.curentEl = obj.ages   
                         }
                     }
                }

                // this.groupChecked = undefined
                // this.flag = true 
                // return this.curentEl = undefined
            },
            newVectors () {
                const newClientVector =  this.filteredClient.map((elem)=>{
                 return elem.title
                })

                this.vectors = newClientVector
            },
            closeModal(){
                this.newClient.dialog = false
            }
        },
        
    }
</script>

<style scoped>
    .elem {
        margin-top: 20px;
        position: relative;
    }
</style>