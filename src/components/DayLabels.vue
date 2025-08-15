<script setup lang="js">
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
</script>

<template>
  <v-row class="seven-column ma-5 justify-space-around">
    <v-col v-for="(day, index) in days" :key="index" class="day-label ma-0 pa-0" cols="auto">
      {{ day }}
    </v-col>
  </v-row>
</template>
