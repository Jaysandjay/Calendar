<script setup>
import { ref, computed } from 'vue'
import { useClassesStore } from '../stores/classesStore'
import { useEventsStore } from '../stores/eventsStore'
import { useDateDataStore } from '@/stores/dateData'

const eventsStore = useEventsStore()
const classesStore = useClassesStore()
const dateStore = useDateDataStore()
const event = ref('')
const selectedClass = ref()
const dueDate = computed({
  get(){return dateToString(dateStore.selectedDate)},
  set(date){dateStore.setDate(unformatDate(date))}
})
const formRef = ref(null)


function dateToString(date){
  console.log(typeof(date))
  let year = (date.getFullYear())
  let month = (date.getMonth() + 1)
  let day = (date.getDate())
  if(month < 10){
    month = `0${month}`
  }
  if(day < 10){
    day = `0${day}`
  }
  let formatedDate = `${year}-${month}-${day}`
  return formatedDate
}

function unformatDate(date){
  let split = date.split('-')
  let selectedDate = new Date(split[0], split[1] - 1, split[2])
  return selectedDate
}

function clearInput() {
  event.value = ''
  selectedClass.value = null
  if (formRef.value) {
    // Wait for next tick so DOM updates
    setTimeout(() => {
      formRef.value.resetValidation()
    }, 0)
  }
}

function addItem() {

  if (!formRef.value.validate()) {
    return
  }
  const newEvent = {
    class: selectedClass.value,
    color: classesStore.getColor(selectedClass.value),
    event: event.value
  }
  eventsStore.addEvent(dueDate.value,newEvent)
  clearInput()
}


</script>

<template>
  <v-sheet class="mx-auto my-5" width="450">
    <v-form ref="formRef" @submit.prevent="addItem">
      <v-text-field 
      v-model="event" 
      :rules="[(v) => !!v || 'Event is required']" 
      label="Event"
      ></v-text-field>

      <v-select
        class="my-5"
        v-model="selectedClass"
        :items="classesStore.getClasses"
        :rules="[(v) => !!v || 'Item is required']"
        label="Class"
        required
      ></v-select>

      <v-text-field
        class="my-5"
        v-model="dueDate"
        label="Due Date"
        type="date"
        variant="outlined"
        :rules="[(v) => !!v || 'Date is required']"
        required
      />

      <v-btn class="mt-2" type="submit" block>Submit</v-btn>
    </v-form>
  </v-sheet>
</template>
