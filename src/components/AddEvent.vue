<script setup>
import { ref, computed } from 'vue'
import { useClassesStore } from '../stores/classesStore'
import { useEventsStore } from '../stores/eventsStore'
import { useDateDataStore } from '@/stores/dateData'
import MiniCalendar from './MiniCalendar.vue'

const eventsStore = useEventsStore()
const classStore = useClassesStore()
const dateStore = useDateDataStore()
const event = ref('')
const selectedClass = ref()

const dueDate = computed({
  get() {
    return dateToString(dateStore.selectedDate)
  },
})
const formRef = ref(null)

function dateToString(date) {
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  if (month < 10) {
    month = `0${month}`
  }
  if (day < 10) {
    day = `0${day}`
  }
  let formatedDate = `${year}-${month}-${day}`
  return formatedDate
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
    classId: classStore.getClassId(selectedClass.value),
    event: event.value,
  }
  eventsStore.addEvent(dueDate.value, newEvent)
  clearInput()
}
</script>

<template>
  <v-sheet class="mx-auto my-5" style="width: 98%">
    <v-form ref="formRef" @submit.prevent="addItem">
      <v-text-field
        v-model="event"
        :rules="[(v) => !!v || 'Event is required']"
        label="Event"
      ></v-text-field>

      <v-select
        class="my-5"
        v-model="selectedClass"
        :items="classStore.getClassNames"
        :rules="[(v) => !!v || 'Item is required']"
        label="Class"
        required
      ></v-select>

      <MiniCalendar title="Due Date" />

      <v-btn class="mt-2 rounded-0 secondary" type="submit" block>Submit</v-btn>
    </v-form>
  </v-sheet>
</template>
