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

// function moveMonth() {
//   const current = new Date(dateStore.selectedDate.value)
//   const monthOffset = props.direction === 'prev' ? -1 : 1
//   const newDate = new Date(current.getFullYear(), current.getMonth() + monthOffset, 1)

//   dateStore.setDate(newDate)
// }
</script>

<template>
  <v-btn class="mx-5" @click="dateStore.moveMonth(props.direction)">
    <v-icon :icon="icon"></v-icon>
  </v-btn>
</template>
