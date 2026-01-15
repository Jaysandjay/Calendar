<script setup>
import { useUsersStore } from '@/stores/usersStore';
import { useRouter } from 'vue-router';

const userStore = useUsersStore()
const router = useRouter()

function logout(){
    userStore.logout()
    router.push('/login')
}
</script>

<template>
    <v-card style="width: 98%" class="d-flex justify-space-between align-center mb-5 pa-2 secondary">
        <v-btn class="mr-2" @click="logout">Log out</v-btn>
        <div  class="text-truncate" style="max-width: 200px">{{ userStore.user.email }}</div>
    </v-card>
</template>