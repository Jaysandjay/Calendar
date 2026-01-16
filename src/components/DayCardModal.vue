<script setup>
import { computed, defineProps, defineEmits, ref } from 'vue'
import { useDateDataStore } from '@/stores/dateData'
import { useEventsStore } from '@/stores/eventsStore'

const dataStore = useDateDataStore()
const eventsStore = useEventsStore()
const isChecked = ref()
const emit = defineEmits(['close'])

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

function deleteEvent(event) {
  // console.log(dateString)
  // console.log(dateString.value)
  // console.log(event)
  // console.log(event.id)
  // console.log(eventsStore.events[dateString])
  const currentEvents = eventsStore.events[dateString.value]
  let modifiedEvents = currentEvents.filter((ev) => ev != event)
  eventsStore.events[dateString.value] = modifiedEvents
   eventsStore.deleteEvent(event.id)
}

function updateIsComplete(item, event){
  const events = eventsStore.events[dateString.value]
  const currentEvent = events.find(e => e.id == item.id)
  currentEvent.isComplete = event.target.checked

  eventsStore.updateIsChecked(item.id, event.target.checked)
}

function handleClose() {
  emit('close')
}
</script>

<template>
  <div class="modal-overlay w-auto">
    <v-card class="dayCard-modal d-flex flex-column pa-5 quat" >
      <v-title class="mx-auto text-h6">Tasks</v-title>
      <v-icon
        class="position-absolute"
        style="top: 8px; right: 8px; cursor: pointer"
        icon="mdi-close px-5"
        @click="handleClose"
      ></v-icon>

      <v-card-title class="fit-content py-0">
        {{ day != 99 ? day : null }}
      </v-card-title>

      <div class="day-card-scroll" style="white-space: nowrap; max-width: 100%">
        <v-list
          dense
          class="bg-transparent ma-1 pa-0 scrollable-list"
          style="max-height: 98% !important"
        >
          <v-list-item
            dense
            v-for="(item, index) in eventsStore.events[dateString]"
            :key="index"
            class="list-item ma-2 mx-10"
          >
            <v-icon icon="mdi-close px-5" @click="() => deleteEvent(item)"></v-icon>
            <input  class="complete-check" type="checkbox" :checked="item.isComplete" @change="updateIsComplete(item, $event)"/>
            <v-icon :style="{ color: item.color }" size="12" icon="mdi-circle mx-2"></v-icon>
            <v-list-item-content style="min-width: 0">
              <v-list-item-value class="text-subtitle-1" :style="{ color: item.color }">{{
                item.event
              }}</v-list-item-value>
            </v-list-item-content>

          </v-list-item>
        </v-list>
      </div>
    </v-card>
  </div>
</template>
