import { defineStore } from 'pinia'
import { useUsersStore } from './usersStore'
import { API_URL } from '../../config'

export const useEventsStore = defineStore('events', {
  state: () => {
    return {
      events: {
      //   "2025-08-20": [
      //   {
      //       "id": 8,
      //       "class": "Math",
      //       "color": "red",
      //       "event": "Lab 1",
      //       "isComplete": false
      //   },
      //   {
      //       "id": 9,
      //       "class": "Math",
      //       "color": "red",
      //       "event": "Lab 2",
      //       "isComplete": false
      //   }
      // ],
      },
    }
  },
  actions: {
    async fill() {
      console.log("Fetching events...")
      const userStore = useUsersStore()
      try{
        const res = await fetch(`${API_URL}/api/events/${userStore.user.id}`)
        if(!res.ok){
          throw new Error('Failed fetching events status ', res.status )
        }
        const data = await res.json()
        this.events = data
      }catch(err){
        console.error("Error fetching events", err)
        throw new Error("Error fetching events")
      }
    },
    async addEvent(date, event) {
      
      try{
        const newEvent = {
          date: date,
          event: event.event,
          class_id: event.classId
        }
        console.log(newEvent)
        const res = await fetch(`${API_URL}/api/events`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(newEvent)
        })

        await this.fill()
      }catch(err){
        console.error("Error creating new event", err)
        throw new Error("Error creating new Event")
      }
    },
    async deleteEvent(id){
      try{
        const res = await fetch (`${API_URL}/api/events/${id}`,{
          method: 'DELETE'
        })
        if(!res.ok){
          throw new Error(`Failed to delete event with id ${id} status: ${res.status}`)
        }
        console.log(`Event with id ${id} deleted`)
      }catch(err){
        console.error(`Failed to delete event with id ${id}`, err)
      }
    },
    async updateIsChecked(id, value){
      try{
        const res = await fetch(`${API_URL}/api/events/update-completion/${id}`,{
          method: 'PUT',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify({'isComplete': value})
        })
        if(!res.ok){
          throw new Error(`Failed to update event with id ${id} status: ${res.status}`)
        }
      }catch(err){
        console.error(`Failed to update event with id ${id}`, err)
      }
    }
  },
})
