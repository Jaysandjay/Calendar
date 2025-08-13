<script setup>
import Calendar from '../components/Calendar.vue'
import Legend from '../components/Legend.vue'
import AddEvent from '../components/AddEvent.vue'
import TodayBtn from '@/components/TodayBtn.vue'
import YearLabel from '@/components/YearLabel.vue'
import ChangeColor from '@/components/ChangeColor.vue'

</script>

<template>
  <div class="container">
    <aside>
      <YearLabel/>
      <TodayBtn/>
      <Legend />
      <AddEvent />
      <ChangeColor/>
    </aside>

    <main>
      <Calendar />
    </main>
  </div>
</template>


