import { defineStore } from 'pinia'
import { API_URL } from '../../config'


export const useUsersStore = defineStore('users', {
  state: () => {
    return { user: {} }
  },
  actions:{
    async findUser(user){
    try {
        let res = await fetch(`${API_URL}/api/users/login/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        })
        res = await res.json()
        console.log("findUser response:", res)

        if(res.user && res.user.id){
            this.user = {
                email: res.user.email,
                id: res.user.id
            }
        } else {
            this.user = {}
        }
    } catch(err){
        console.error("Error finding user:", err)
        this.user = {}
    }
},


    async createUser(user) {
    try {
        let res = await fetch(`${API_URL}/api/users/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        })
        res = await res.json()
        console.log("createUser response:", res)

        // Check if user exists in response
        if(res.user && res.user.id){
            this.user = {
                email: res.user.email,
                id: res.user.id
            }
        } else {
            // API returned an error
            console.error("User creation failed:", res)
            this.user = {}
        }
    } catch(err){
        console.error("Error creating user:", err)
        this.user = {}
    }
},


    logout(){
        this.user = {}
    }
  }
})