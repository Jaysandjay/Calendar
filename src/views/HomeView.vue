<script setup>
import { ref, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import { useUsersStore } from '@/stores/usersStore';
import Calendar from '../components/Calendar.vue'
import SideBar from '@/components/SideBar.vue'

const router = useRouter()
const userStore = useUsersStore()

onBeforeMount( () => {
  if(!userStore.user.id){
    router.push('/login')
  }
})
 
</script>

<template>
  <div class="container">
    <SideBar />

    <main class="pa-0 pt-5">
      <Calendar />
    </main>
  </div>
</template>
