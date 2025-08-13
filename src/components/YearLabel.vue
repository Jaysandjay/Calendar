<script setup>
import { useDateDataStore } from '@/stores/dateData';
const dataStore = useDateDataStore()
</script>

<template>
    <v-card class="d-flex justify-center">
        <v-title class="text-h3">{{ dataStore.getYear }}</v-title>
    </v-card>
</template>