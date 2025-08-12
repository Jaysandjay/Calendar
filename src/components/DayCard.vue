<script setup>
import { defineProps } from 'vue';
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

let date = null
let dateString = null



if(props.day != 99){
    date = new Date(dataStore.getYear, dataStore.getMonthIndex, props.day)
    dateString = date.toISOString().split('T')[0];
}

function handle(){
    dataStore.setDate(date)
}


</script>

<template>
    <v-card 
    class="mx-2 my-0 pa-0"
    :class="[day != 99 ? 'dayCard' : 'dayPlaceholder', props.day == dataStore.selectedDate.getDate() ? 'bg-primary' : 'bg-secondary']"
    elevation="16"
    height="140" 
    @click="handle"
    >
        <v-card-title class="fit-content py-0 ">
            {{ day != 99 ? day: null }}
        </v-card-title>
            <v-list dense class="bg-transparent ma-1 pa-0 scrollable-list">
                <v-list-item dense v-for="(item, index) in eventsStore.events[dateString]" :key="index" class="ma-0 pa-3 list-item">
                    <v-icon :style="{ color: item.color }" size="12" icon="mdi-circle mx-2"></v-icon>
                    <v-list-item-content>
                        <v-list-item-value class="text-subtitle-2" :style="{color: item.color}">{{ item.event }}</v-list-item-value>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
    </v-card>

    
</template>