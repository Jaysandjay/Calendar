<script setup>
import { ref } from 'vue'
import { useClassesStore } from '../stores/classesStore'
import { useEventsStore } from '../stores/eventsStore'

const eventsStore = useEventsStore()
const classesStore = useClassesStore()
const event = ref('')
const selectedClass = ref()
const dueDate = ref()
const formRef = ref(null)

const rules = [
  (value) => {
    if (value) return true
    return 'You must enter a name for the event.'
  },
]

function clearInput() {
  event.value = ''
  selectedClass.value = null
  dueDate.value = null
  if (formRef.value) {
    // Wait for next tick so DOM updates
    setTimeout(() => {
      formRef.value.resetValidation()
    }, 0)
  }
}

function addItem() {
  console.log("submit")
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
  {{ dueDate }}
  {{ eventsStore.events }}
  <v-sheet class="mx-auto my-5" width="350">
    <v-form ref="formRef" @submit.prevent="addItem">
      <v-text-field v-model="event" :rules="rules" label="Event"></v-text-field>

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
