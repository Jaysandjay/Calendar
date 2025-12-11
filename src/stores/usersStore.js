import { defineStore } from 'pinia'
import { API_URL } from '../../config'


export const useUsersStore = defineStore('users', {
  state: () => {
    return { user: {} }
  },
  actions:{
    async findUser(user){
        console.log(`UserStore findUser(${JSON.stringify(user)})`)
        let res = await fetch(`${API_URL}/api/users/login/`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        res = await res.json()
        if(res.user){
            this.user = {
                email: res.user.email,
                id: res.user.id
            }
        }
        console.log("findUser:", JSON.stringify(user))
    },

    async createUser(user) {
        let res = await fetch(`${API_URL}/api/users/`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        res = await res.json()
        console.log(res)
        this.user = {
            email: res.user.email,
            id: res.user.id
        }
        
    },

    logout(){
        this.user = {}
    }
  }
})