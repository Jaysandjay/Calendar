<script setup>
import { computed, defineProps } from 'vue';
import { useDateDataStore } from '@/stores/dateData';
import { useEventsStore } from '@/stores/eventsStore';
const dataStore = useDateDataStore()

const eventsStore = useEventsStore()

const props = defineProps({
  day: {
    type: Number,
    required: true,
  }
});

const date = computed( () => {
    if(props.day != 99){
        return new Date(dataStore.getYear, dataStore.getMonthIndex, props.day)
    }
})

const dateString = computed(() => {
  if (!date.value) return null;
  const year = date.value.getFullYear();
  let month = date.value.getMonth() + 1;
  let day = date.value.getDate();
  if (month < 10) month = `0${month}`;
  if (day < 10) day = `0${day}`;
  return `${year}-${month}-${day}`;
});

function handleSetDate(){
    dataStore.setDate(date)
}

function deleteEvent(event){
    const currentEvents = eventsStore.events[dateString]
    let modifiedEvents = currentEvents.filter(ev => ev != event)
    eventsStore.events[dateString] = modifiedEvents
}



</script>

<template>
    <v-card 
    class="mx-2 my-0 pa-0"
    :class="[day != 99 ? 'dayCard' : 'dayPlaceholder', props.day == dataStore.selectedDate.getDate() && 'activeDay']"
    elevation="16"
    height="140" 
    @click="handleSetDate"
    >
        <v-card-title class="fit-content py-0 ">
            {{ day != 99 ? day: null }}
        </v-card-title>
            <v-list dense class="bg-transparent ma-1 pa-0 scrollable-list">
                <v-list-item dense 
                v-for="(item, index) in eventsStore.events[dateString]" 
                :key="index" 
                class="ma-0 pa-3 list-item d-flex"
                >
                    <v-icon :style="{ color: item.color }" size="12" icon="mdi-circle mx-2"></v-icon>
                    <v-list-item-content>
                        <v-list-item-value class="text-subtitle-2" :style="{color: item.color}">{{ item.event }}</v-list-item-value>
                    </v-list-item-content>

                     <v-icon icon="mdi-close px-5" @click="()=>deleteEvent(item)"></v-icon>
                </v-list-item>
            </v-list>
    </v-card>

    
</template>