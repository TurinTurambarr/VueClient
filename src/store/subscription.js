import Vue from 'vue'

export default {
    state: {
        allSubscription: [],
        id: ''
    },
    mutations: {
        GET_ALLSUBSCRIPTION(state, payload){
            state.allSubscription = payload
        }
    },
    actions: {
        NEW_SUBSCRIPTION({commit}, {newSubscription, id}){
            commit('clearError')
            commit('setLoading', true)

            const statistic = {
                date:  new Date().toISOString().substr(0, 10),
                count: newSubscription.count,
                group: newSubscription.group,
                price: Number(newSubscription.price),
                title: newSubscription.title
            }
            

            Vue.$db.collection(`allclients/${id}/statistics`).add(statistic)
            .then(()=>{
                commit('setLoading', false)
            })
            .catch((err)=>{
                commit('setLoading', false)
                commit('setError', err.message)
            })
        },
        async GET_ALLSUBSCRIPTION ({commit}, payload){
            
            commit('clearError')
            commit('setLoading', true)

            try {
                await Vue.$db.collection(`allclients/${payload}/statistics`).onSnapshot(snapshot => {
                    let allstatistics = []
                    snapshot.docs.forEach(doc => { 
                        const data = doc.data() 
                            let statistics = {  
                                id:doc.id,
                                date:  data.date,
                                count: data.count,
                                group: data.group,
                                price: data.price,
                                title: data.title
                            } 

                            allstatistics.push(statistics)
                        })
                        commit('GET_ALLSUBSCRIPTION', allstatistics)
                })
                commit('setLoading', false)
                } catch (error) {
                    commit('setLoading', false)
                    commit('setError', error.message)
                }
        },
        DELETE_SUBSCRIPTION({commit}, {id, idSub}){
            Vue.$db.collection(`allclients/${id}/statistics`).doc(idSub).delete()
                .then(()=>{
                })
                .catch((error)=>{
                    console.log(error)
                })
        }
    },
    getters: {
        getAllSubscription: (state) => state.allSubscription,
        subscription (state) {
            return positionId => {
                return state.allSubscription.find(client => client.id === positionId)
            }
        }
    }
}