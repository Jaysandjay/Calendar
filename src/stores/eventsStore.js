import { defineStore } from 'pinia'

export const useEventsStore = defineStore('events', {
  state: () => {
    return {
      items: {
        [new Date().toISOString()] : {
          class: "Advanced Front-End Programming",
          color: 'yellow',
          event: "Assignment 3"
        }
      },
    }
  },
  getters: {},
  actions: {
    async fill() {
      // Fill items with data from database.
    },
    addEvent(newEvent) {
      this.items.push(newEvent)
    },
  },
})
