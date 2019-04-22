<template>
    <div>
        <h1 class="ml-2 mt-2">Календарь событий</h1>
        <div class="mt-2 mb-3">
        <v-btn class="primary" to="/schedule/new">Редактированние расписания</v-btn>
        </div>
        <vue-cal 
        style="height: 100vh" 
        class="vuecal--primary-theme" 
        events-on-month-view
        :events="events" 
        locale="ru"  
        :disable-views="['years']" 
        hide-weekends
        editable-events
        :time-from="9 * 60"
        :time-to="23 * 60"
        >
            <i slot="arrowPrev" aria-hidden="true" class="v-icon material-icons">arrow_back</i>
            <i slot="arrowNext" aria-hidden="true" class="v-icon material-icons">arrow_forward</i>
        </vue-cal>

    </div>
</template>

<script>
    import VueCal from 'vue-cal'

    export default {
        components: { 'vue-cal': VueCal },
        data () {
            return {
                events: [
                    {
                        start: '2019-02-19 10:35',
                        end: '2019-02-19 11:30',
                        title: 'Doctor appointment',
                        content: '<i class="v-icon material-icons">local_hospital</i>',
                        class: 'blue-event'
                    },
                    {
                        start: '2019-02-19 18:30',
                        end: '2019-02-19 19:15',
                        title: 'Dentist appointment',
                        content: '<i class="v-icon material-icons">local_hospital</i>',
                        class: 'blue-event'
                    },
                    {
                        start: '2019-02-20 18:30',
                        end: '2019-02-20 20:30',
                        title: 'Crossfit',
                        content: '<i class="v-icon material-icons">fitness_center</i>',
                        class: 'blue-event'
                    }
                ]
            }
        }
    }
</script>

<style scoped>

</style>