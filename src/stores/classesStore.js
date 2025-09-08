import { defineStore } from 'pinia'
import { useUsersStore } from './usersStore'


export const useClassesStore = defineStore('classes', {
  state: () => {
    
    return {
      items: [],
    }
  },
  getters: {
    getClassNames: (state) => {
      console.log("items: ", state.items)
      if(state.items){
        return state.items.map((item) => item.name)
      }else{
        return []
      }
    },
    getColor: (state) => (className) => {
      const item = state.items.find((item) => {
        return item.name === className
      })
      return item ? item.color : 'black'
    },
    getClassId: (state) => (className) => {
      const item = state.items.find((item) => item.name == className)
      return item.id
    }
  },
  actions: {
    async fill() {
      const userStore = useUsersStore()
      console.log("Fetching Classes...")
      if(userStore.user.id){
        console.log("User ID: ", userStore.user.id)
        try{
          const res = await fetch(`http://localhost:8000/api/classes/${userStore.user.id}`)
          if(!res.ok){
            throw new Error('Failed fetching classes status ', res.status )
          }
          const data = await res.json()
          this.items = data
        }catch(err){
          console.error("Error fetching classes", err)
          throw new Error("Error fetching classes")
        }
      }else{
        console.log("ERROR: no user id")
      }
    },
    async addClass(newClass) {
      try{
        const userStore = useUsersStore()
        newClass = {...newClass, userId: userStore.user.id}
        console.log(newClass)
        const res = await fetch('http://localhost:8000/api/classes',{
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify(newClass)
        })
        this.fill()
      }catch(err){
        console.error("Error creating class", err)
        throw new Error("Error creating class")
      }
    },
    async deleteClass(classInfo) {
      try{
        await fetch(`http://localhost:8000/api/classes/${classInfo.id}`,{
          method: 'DELETE'
        })
        let updatedClasses = this.items.filter(
          (c) => !(c.class == classInfo.class && c.color == classInfo.color),
        )
        this.items = updatedClasses
      }catch(err){
        console.error(`Error deleting class with id: ${classInfo.id}`, err)
        throw new Error(`Error deleting class with id: ${classInfo.id}`)
      }
    },
  },
})
