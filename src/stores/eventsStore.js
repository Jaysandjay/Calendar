import { defineStore } from 'pinia'


export const useEventsStore = defineStore('events', {
  state: () => {
    return {
      events: {
        // ['2025-08-12']: [
        //   {
        //     class: 'Advanced Front-End Programming',
        //     color: 'yellow',
        //     event: 'Assignment 3',
        //     isComplete: false
        //   },
        //   {
        //     class: 'Advanced Front-End Programming',
        //     color: 'yellow',
        //     event: 'Assignment 4',
        //     isComplete: true
        //   },
   
        // ],
      },
    }
  },
  actions: {
    async fill() {
      console.log("Fetching events...")
      try{
        const res = await fetch('http://localhost:8000/api/events')
        if(!res.ok){
          throw new Error('Failed fetching events status ', res.status )
        }
        const data = await res.json()
        const events = {}
        for(const row of data.rows){

          if(!events[row.date]){
              events[row.date] = []
          }

          const event = {
              id: row.id,
              class: row.class_name,
              color: row.color,
              event: row.event,
              isComplete: row.is_complete
          }
            events[row.date].push(event)
        }
        this.events = events
      }catch(err){
        console.error("Error fetching events", err)
        throw new Error("Error fetching events")
      }
    },
    async addEvent(date, event) {
      
      try{
        const newEvent = {
          date: date,
          className: event.class,
          color: event.color,
          event: event.event,
          isComplete: event.isComplete
        }
        const res = await fetch('http://localhost:8000/api/events', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(newEvent)
        })
        if (this.events[date]) {
          this.events[date].push(event)
          console.log(event)
        } else {
          this.events = { ...this.events, [date]: [event] }
        }
      }catch(err){
        console.error("Error creating new event", err)
        throw new Error("Error creating new Event")
      }
    },
    async deleteEvent(id){
      try{
        const res = await fetch (`http://localhost:8000/api/events/${id}`,{
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
        const res = await fetch(`http://localhost:8000/api/events/update-completion/${id}`,{
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
