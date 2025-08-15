<script lang="js" setup>
import MoveMonthButton from './MoveMonthButton.vue'
import { useDateDataStore } from '../stores/dateData.js'
import MiniCalendar from './MiniCalendar.vue'

const dateStore = useDateDataStore()
</script>

<template>
  <v-toolbar class="d-flex align-center secondary" style="height: 65px">
    <div class="toolbar-cal">
      <MiniCalendar title="Date" />
    </div>
    <v-container class="d-flex justify-center align-center gap-px-5">
      <MoveMonthButton direction="prev" />
      <v-toolbar-title style="max-width: fit-content">{{ dateStore.getMonth }}</v-toolbar-title>
      <MoveMonthButton direction="next" />
    </v-container>
  </v-toolbar>
</template>
