<script setup>
import { ref } from 'vue'
import { useClassesStore } from '../stores/classesStore'

const classesStore = useClassesStore().items
</script>

<template>
  <v-card class="mx-auto" max-width="350">
    <v-list density="compact">
      <v-list-subheader>Classes</v-list-subheader>

      <v-list-item v-for="(item, index) in classesStore" :key="index" color="primary">
        <template v-slot:prepend>
          <v-icon :style="{ color: item.color }" icon="mdi-circle"></v-icon>
        </template>

        <v-list-item-title>{{ item.class }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-card>
</template>
