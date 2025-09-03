import { defineStore } from 'pinia'

export const useClassesStore = defineStore('classes', {
  state: () => {
    return {
      items: [
        // { class: 'Advanced Front-End Programming', color: 'yellow' },
        // { class: 'Database Programming', color: 'blue' },
        // { class: 'Fundamentals Numeric Computing', color: 'orange' },
        // { class: 'Object Oriented Programming', color: 'green' },
        // { class: 'Technical Workplace Writing Skills', color: 'purple' },
      ],
    }
  },
  getters: {
    getClassNames: (state) => {
      return state.items.map((item) => item.name)
    },
    getColor: (state) => (className) => {
      const item = state.items.find((item) => {
        return item.name === className
      })
      return item ? item.color : 'black'
    },
  },
  actions: {
    async fill() {
      console.log("Fetching Classes...")
      try{
        const res = await fetch('http://localhost:8000/api/classes')
        if(!res.ok){
          throw new Error('Failed fetching classes status ', res.status )
        }
        const data = await res.json()
        console.log(data.rows)

        this.items = data.rows
      }catch(err){
        console.error("Error fetching classes", err)
        throw new Error("Error fetching classes")
      }
    },
    async addClass(newClass) {
      try{
        const res = await fetch('http://localhost:8000/api/classes',{
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify(newClass)
        })
        this.items.push(newClass)
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
