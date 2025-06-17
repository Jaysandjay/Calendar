import { defineStore } from 'pinia'

export const useEventsStore = defineStore('events', {
  state: () => {
    return {
      items: [],
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
