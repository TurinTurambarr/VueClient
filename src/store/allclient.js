import Vue from 'vue'
import { stat } from 'fs';

class NewClient {
    constructor (lastname, firstname, fathername, gender, school,
    adres, date, group=null, groupCollection=null, escort=null) {
        console.log(arguments)

        this.lastname = lastname,
        this.firstname = firstname,
        this.fathername = fathername,
        this.gender = gender,
        this.school = school,
        this.adres = adres
        this.date = date,
        this.group = group,
        this.groupCollection = groupCollection,
        this.escort = escort
    }
}

export default {
    state: {
        allClients: null,
        status: {},
        id: ''
    },
    mutations: {
        SET_ALLCLIENTS(state, payload){
            state.allClients = payload
        },
        NEW_CLIENTDATA(state, payload){
            state.allClients.push(payload)
        },
        NEW_STATUS(state, payload){
            state.status = payload
        },
        NEW_STATUSID(state, payload){
            state.id = payload
        }
    },
    actions: {
        GET_STATUS ({commit}, payload){
            commit('clearError')
            commit('setLoading', true)

            Vue.$db.collection(`allclients/${payload}/status`)
                .get()
                .then(QuerySnapshot => {
                    QuerySnapshot.forEach(s => {
                        const data = s.data()
                        const status = {
                        checkbox:  data.checkbox,
                        checkboxStatus: data.checkboxStatus,
                        responseStatus: data.responseStatus,
                        firstVisit: data.firstVisit,
                        }

                        const id = s.id

                        commit('NEW_STATUS', status)
                        commit('NEW_STATUSID', id)                  
                    })
                    commit('setLoading', false)
                })
                .error((err)=>console.log(err))
        },
        async CLIENT_STATUS ({commit}, {clientStatus, id}){
            commit('clearError')
            commit('setLoading', true)
            
            const newStatus = clientStatus
        
            try {
                await Vue.$db.collection(`allclients/${id}`).set(newStatus)
                
                commit('setLoading', false)
            } catch (error) {
                commit('setLoading', false)
                commit('setError', error.message)
            }
        },
        async SET_ALLCLIENTS({commit}){
            commit('clearError')
            commit('setLoading', true)

            try {
            await Vue.$db.collection(`allclients`).onSnapshot(snapshot => {
                let subcolection = []
                snapshot.docs.forEach(doc => { 
                    const data = doc.data() 
                        let datacollection = {  
                            id:doc.id,
                            lastname: data.lastname,
                            firstname: data.firstname,
                            fathername: data.fathername,
                            gender: data.gender,
                            school: data.school,
                            adres: data.adres,
                            dateBorn: data.dateBorn,
                            dateCurrent: data.dateCurrent,
                            convoir: data.convoir,
                            print: data.print,
                            createdNewCollection: data.createdNewCollection
                        } 
    
                        if (data.clients) { clientInfo.clients = data.clients}
                    
                        subcolection.push(datacollection)
                    })
                    commit('SET_ALLCLIENTS', subcolection)
            })
            commit('setLoading', false)
            } catch (error) {
                commit('setLoading', false)
                commit('setError', error.message)
            }
        },
        async NEW_CLIENTDATA({commit}, payload){
            commit('clearError')
            commit('setLoading', true)

            const newClient = {
                lastname: payload.lastname,
                firstname: payload.firstname,
                fathername: payload.fathername,
                gender: payload.gender,
                school: payload.school,
                adres: payload.adres,
                dateBorn: payload.dateBorn,
                print: payload.print,
                dateCurrent: new Date().toISOString().substr(0, 10),
                convoir: payload.convoir,
                createdNewCollection: payload.createdNewCollection
            }

            try {
            await Vue.$db.collection(`allclients`).add(newClient)
            commit('setLoading', false)
            } catch (error) {
                commit('setLoading', false)
                commit('setError', error.message)
            }
           
        },
        DELETE_CLIENTS({commit}, payload){
            Vue.$db.collection('allclients').doc(payload).delete()
                .then(()=>{
                })
                .catch((error)=>{
                    console.log(error)
                })
        }
    },
    getters: {
        getAllClients: (state) => state.allClients,
        allClientById (state) {
            return positionId => {
                return state.allClients.find(client => client.id === positionId)
            }
        },
        getStatus: (state) => state.status,
        getId: (state) => state.id
    }
}