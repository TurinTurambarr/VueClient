// import * as fb from 'firebase'
import Vue from 'vue'

class Ad {
    constructor (title, description, ownerId, imageSrc = '', promo = false, id = null) {
        this.title = title,
        this.description = description,
        this.ownerId = ownerId,
        this.imageSrc = imageSrc,
        this.promo = promo,
        this.id = id
    }
}

export default {
    state: {
        ads: [
            {
                title: 'First ad',
                description: 'Hello i am desc',
                promo: false,
                imageSrc: 'https://pp.userapi.com/c622924/v622924029/4164b/CoUGXZUCGYU.jpg',
                id: '123'
            },
            {
                title: 'Second ad',
                description: 'Hello i am desc',
                promo: true,
                imageSrc: 'https://sun7-4.userapi.com/I3UeMh2kMQNTDk8JDp_i3xq6kMoN6VSewiffLg/va_cPohy7vM.jpg',
                id: '124'
            },
            {
                title: 'Third ad',
                description: 'Hello i am desc',
                promo: true,
                imageSrc: 'https://pp.userapi.com/c323816/v323816577/8243/YQ3vAiTNRLg.jpg',
                id: '125'
            },
            {
                title: 'Third ad',
                description: 'Hello i am desc',
                promo: true,
                imageSrc: 'https://pp.userapi.com/c323816/v323816577/8243/YQ3vAiTNRLg.jpg',
                id: '125'
            },
            {
                title: 'Third ad',
                description: 'Hello i am desc',
                promo: true,
                imageSrc: 'https://pp.userapi.com/c323816/v323816577/8243/YQ3vAiTNRLg.jpg',
                id: '125'
            }
        ]
    },
    mutations: {
        createAd(state, payload){
            state.ads.push(payload)
        }
    },
    actions: {
        async createAd ({commit, getters}, payload) {
            commit('clearError')
            commit('setLoading', true)

            try {
                const newAd = new Ad(
                        payload.title, 
                        payload.description, 
                        getters.user.id, 
                        payload.imageSrc, 
                        payload.promo
                    )
      
                // подключиться к базе данных ads , создание нового эллемента это push
                const ad = await Vue.$db.collection('products').add(newAd)
                
                console.log(ad)   

                commit('setLoading', false)
                commit('createAd', {
                    ...newAd,
                    id: ad.key    
                })
            } catch (error) {
                commit('setError', error.message)
                commit('setLoading', false)

                throw error
            }
        }
    },
    getters: {
        ads (state) {
            return state.ads
        },
        promoAds (state) {
            return state.ads.filter(ad => {
                return ad.promo
            })
        },
        myAds (state) {
            return state.ads
        },
        adById (state) {
            return adId => {
                return state.ads.find(ad => ad.id === adId)
            }
        }
    }
}