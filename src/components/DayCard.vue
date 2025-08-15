<script setup>
import { computed, defineProps, ref } from 'vue'
import { useDateDataStore } from '@/stores/dateData'
import { useEventsStore } from '@/stores/eventsStore'
import DayCardModal from './DayCardModal.vue'

const dataStore = useDateDataStore()
const eventsStore = useEventsStore()
const isShowing = ref(false)

const props = defineProps({
  day: {
    type: Number,
    required: true,
  },
})

const date = computed(() => {
  if (props.day != 99) {
    return new Date(dataStore.getYear, dataStore.getMonthIndex, props.day)
  }
})

const dateString = computed(() => {
  if (!date.value) return null
  const year = date.value.getFullYear()
  let month = date.value.getMonth() + 1
  let day = date.value.getDate()
  if (month < 10) month = `0${month}`
  if (day < 10) day = `0${day}`
  return `${year}-${month}-${day}`
})

function handleSetDate() {
  dataStore.setDate(date)
}

function showModal() {
  if (eventsStore.events[dateString.value]) {
    isShowing.value = true
  }
}
</script>

<template>
  <v-card
    style="width: 100%"
    class="mx-2 my-0 pa-0 d-flex flex-column align-left overflow-auto"
    :class="[
      day != 99 ? 'dayCard' : 'dayPlaceholder',
      props.day == dataStore.selectedDate.getDate() && 'activeDay',
    ]"
    elevation="16"
    height="140"
    @click="handleSetDate"
    @dblclick="showModal"
  >
    <v-card-title class="fit-content py-0">
      {{ day != 99 ? day : null }}
    </v-card-title>

    <div style="white-space: nowrap; max-width: 100%">
      <v-list dense class="bg-transparent ma-1 pa-0 scrollable-list">
        <v-list-item
          dense
          v-for="(item, index) in eventsStore.events[dateString]"
          :key="index"
          class="list-item"
        >
          <v-icon :style="{ color: item.color }" size="12" icon="mdi-circle mx-2"></v-icon>
          <v-list-item-content style="min-width: 0">
            <v-list-item-value class="text-subtitle-2" :style="{ color: item.color }">{{
              item.event
            }}</v-list-item-value>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </div>
  </v-card>

  <teleport to="body">
    <DayCardModal v-if="isShowing" :day="props.day" @close="isShowing = false" />
  </teleport>
</template>
