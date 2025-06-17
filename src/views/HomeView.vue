<script setup>
import Calendar from '../components/Calendar.vue'
import Legend from '../components/Legend.vue'
import AddEvent from '../components/AddEvent.vue'
</script>

<template>
  <main>
    <div class="info">
      <Legend />
      <AddEvent />
    </div>
    <div class="display">
      <Calendar />
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  justify-content: end;
}

main div {
  padding: 15px;
}
</style>
