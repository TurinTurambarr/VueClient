<template>
    <div>
    <v-container fluid>
        <h1>Графики аналитики</h1>
        <div class="small">
        <line-chart :chart-data="datacollection"></line-chart>
        <button @click="fillData()">Randomize</button>
    </div>
    </v-container>
  </div>
</template>

<script>
     import LineChart from './LineChart.js'

   
    export default {
        components: {
        LineChart
        },
        data () {
        return {
            datacollection: null
        }
        },
        mounted () {
            this.fillData()
        },
        methods: {
            fillData () {   
                this.datacollection = {
                labels: [this.getRandomInt(), this.getRandomInt()],
                datasets: [
                    {
                    label: 'Data One',
                    backgroundColor: 'rgba(255, 0, 0, 0.25)',
                    data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()]
                    }, {
                    label: 'Data One',
                    backgroundColor: '#f87979',
                    data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()]
                    },
                    {
                    label: 'Data One',
                    backgroundColor: '#f87979',
                    data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()]
                    }
                ]
                }
            },
            getRandomInt () {
                return Math.floor(Math.random() * (50 - 5 + 1)) + 5
            }
        }
  }
</script>

<style scoped>
.small {
    max-width: 900px;
    margin:  100px auto;
  }
</style>