import Vue from 'vue'
import * as fb from 'firebase'

export default {
    state: {
        client: [],
        stateUpload : null
    },
    mutations: {
        SET_CLIENTLOADING(state, payload){
            state.stateUpload = payload
        },
        CLEAR_CLIENTLOADING(state){
            state.stateUpload = null
        },
        SET_CLIENT(state, payload){
            state.client = payload
        }
    },
    actions: {
        CLEAR_CLIENTLOADING({commit}) {
            commit('CLEAR_CLIENTLOADING')
        },
        async NEW_POSITION({commit}, {ad, cont}){
            commit('clearError')
            commit('setLoading', true)
            commit('SET_CLIENTLOADING', 0)

            const context = cont

            let client = {
                ages: ad.ages,
                title: ad.title,
                price: ad.price,
                collection: ad.collection
            }

            const subCollection = ad.collection

            let imageSrc 
            let key

            await Vue.$db.collection('client').add(client)
            .then((data)=>{
                key = data.id

                commit('setLoading', false)
                return key
            })
            .then(key => {
                const image = ad.imageSrc
                const imageExt = image.name.slice(image.name.lastIndexOf('.'))
                const uploadTask = fb.storage().ref(`client/${key}.${imageExt}`).put(image)

                uploadTask.on('state_changed', (snapshot) => {
                    let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    console.log('Upload is ' + progress + '% done')

                    if (progress == 100) {
                        setTimeout(()=>{
                            context.$router.push('/clients')  
                        }, 500)
                    }
                }, (error) => {
                    commit('setError', error.message)
                }, () => {
                    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        console.log('File available at', downloadURL)
                        imageSrc = downloadURL
                        Vue.$db.collection('client').doc(key).update({imageSrc: imageSrc})
                    })
                })
            })
            .then(()=>{
                // for (let i = 0; i < subCollection.length; i++){
                //      Vue.$db.collection(`client`).doc(key).collection(subCollection[i]).add({})
                // }
            })
            .then(()=>{
                commit('SET_CLIENT', {
                    ...client,
                    imageSrc: imageSrc,
                    id: key
                })
            })
            .catch((error)=>{
                commit('setError', error.message)
                commit('setLoading', false)
            })
        },
        NEW_SUBCOLLECTION({commit}, {col, doc, subcol}){
                 Vue.$db.collection(`${col}/${doc}/${subcol}`)
                 .add({
                     message: 'Успех'
                 })
                 .then(ref => {
                      console.log('Added document with ID: ', ref.id)
                 })
        },
        SET_CLIENT({commit}){
            Vue.$db.collection("client").onSnapshot(snapshot => { 
                let clients = []; 
                snapshot.docs.forEach(doc => { 
                const data = doc.data() 
                    let clientInfo = { 
                        name:data.client, 
                        id:doc.id 
                    } 

                    if (data.clients){ clientInfo.clients = data.clients}
                
                    clients.push(clientInfo)
                }) 
                    commit('SET_CLIENT',clients)
                })
        },
        LOAD_CLIENT({commit}, payload){
            
        }
    },
    getters: {
      stateUpload: (state) => state.stateUpload,
      getAllClient: (state) => state.client
    }
}