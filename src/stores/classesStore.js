import { defineStore } from 'pinia'
import { useUsersStore } from './usersStore'
import { API_URL } from '../../config'
import { useEventsStore } from './eventsStore'

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
      return item ? item.id : null
    }
  },
  actions: {
    async fill() {
      const userStore = useUsersStore()
      console.log("Fetching Classes...")
      if(userStore.user.id){
        console.log("User ID: ", userStore.user.id)
        try{
          const res = await fetch(`${API_URL}/api/classes/${userStore.user.id}`)
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
        const res = await fetch(`${API_URL}/api/classes`,{
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify(newClass)
        })
        if (!res.ok) throw new Error("Failed to create class")
        const createdClass = await res.json()
        console.log("Created class", createdClass)
        this.items.push(createdClass)
        console.log("classes", this.items)
        
      }catch(err){
        console.error("Error creating class", err)
        throw new Error("Error creating class")
      }
    },
    async deleteClass(classInfo) {
      try{
        await fetch(`${API_URL}/api/classes/${classInfo.id}`,{
          method: 'DELETE'
        })
        this.items = this.items.filter(c => c.id !== classInfo.id)

        const eventStore = useEventsStore()
        await eventStore.fill()
      }catch(err){
        console.error(`Error deleting class with id: ${classInfo.id}`, err)
        throw new Error(`Error deleting class with id: ${classInfo.id}`)
      }
    },
  },
})
