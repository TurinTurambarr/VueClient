<template>
  <div>
    <vue-chartist :data="data" :options="options" type="Line"></vue-chartist>
  </div>
</template>

<script>
 import VueChartist from 'v-chartist';

export default {
  components: {
        'vue-chartist': VueChartist
  },
  props: {
    data: {
      type: Object,
      default: () => ({})
    },
    // eventHandlers: {
    //   type: Array,
    //   default: () => ([])
    // },
    options: {
      type: Object,
      default: () => ({})
    }
    // ratio: {
    //   type: String,
    //   default: undefined
    // },
    // responsiveOptions: {
    //   type: Array,
    //   default: () => ([])
    // },
    // type: {
    //   type: String,
    //   required: true,
    //   validator: v => ['Bar', 'Line', 'Pie'].includes(v)
    // }
  }
}
</script>

<style lang="scss">

</style>
