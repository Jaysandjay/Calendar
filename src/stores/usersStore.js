import { defineStore } from 'pinia'


export const useUsersStore = defineStore('users', {
  state: () => {
    return { user: {} }
  },
  actions:{
    async findUser(user){
        let res = await fetch('http://localhost:8000/api/users/login',{
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
    },

    async createUser(user) {
        let res = await fetch('http://localhost:8000/api/users/',{
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