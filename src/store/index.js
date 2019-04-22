import Vue from 'vue'
import Vuex from 'vuex'
import ads from './ads'
import user from './user'
import shared from './shared'
import task from './task'
import client from './client'
import position from './position'
import allclients from './allclient'
import subscription from './subscription'
 
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
       ads, user, shared, task, client, position, allclients, subscription
    }
})