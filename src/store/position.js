import Vue from 'vue'

export default {
    state: {
       subClient: []
    },
    mutations: {
        SET_SUBCLIENT(state, payload){
            state.subClient = payload
        } 
    },
    actions: {
        ADD_SUBCLIENT({commit}, {subclient, key, subcey}){
            commit('clearError')
            commit('setLoading', true)

            let subclients = {
                firstname: subclient.firstname,
                lastname: subclient.lastname,
                fathername: subclient.fathername,
                phone: subclient.phone,
                email: subclient.email,
                gender: subclient.gender
             }

             Vue.$db.collection('client').doc(key).collection(subcey).add(subclients)
                    .then(()=>{
                        commit('setLoading', false)
                    })
                    .catch((error)=>{
                        commit('setError', error.message)
                        commit('setLoading', false)
                    })
        },
        async SET_SUBCLIENT({commit}, {key, subcollection}){
            await Vue.$db.collection(`client/${key}/${subcollection}`).onSnapshot(snapshot => { 
                let clients = []; 
                snapshot.docs.forEach(doc => { 
                const data = doc.data() 
                    let clientInfo = {  
                        firstname: data.firstname,
                        lastname: data.lastname,
                        fathername: data.fathername,
                        phone: data.phone,
                        email: data.email,
                        gender: data.gender,
                        isShow: false,
                        id:doc.id 
                    } 

                    if (data.clients) { clientInfo.clients = data.clients}
                
                    clients.push(clientInfo)
                }) 
                    commit('SET_SUBCLIENT',clients)
                })
        },
        DELETE_SUBCLIENT({commit}, {key, subcollection, elID}){
                commit('clearError')
                commit('setLoading', true)
                Vue.$db.collection(`client/${key}/${subcollection}`).doc(elID).delete()
                .then(()=>{
                    commit('setLoading', false)
                })
                .catch((error)=>{
                    commit('setError', error.message)
                    commit('setLoading', false)
                })
        }
    },
    getters: {
        getAllPositionClient: (state) => state.subClient,
        positionById (state) {
            return positionId => {
                return state.subClient.find(client => client.id === positionId)
            }
        }
    }
}