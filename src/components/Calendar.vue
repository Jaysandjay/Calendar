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
    class="seven-column ma-5 justify-space-between"
    v-for="(week, index) in dateStore.getWeeks" :key="index"
    >
      <v-col v-for="n in week" :key="n"  class="ma-0 pa-0">
        <DayCard :day="n"/>
      </v-col>
   </v-row>


</v-container>
</template> 
