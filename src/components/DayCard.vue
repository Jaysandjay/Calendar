<script setup>
import { defineProps } from 'vue';
import { useDateDataStore } from '@/stores/dateData';
const dataStore = useDateDataStore()
const props = defineProps({
  day: {
    type: Number,
    required: true,
  }
});

let date = null

if(props.day != 99){
    date = new Date(dataStore.getYear, dataStore.getMonthIndex, props.day)
}

function handle(){
    dataStore.setDate(date)
}


</script>

<template>
    <v-card 
    class="mx-2 my-0 "
    :class="[day != 99 ? 'dayCard' : 'dayPlaceholder', props.day == dataStore.selectedDate.getDate() ? 'bg-primary' : 'bg-secondary']"
    elevation="16"
    height="140" 
    @click="handle"
    >
        <v-card-title>
            {{ day != 99 ? day: null }}
            
        </v-card-title>
    </v-card>

    
</template>