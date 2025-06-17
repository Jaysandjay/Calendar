<script setup>
import { VCalendar } from 'vuetify/labs/VCalendar'
import { ref, onMounted } from 'vue'
import { useDate } from 'vuetify'
import { useEventsStore } from '../stores/eventsStore'

const eventsStore = useEventsStore()

const type = ref('month')
const types = ['month', 'week', 'day']

const value = ref([new Date()])
const events = ref([])

const adapter = useDate()

function rnd(a, b) {
  return Math.floor((b - a + 1) * Math.random()) + a
}

function getEvents() {
  events.value = eventsStore.items
}

function getEventColor(event) {
  return event.color
}

onMounted(() => {
  const start = adapter.startOfDay(adapter.startOfMonth(new Date()))
  const end = adapter.endOfDay(adapter.endOfMonth(new Date()))
  getEvents()
})
</script>

<template>
  <div class="calendar">
    <v-sheet class="d-flex" height="54" tile>
      <v-select
        v-model="type"
        :items="types"
        class="ma-2"
        density="compact"
        label="View Mode"
        variant="outlined"
        hide-details
      ></v-select>
    </v-sheet>
    <v-sheet>
      <v-calendar ref="calendar" v-model="value" :events="events" :view-mode="type"></v-calendar>
    </v-sheet>
  </div>
</template>

<style scoped>
.calendar {
  width: 900px;
  border: solid grey 3px;
  padding: 15px;
}
</style>
