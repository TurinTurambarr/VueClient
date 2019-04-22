<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <h1 class="text--secondary mb-3">Создание нового направления</h1>

                 <v-form ref="form" v-model="valid" validation class="mb-3">
                  <v-text-field 
                  name="title" 
                  label="Название Коллекции" 
                  type="text"
                  :rules="[v => !!v || 'Название Коллекции обязательно']"
                  v-model="title"
                  required
                  >
                  </v-text-field>
                  
                  

                  <v-layout row class="mb-3">
                   <v-flex xs>
                       <v-text-field 
                            name="group" 
                            label="Новая группа (например: 1 - 2 года)" 
                            type="text"
                            v-model="groupV"
                            required
                            >
                        </v-text-field>
                    </v-flex> 
                   
                    <v-flex>
                        <v-btn color="primary" @click.prevent="addGroup(group.length)">Добавить</v-btn>
                    </v-flex>
                    <v-flex>
                        <v-list class="pt-2">
                            <h4> Новые группы</h4>
                            <v-list-tile-content class="list">
                                <v-list-tile-title v-for="(g, i) in group" :key="i">{{i+1}}: <b>{{g}}</b></v-list-tile-title>
                            </v-list-tile-content>
                        </v-list>
                    </v-flex>
                </v-layout>

                  <h3 class="mb-2">Ценовые группы</h3>
                    <v-tabs
                        centered
                        color="primary"
                        dark
                        icons-and-text
                    >
                        <v-tabs-slider color="yellow"></v-tabs-slider>

                        <v-tab href="#tab-1">
                        Основная
                        </v-tab>

                        <v-tab href="#tab-2">
                        Льготная
                        </v-tab>

                        <v-tab href="#tab-3">
                        Двойная
                        </v-tab>

                         <v-tab-item
                            v-for="i in 3"
                            :id="'tab-' + i"
                            :key="i"
                            >
                            <v-card flat>
                                <v-card-text>
                                    <v-layout row>
                                        <v-flex xs-6>
                                             <v-text-field 
                                                name="title" 
                                                label="Название Ценновой группы" 
                                                type="text"
                                                v-model="titleV"
                                                required
                                                >
                                             </v-text-field>
                                              <v-text-field 
                                                name="title" 
                                                label="цена" 
                                                type="text"
                                                v-model="price"
                                                required
                                                >
                                             </v-text-field>
                                            
                                            <v-btn class="ml-0" color="primary" @click.prevent="addArray(i)">
                                                Добавить
                                            </v-btn>
                                        </v-flex>
                                        <v-flex xs-6>
                                            <div  v-if="i == 1">
                                                <v-list-tile
                                                v-for="(m, i) in main"
                                                :key="i"
                                                >
                                                    <v-list-tile-action>
                                                        {{m.title}}:
                                                    </v-list-tile-action>
                                                    
                                                    <v-list-tile-content class="pl-2">
                                                        <v-list-tile-title>
                                                           <b>{{m.price}}</b> руб
                                                        </v-list-tile-title>
                                                    </v-list-tile-content>
                                                </v-list-tile>
                                            </div>
                                            <div v-else-if="i == 2">
                                                <v-list-tile
                                                v-for="(dis, i) in discount"
                                                :key="i"
                                                class="list-price"
                                                >
                                                    <v-list-tile-action>
                                                        {{dis.title}}:
                                                    </v-list-tile-action>
                                                    
                                                    <v-list-tile-content class="pl-2">
                                                        <v-list-tile-title> 
                                                       <b>{{dis.price}}</b> руб
                                                        </v-list-tile-title>
                                                    </v-list-tile-content>
                                                </v-list-tile>
                                            </div>
                                            <div v-else-if="i == 3">
                                                <v-list-tile
                                                v-for="(d, i) in double"
                                                :key="i"
                                                >
                                                    <v-list-tile-action>
                                                            {{d.title}}:  
                                                    </v-list-tile-action>
                                                    
                                                    <v-list-tile-content class="pl-2">
                                                        <v-list-tile-title> 
                                                            <b>{{d.price}}</b> руб
                                                        </v-list-tile-title>
                                                    </v-list-tile-content>
                                                </v-list-tile>
                                            </div>
                                        </v-flex>
                                    </v-layout>
                                </v-card-text>
                            </v-card>
                        </v-tab-item>
                    
                    </v-tabs>

                </v-form>
                <v-layout row class="mb-3">
                   <v-flex xs12>
                       <v-btn class="warning" @click="triggerUpload">
                           Upload
                           <v-icon right dark>cloud_upload</v-icon>
                       </v-btn>
                       <input 
                       ref="fileInput" 
                       type="file" 
                       style='display: none' 
                       accept="image/*"
                       @change="onFileChange">
                    </v-flex> 
                </v-layout>

                <v-layout row>
                   <v-flex xs12 class="ml-2">
                      <img :src="imageSrc" height="150" v-if="imageSrc">
                    </v-flex> 
                </v-layout>
                <v-layout row>
                    <v-flex xs12>
                        <v-spacer></v-spacer>
                        <v-btn 
                            :disabled="!valid || loading || flag"
                            class="success" 
                            @click="createAd">
                            Создать коллекцию
                        </v-btn>
                    </v-flex>      
                </v-layout>
                <v-layout row v-if="flag">
                    <v-flex xs12>
                        <v-progress-linear v-model="imageUploand"></v-progress-linear>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import translit from '@/helpers/translit'

    export default {
        data () {
            return {
                title: '',
                groupV: '',
                groupCollection: [],
                promo: false,
                valid: false,
                flag: false,
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                price: null,
                image: null,
                imageSrc: '',
                titleV: '',
                group: [],
                collection: [],
                discount: [],
                double: [],
                main: []
            }
        },
        computed: {
            imageUploand(){
                return this.$store.getters.stateUpload 
            },
            loading () {
                return this.$store.getters.loading
            }
        },
        methods: {
            triggerUpload () {
                this.$refs.fileInput.click()
            },
            onFileChange (event) {
                const file = event.target.files[0]

                const reader = new FileReader()
                reader.onload = e => {
                    this.imageSrc = reader.result
                }
                reader.readAsDataURL(file)

                this.image = file
            },
            addGroup (index) {
                const collection = 'collection'
                const newCollection = `${collection}${index + 1}`
                const elem = this.groupV
              
                if (!elem) return false 
                this.group.push(elem)
                this.groupCollection.push(newCollection)
                this.groupV = ''
            },
            async createAd () {
                const cont = this
                this.flag = true
                if (this.$refs.form.validate()) {
                    const subCollection = this.groupCollection

                    const price = {
                        main: this.main,
                        discount: this.discount,
                        double: this.double
                    }

                    const ad = {
                        title: this.title,
                        ages: this.group,
                        collection: subCollection,
                        price: price,
                        imageSrc: this.image
                    }
                    
                    try {
                        await this.$store.dispatch('NEW_POSITION', {ad, cont})
                    }  catch(error) {
                        throw error
                    } 
                }
            },
            addArray(id){
                const obj = {
                    title: this.titleV,
                    price: this.price
                }

                if (id === 1) { 
                   this.main.push(obj)
                } else if (id === 2) {
                   this.discount.push(obj)
                } else if (id === 3) {
                   this.double.push(obj)
                }

                this.price = null
                this.titleV = ''
            }

        }
    }
</script>


<style scoped>

.list-price {
    padding: 0 15px;
}
</style>