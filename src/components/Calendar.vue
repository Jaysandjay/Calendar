<script lang="js" setup>
import MonthNavigation from '../components/MonthNavigation.vue'
import DayLabels from '../components/DayLabels.vue'
import DayCard from './DayCard.vue';
import { useDateDataStore } from '../stores/dateData.js'
const dateStore = useDateDataStore()


</script>


<template>
  <v-container fluid class="pa-0 ma-0">
    <MonthNavigation />
    <DayLabels />
    <v-row  
    class="seven-column my-5 pa-0 justify-space-around"
    v-for="(week, index) in dateStore.getWeeks" 
    :key="index"
    no-gutters=""
    >
      <v-col 
      v-for="n in week" 
      :key="n"  
      class="ma-0 pa-0 d-flex"
      style="flex: 1 1 0;" 
      >
        <DayCard :day="n" class="flex-grow-1 w-100"/>
      </v-col>
   </v-row>


</v-container>
</template> 
