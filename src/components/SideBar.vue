<script setup>
import Legend from '../components/Legend.vue'
import AddEvent from '../components/AddEvent.vue'
import TodayBtn from '@/components/TodayBtn.vue'
import YearLabel from '@/components/YearLabel.vue'
import ChangeColor from '@/components/ChangeColor.vue'
import Logout from './Logout.vue'
</script>

<template>
  <aside class="side-bar">
    <Logout/>
    <YearLabel />
    <TodayBtn />
    <Legend />
    <AddEvent />
    <ChangeColor />
  </aside>
</template>
