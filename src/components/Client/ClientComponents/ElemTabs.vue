<template>
    <div>
         <v-tabs
            slot="extension"
            v-model="model"
            centered
            color="primary"
            dark
            slider-color="white"
            v-if="price"
        >
        <v-tab
            v-for="(pr, i) in price" 
            :key="i"
            :href="`#tab-${i}`"
        >
            {{helper(i)}} 
        </v-tab>
        </v-tabs>

            <v-tabs-items 
                v-model="model"
            >
                <v-tab-item
                    v-for="(pr, i) in price"
                    :id="`tab-${i}`"
                    :key="i" 
                >
                    <v-card>
                        <v-card-text class="text-xs-center" v-for="(p, i) in pr" :key='i'>{{p.title}}: <span class="pl-2"> <b> {{p.price}} рублей</b> </span>  </v-card-text>
                    </v-card>
                </v-tab-item>
            </v-tabs-items>
    </div>
</template>
<script>
    import HelpersName from '@/helpers/name'

    export default {
        props: ['price'],
        data () {
            return {
                 model: 'tab-2'
            }
        },
        methods: {
            helper(el){
                return HelpersName(el)
            }
        }
    }
</script>
