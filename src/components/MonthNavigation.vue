<script lang="js" setup>
import MoveMonthButton from './MoveMonthButton.vue'
import { useDateDataStore } from '../stores/dateData.js'

const dateStore = useDateDataStore()

</script>

<template>
    <v-toolbar>
        <v-container class="d-flex justify-center align-center gap-px-5">
            <MoveMonthButton direction="prev" />
            <v-toolbar-title style="max-width: fit-content;" >{{ dateStore.getMonth }}</v-toolbar-title>  
            <MoveMonthButton direction="next" />
        </v-container>
        
    </v-toolbar>
    
</template>