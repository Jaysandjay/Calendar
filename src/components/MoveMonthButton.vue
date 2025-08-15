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
  const current = dateStore.selectedDate
  const year = current.getFullYear()
  const month = current.getMonth() + (props.direction === 'prev' ? -1 : 1)

  // Use Date constructor safely
  const newDate = new Date(year, month, 1)
  dateStore.setDate(newDate)
}
</script>

<template>
  <v-btn class="mx-5" @click="moveMonth">
    <v-icon :icon="icon"></v-icon>
  </v-btn>
</template>
