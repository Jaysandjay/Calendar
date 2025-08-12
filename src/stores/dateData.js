import { defineStore } from 'pinia'

export const useDateDataStore = defineStore('dateData', {
  state: () => {
    const now = new Date()
    const formatedDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    return {
      selectedDate: formatedDate,
    }
  },
  getters: {
    getToday(){
        const now = new Date()
        const formatedDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        return formatedDate
    },
    getMonth() {
        const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
        ]
        return monthNames[this.selectedDate.getMonth()]
    },
    getMonthIndex(){
        return this.selectedDate.getMonth()
    },
    getYear() {
      return this.selectedDate.getFullYear()
    },
    getDay() {
        const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      return dayNames[this.selectedDate.getDay()]
    },
    getNumOfDaysInMonth() {
      const num = new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth() + 1, 0).getDate()
      let numArray = []
        for (let i = 1; i <= num; i++) {
            numArray.push(i)
        }
        return num
    },
    getFirstDayOfMonth() {
      return new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth(), 1).getDay()
    },
    getWeeks() {
        let day = 1
        const weeks = {
            week1: [],
            week2: [],
            week3: [],
            week4: [],
            week5: []
        }

        for(let i = 0; i < this.getFirstDayOfMonth; i++){
            weeks.week1.push(99)
        }

        for(const num in weeks){
            while(weeks[num].length < 7){
                if(day <= this.getNumOfDaysInMonth){
                    weeks[num].push(day)
                    day++
                }else{
                    weeks[num].push(99)
                }
            }
        }

        if(day <= this.getNumOfDaysInMonth){
            weeks["week6"] = []
            for(let i = day; i <= this.getNumOfDaysInMonth; i++){
                weeks.week6.push(i)
            }
            while(weeks.week6.length < 7){
                weeks.week6.push(99)
            }
        }
      
        
        return weeks
    }


},
  actions: {
    setDate(date) {
      this.selectedDate = date
    }   
    }
  
})
