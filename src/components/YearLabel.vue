<script setup>
import { useDateDataStore } from '@/stores/dateData'
const dataStore = useDateDataStore()
</script>

<template>
    <v-card style="width: 98%" class="d-flex justify-center tertiary">
        <v-title class="text-h3">{{ dataStore.getYear }}</v-title>
    </v-card>
</template>
