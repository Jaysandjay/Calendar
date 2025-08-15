<script setup>
import { computed } from 'vue'
import { useDateDataStore } from '@/stores/dateData'
import { defineProps } from 'vue'

const props = defineProps({
  title: {
    type: String,
  },
})

const dateStore = useDateDataStore()

const dueDate = computed({
  get() {
    return dateToString(dateStore.selectedDate) // string YYYY-MM-DD
  },
  set(dateString) {
    const split = dateString.split('-')
    const newDate = new Date(split[0], split[1] - 1, split[2])
    dateStore.setDate(newDate)
  },
})

function dateToString(date) {
  console.log(typeof date)
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

</script>

<template>
  <v-text-field
    v-model="dueDate"
    :label="props.title"
    type="date"
    variant="outlined"
    :clearable="false"
    :rules="[(v) => !!v || 'Date is required']"
    required
    style="min-width: 160px"
  />
</template>
