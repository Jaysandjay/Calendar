<script setup>
import { ref } from 'vue'
import ClassesModal from './ClassesModal.vue'

const isClicked = ref(false)

function handleClick() {
  if (isClicked.value) {
    isClicked.value = false
  } else {
    isClicked.value = true
  }
}
</script>

<template>
  <v-btn :disabled="isClicked" @click="handleClick" class="ma-3 bg-primary">Modify</v-btn>
  <teleport to="body">
    <ClassesModal v-if="isClicked" @close="isClicked = false" />
  </teleport>
</template>
