import { defineStore } from 'pinia'

export const useEventsStore = defineStore('events', {
  state: () => {
    return {
      events: {
        ["2025-08-12"] :[
        {
          class: "Advanced Front-End Programming",
          color: 'yellow',
          event: "Assignment 3"
        },
        {
          class: "Advanced Front-End Programming",
          color: 'yellow',
          event: "Assignment 3"
        },
        {
          class: "Advanced Front-End Programming",
          color: 'yellow',
          event: "Assignment 3"
        }
      ]
      },
    }
  },
  getters: {
    getEvent: (state) => (date) =>{
      
    }
  },
  actions: {
    async fill() {
      // Fill items with data from database.
    },
    addEvent(date, event) {
      if(this.events[date]){
        this.events[date].push(event)
      }else{
        this.events = {...this.events, [date]: [event]}
      }
    },
  },
})
