<script lang="js" setup>
import { useDateDataStore } from '@/stores/dateData'
const dateStore = useDateDataStore()
</script>

<template>
  <v-btn
    class="mx-auto my-5 bg-primary"
    height="50"
    style="width: 98%"
    @click="() => dateStore.setDate(dateStore.getToday)"
  >
    Jump to Today
  </v-btn>
</template>
