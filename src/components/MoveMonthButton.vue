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
  if (props.direction === 'prev') {
    dateStore.setDate(
      new Date(dateStore.selectedDate.getFullYear(), dateStore.selectedDate.getMonth() - 1, 1),
    )
  } else if (props.direction === 'next') {
    dateStore.setDate(
      new Date(dateStore.selectedDate.getFullYear(), dateStore.selectedDate.getMonth() + 1, 1),
    )
  }
}
</script>

<template>
  <v-btn class="mx-5" @click="moveMonth">
    <v-icon>{{ icon }}</v-icon>
  </v-btn>
</template>
