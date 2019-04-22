import Vue from 'vue'

export default {
    state: {
        task: null,
        taskID: ''
    },
    mutations: {
      SET_TASK(state, payload){
          state.task = payload
      },
      SET_TASKID(state, payload) {
        state.taskID = payload
      }
    },
    actions: {
        async LOAD_TASKID({commit}, payload){
            const  getID = Vue.$db.collection("tasks").doc(payload)
                await getID
                .get()
                .then((doc)=>{
                    if(doc.exists){
                        let elemId = doc.data()
                        commit('SET_TASKID', elemId)
                    }
                })
                .catch(function(error) {
                    console.log("Error getting document:", error);
                })
        },
        LOAD_TASK({commit}){
            Vue.$db.collection('tasks')
            .get()
            .then(QuerySnapshot => {
                let tasks = []
                QuerySnapshot.forEach(s => {
                    const data = s.data()
                    let task = {
                       id:  s.id,
                       rating: data.rating,
                       name: data.name,
                       manager: data.manager,
                       lastmanager: data.lastmanager,
                       date: data.date,
                       comment: data.comment,
                       isShow: false,
                       subtask: data.subtask.slice()
                    }

                    tasks.push(task)
                })

                commit('SET_TASK', tasks)
            })  
            .catch(error => console.log(error))
        },
        NEW_TASK({commit}, payload){
            let task = {
                rating: payload.rating,
                name: payload.name,
                manager: payload.manager,
                lastmanager: payload.lastmanager,
                date: payload.date,
                comment: payload.comment,
                subtask: payload.subtask
             }
            Vue.$db.collection('tasks').add(task)
                .then(()=>{
                    commit('SET_TASK', tasks)
                })
                .catch((error)=>{
                    console.log(error)
                })
        },
        DELETE_TASK({commit}, payload){
            Vue.$db.collection('tasks').doc(payload).delete()
                .then(()=>{
                    commit('SET_TASK', tasks)
                })
                .catch((error)=>{
                    console.log(error)
                })
        }
    },
    getters: {
       myTask: (state) => state.task,
       taskById (state) {
            return taskId => {
                return state.task.find(task => task.id === taskId)
            }
        },
        taskRerender: (state) => state.taskID
    }
}