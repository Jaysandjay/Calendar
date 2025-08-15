<script setup>
import Legend from '../components/Legend.vue'
import AddEvent from '../components/AddEvent.vue'
import TodayBtn from '@/components/TodayBtn.vue'
import YearLabel from '@/components/YearLabel.vue'
import ChangeColor from '@/components/ChangeColor.vue'
</script>

<template>
  <aside class="side-bar">
    <YearLabel />
    <TodayBtn />
    <Legend />
    <AddEvent />
    <ChangeColor />
  </aside>
</template>
