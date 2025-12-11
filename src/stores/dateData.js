import { defineStore } from 'pinia'



export const useDateDataStore = defineStore('dateData', {
  state: () => {
    const now = new Date()
    return { selectedDate: new Date(now.getFullYear(), now.getMonth(), now.getDate()) }
  },
  getters: {
    getToday: (state) => {
      const now = new Date()
      return new Date(now.getFullYear(), now.getMonth(), now.getDate())
    },
    getMonth: (state) => {
      const monthNames = [
        'January','February','March','April','May','June',
        'July','August','September','October','November','December'
      ]
      return monthNames[state.selectedDate.getMonth()]
    },
    getMonthIndex: (state) => state.selectedDate.getMonth(),
    getYear: (state) => state.selectedDate.getFullYear(),
    getDay: (state) => {
      const dayNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
      return dayNames[state.selectedDate.getDay()]
    },
    getNumOfDaysInMonth: (state) => new Date(state.selectedDate.getFullYear(), state.selectedDate.getMonth() + 1, 0).getDate(),
    getFirstDayOfMonth: (state) => new Date(state.selectedDate.getFullYear(), state.selectedDate.getMonth(), 1).getDay(),
    getWeeks: (state) => {
      const weeks = { week1: [], week2: [], week3: [], week4: [], week5: [] }
      let day = 1
      const firstDay = new Date(state.selectedDate.getFullYear(), state.selectedDate.getMonth(), 1).getDay()
      const numDays = new Date(state.selectedDate.getFullYear(), state.selectedDate.getMonth() + 1, 0).getDate()

      for (let i = 0; i < firstDay; i++) weeks.week1.push(99)

      for (const week in weeks) {
        while (weeks[week].length < 7) {
          if (day <= numDays) weeks[week].push(day++)
          else weeks[week].push(99)
        }
      }

      if (day <= numDays) {
        weeks.week6 = []
        for (; day <= numDays; day++) weeks.week6.push(day)
        while (weeks.week6.length < 7) weeks.week6.push(99)
      }

      return weeks
    },
  },
  actions: {
    setDate(date) {
      this.selectedDate = date
    },
    moveMonth(direction) {
      const monthOffset = direction === 'prev' ? -1 : 1
      const current = new Date(this.selectedDate)
      const newDate = new Date(current.getFullYear(), current.getMonth() + monthOffset, 1)

      this.setDate(newDate)
      }
  },
})
