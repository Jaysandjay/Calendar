<script setup>
import { computed, defineProps } from 'vue'
import { useDateDataStore } from '../stores/dateData.js'
const dateStore = useDateDataStore()

const props = defineProps({
  direction: {
    type: String,
    required: true,
    validator: (value) => ['prev', 'next'].includes(value),
  },
})

const icon = computed(() => (props.direction === 'prev' ? 'mdi-chevron-left' : 'mdi-chevron-right'))

function moveMonth() {
  // Clone the date safely to a plain JS Date
  const current = new Date(dateStore.selectedDate.getTime())

  // Determine new month offset
  const monthOffset = props.direction === 'prev' ? -1 : 1

  // Create a new Date instance for the first of the new month
  const newDate = new Date(current.getFullYear(), current.getMonth() + monthOffset, 1)

  // Update the store using the action
  dateStore.setDate(newDate)
}
</script>

<template>
  <v-btn class="mx-5" @click="moveMonth">
    <v-icon :icon="icon"></v-icon>
  </v-btn>
</template>
