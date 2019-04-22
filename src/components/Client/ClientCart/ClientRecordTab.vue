<template>
    <div>
        <v-card flat class="pb-4 pt-4">
            <v-card-title class="pl-5">График Посещений</v-card-title>
            <v-layout>
            <v-flex xs12 style="pading: 20px">
                <vue-chartist :data="chart.data" :options="chart.options" type="Line"></vue-chartist> 
            </v-flex>
            </v-layout>


       

        </v-card>
    </div>
</template>

<script>
   import VueChartist from 'v-chartist'


    export default {
         components: {
            'vue-chartist': VueChartist,
     
         },
         data () {
             return {
                chart: Object
             }
         },
         mounted(){
             const chart = {
                        data: {
                                labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
                                series: [
                                    [1, 0 , 1, 0, 0, 1, 2, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0],
                                ]
                            },
                        options: {
                                fullWidth: true,
                                chartPadding: {
                                    right: 40
                                }
                        },       
             }
             
             this.chart = chart 
         }
    } 
</script>

<style scoped>

</style>