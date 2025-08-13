import { defineStore } from 'pinia'

export const useClassesStore = defineStore('classes', {
  state: () => {
    return {
      items: [
        { class: 'Advanced Front-End Programming', color: 'yellow' },
        { class: 'Database Programming', color: 'blue' },
        { class: 'Fundamentals Numeric Computing', color: 'orange' },
        { class: 'Object Oriented Programming', color: 'green' },
        { class: 'Technical Workplace Writing Skills', color: 'purple' },
      ],
    }
  },
  getters: {
    getClasses: (state) => {
      return state.items.map((item) => item.class)
    },
    getColor: (state) => (className) => {
      const item = state.items.find((item) => {
        return item.class === className
      })
      return item ? item.color : 'black'
    },
  },
  actions: {
    addClass(newClass){
      this.items.push(newClass)
    },
    deleteClass(classInfo){
      console.log(classInfo)
      let updatedClasses = this.items.filter((c) => !(c.class == classInfo.class && c.color == classInfo.color))
      this.items = updatedClasses
    }
    
  }
})
