<script setup>
import Calendar from '../components/Calendar.vue'
import Legend from '../components/Legend.vue'
import AddEvent from '../components/AddEvent.vue'
import TodayBtn from '@/components/TodayBtn.vue'
</script>

<template>
  <div class="container">
    <aside>
      <TodayBtn/>
      <Legend />
      <AddEvent />
    </aside>

    <main>
      <Calendar />
    </main>
  </div>
</template>


