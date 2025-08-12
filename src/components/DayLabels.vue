<script setup lang="js">
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

</script>

<template>
    <v-row class="seven-column ma-5 justify-space-between">
        <v-col v-for="(day, index) in days" :key="index" cols="1" class="d-flex align-center justify-center ma-0 pa-0 day-label">
            {{ day }}
        </v-col>
  </v-row>
</template>